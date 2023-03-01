import { Component, Props, CompiledComponent } from "./types/components";
import { Plugin, ZenithicApp } from "./types/core";
import { Directive } from "./types/directives";
import { Filter } from "./types/filters";

// This function adds a watcher to a reactive object.
const watch = (
  obj: { [key: string]: any },
  key: string,
  handler: (newValue: any, oldvalue: any) => void
) => {
  Object.defineProperty(obj, key, {
    get() {
      this._key;
    },
    set(newValue) {
      handler(newValue, this._key);
      this._key = newValue;
    },
  });
};

// This function removes all watchers from a reactive object.
const unwatch = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    Object.defineProperty(obj, key, {
      get() {
        this._key;
      },
      set(nv) {
        this._key = nv;
      },
    });
  });
};

// This function defines a property on an object.
const defineProperty = (
  obj: { [key: string]: any },
  key: string,
  getter: () => any
) => {
  Object.defineProperty(obj, key, {
    get: getter,
    enumerable: true,
    configurable: true,
  });
};

// This function returns a reactive object that tracks changes to its properties.
const reactive = (obj: { [key: string]: any }) => {
  const observed = new Proxy(obj, {
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      // TODO: trigger update
      return result;
    },
  });
  return observed;
};

const getPropertyNameFromStrinWithFilters = (str: string) =>
  str.split("|")[0].trim();

const componentPropsFromElement = (el: Element) => {
  return Array.from(el.attributes).reduce(
    (acc, v) => {
      return { ...acc, [v.name]: v.value };
    },
    { children: el.innerHTML }
  );
};

const makeComponentRenderFn = (
  app: ZenithicApp,
  compiledComponent: CompiledComponent
): (() => Element) => {
  const vdom = () => {
    if (compiledComponent.children) {
      return compiledComponent.el.innerHTML.replace(
        /\{{(.*?)\}}/gm,
        (_substring: string, str: string) => {
          if (str.trim() === "children") return compiledComponent.children;
        }
      );
    }

    const componentsNames = Object.keys(app.components || {});
    const children = compiledComponent.el.children;
    if (children.length > 0) {
      Array.from(children).forEach((child: Element) => {
        if (componentsNames.includes(child.tagName)) {
          const mountPoint = document.createElement("div");
          app.mount(
            mountPoint,
            app.components[child.tagName],
            Object.assign(
              {},
              compiledComponent.context,
              componentPropsFromElement(child)
            )
          );
          compiledComponent.el.removeChild(child);
          compiledComponent.el.appendChild(mountPoint);
        }
      });
    }

    compiledComponent.el.innerHTML = compiledComponent.el.innerHTML.replace(
      /\{{(.*?)\}}/gm,
      (_substring: string, str: string) => {
        // use filters
        if (str === "children") return compiledComponent.children;
        const filters = getFiltersFromValue(app, compiledComponent, str);
        return filters.length > 0
          ? filters.reduce(
              (acc, filter) => filter(acc),
              compiledComponent[getPropertyNameFromStrinWithFilters(str)]
            )
          : compiledComponent[getPropertyNameFromStrinWithFilters(str)];
      }
    );

    return compiledComponent.el;
  };

  return vdom.bind(this);
};

const getFiltersFromValue = (
  app: ZenithicApp,
  compiledComponent: CompiledComponent,
  str: string
) => {
  const strSplitted = str.split("|");
  strSplitted.splice(0, 1);
  const filters = strSplitted.reduce((acc, filter) => {
    const filterArgs = filter
      .match(/\(([^()]+)\)/g)[0]
      .split(",")
      .reduce((acc, v) => {
        const matchString = v.match(/"(.*?)"|'(.*?)'/g);
        if (matchString[1]) {
          return [...acc, matchString[1]];
        } else if (Number.isNaN(v.trim())) {
          [...acc, compiledComponent[v.trim()]];
        } else {
          [...acc, Number(v.trim())];
        }
      }, []);

    const filterName = filter.replace(filterArgs[0], "");
    const fn = (val: any) => app.filters[filterName](val, ...filterArgs);
    return [...acc, fn];
  }, []);
  return filters;
};

const getDirectiveBinding = (
  filters: ((val: any) => any)[],
  parseValueMethod: (str: string) => any,
  completeDirective: string,
  el: Element,
  compiledComponent: CompiledComponent
) => {
  const value = el.getAttribute(`${completeDirective}`).split("|")[0];
  const arg = completeDirective.split(":")[1] || null;
  return {
    value: filters.length > 0 ? filters.reduce(
      (acc, filter) => filter(acc),
      parseValueMethod.call(compiledComponent, value.trim())
    ) : parseValueMethod.call(compiledComponent, value.trim()),
    arg,
  };
};

const prepareComponent = (comp: Component) => {
  const compCopy = Object.assign({}, comp);
  const dataFn = {
    data() {
      let returnData = {};
      if (compCopy.data) {
        const reactiveData = reactive(compCopy.data());
        returnData = reactiveData;
      }

      Object.keys(this.mixins || {}).forEach((mixinKey) => {
        if (this.mixins[mixinKey].data) {
          returnData = Object.assign(
            reactive(this.mixins[mixinKey].data()),
            returnData
          );
        }
      });

      return returnData;
    },
  };
  const component: Component = Object.assign(comp, dataFn);

  Object.keys(component.mixins || {}).forEach((mixinKey) => {
    if (component.mixins[mixinKey].computed) {
      Object.keys(component.mixins[mixinKey].computed || {}).forEach((key) => {
        if (!component.computed[key]) {
          defineProperty(
            component.computed,
            key,
            component.mixins[mixinKey].computed[key]
          );
        }
      });
    }
    if (component.mixins[mixinKey].methods) {
      Object.keys(component.mixins[mixinKey].methods || {}).forEach((key) => {
        if (!component.methods[key]) {
          const fnCopy = component.methods[key].bind({});
          component.methods[key] = (...args) => {
            fnCopy(...args);
            component.mixins[mixinKey].methods[key](...args);
          };
        } else {
          component.methods[key] = component.mixins[mixinKey].methods[key];
        }
      });
    }
    if (component.mixins[mixinKey].watch) {
      Object.keys(component.mixins[mixinKey].watch || {}).forEach((key) => {
        const handler = component.mixins[mixinKey].watch[key];
        watch(component.data(), key, (newValue, oldValue) => {
          handler.call(component, newValue, oldValue);
        });
      });
    }
  });

  return component;
};

const hasDirective = (el: Element, directive: string) => {
  const string = `v-${directive}`;
  let c = 0;
  if (el.attributes) {
    while (c < el.attributes.length) {
      if (el.attributes[c].name.match(new RegExp(string))) return true;
      c++;
    }
  }
  return false;
};

const compileComponent = (
  app: ZenithicApp,
  component: Component
): CompiledComponent => {
  // Define the component object
  const preparedComponent = prepareComponent(component);

  // Create the component constructor
  class ComponentConstructor {
    el: null;
    template: "";
    $data: {};
    beforeMount() {}
    mounted() {}
    updated() {}
    beforeDestroy() {}
    destroyed() {}

    constructor(obj: Component) {
      Object.assign(this, obj);
      let compiledComponent = this as unknown as CompiledComponent;

      // Set up dom
      const dom = document.createElement("div");
      dom.innerHTML = component.template.trim();
      compiledComponent.el = dom;

      // Set up the reactive data
      compiledComponent.$data = reactive(obj.data());
      for (const key in compiledComponent.$data) {
        const getter = () => compiledComponent.$data[key];
        defineProperty(compiledComponent, key, getter);
      }

      // Set up the computed properties
      for (const key in compiledComponent.computed) {
        const getter = () => compiledComponent.computed[key];
        defineProperty(compiledComponent, key, getter);
      }

      // Set up the methods
      for (const key in obj.methods) {
        this[key] = obj.methods[key].bind(compiledComponent);
      }

      // Set up the watchers
      for (const key in obj.watch) {
        const handler = obj.watch[key].bind(compiledComponent);
        watch(this.$data, key, handler);
      }

      // Set up directives
      // iterate app registered Directives
      Object.keys(app.directives || {}).forEach((directive) => {
        const nodes = Array.from(compiledComponent.el.querySelectorAll("*"));
        const nodesWithThisDirective = nodes.filter((n: Element) => {
          return hasDirective(n, directive);
        });

        // iterate directive methods
        Object.keys(app.directives[directive]).forEach((method) => {
          const methodCopy = compiledComponent[method];
          compiledComponent[method] = () => {
            methodCopy.call(compiledComponent);

            // iterate nodes with this directive
            nodesWithThisDirective.forEach((el: Element) => {
              let attributes = [];
              let count = 0;
              while (count < el.attributes.length) {
                attributes.push(el.attributes[count].name);
                count++;
              }

              const completeDirective = attributes.filter(
                (a) => a === directive || a.includes(`${directive}:`)
              )[0];

              const filters = getFiltersFromValue(
                app,
                compiledComponent,
                el.getAttribute(completeDirective)
              );

              const binding = getDirectiveBinding(
                filters,
                app.directives[directive].parseValue,
                completeDirective,
                el,
                compiledComponent,
              );

              app.directives[directive][method].call(
                compiledComponent,
                el,
                binding
              );
            });
          };
        });
      });
    }

    $emit() {}

    $destroy() {
      // Call the beforeDestroy hook
      this.beforeDestroy.call(this);

      // Destroy the component
      unwatch(this.$data);
      delete this.$data;
      Object.setPrototypeOf(this, null);

      // Call the destroyed hook
      this.destroyed.call(this);
    }

    render() {
      let compiledComponent = this as unknown as CompiledComponent;
      const newEl = makeComponentRenderFn(app, compiledComponent)();
      (this.el as Element) = newEl;
      return this.el;
    }
  }

  // Return the component constructor
  return new ComponentConstructor(preparedComponent) as unknown as CompiledComponent;
};

const fillFragmentOrElement = (
  el: DocumentFragment | Element,
  parent: DocumentFragment | Element
) => {
  if (el) {
    const childNodes = parent.childNodes;
    while (childNodes.length > 0) parent.removeChild(childNodes[0]);
    parent.appendChild(el);
  }
};

const createApp = (): ZenithicApp => {
  const app: ZenithicApp = {
    el: null,
    main: null,
    router: null,
    store: null,
    mixins: {},
    directives: {},
    filters: {},
    components: {},
    utils: {},
    context: {},
    use(plugin: Plugin) {
      if (plugin.install) {
        plugin.install(this);
      }
    },
    mount(
      selectorOrElement: string | Element,
      component: Component,
      props: { [key: string]: any }
    ) {
      const mountPoint =
        typeof selectorOrElement === "string"
          ? window.document.querySelector(selectorOrElement)
          : selectorOrElement;

      if (mountPoint) {
        // assign mounted properties to computed data
        component.computed = component.computed || {};
        Object.assign(component.computed, props, app.context);

        // compile component, render it, and fill the fragment with the result
        const compiledComponent: CompiledComponent = compileComponent(
          this,
          component
        );

        // @Lifecycle:beforeMount
        compiledComponent.beforeMount();

        // render and mount the component
        const node = compiledComponent.render();
        this.el = node;
        fillFragmentOrElement(node, mountPoint);

        // @Lifecycle:mounted
        compiledComponent.mounted();
      }
    },
    unmount() {
      (this as ZenithicApp).el.parentNode.removeChild(this.el);
    },
    registerComponent(name: string, component: Component) {
      Object.assign((this as ZenithicApp).components, { [name]: component });
    },
    getComponent(name: string) {
      return (this as ZenithicApp).components[name];
    },
    registerDirective(name: string, directive: Directive) {
      Object.assign((this as ZenithicApp).directives, { [name]: directive });
    },
    registerFilter(name: string, filter: Filter) {
      Object.assign((this as ZenithicApp).filters, { [name]: filter });
    },
    registerContext(context: { [key: string]: any }) {
      this.context = context;
    },
  };

  return app;
};

export { createApp };
