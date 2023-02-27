import { querySelector } from "./utils/dom";

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

// This function defines a computed property on an object.
const defineComputed = (
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

const makeComponentRenderFn = (app: ZenithicApp): (() => string) => {
  const vdom = () => {
    const compiledComponent = this as CompiledComponent;
    // TODO: parse components

    return compiledComponent.el.innerHTML.replace(
      /\{{(.*?)\}}/gm,
      (_substring: string, str: string) => {
        // use filters
        const filters = getFiltersFromValue(app, compiledComponent, str);
        return filters.reduce(
          (acc, filter) => filter(acc),
          app[getPropertyNameFromStrinWithFilters(str)]
        );
      }
    );
  };

  return vdom.bind(this);
};

const getFiltersFromValue = (
  app: ZenithicApp,
  compiledComponent: CompiledComponent,
  str: string
) => {
  const strSplitted = str.split("|");
  const filters = strSplitted.splice(0, 1).reduce((acc, filter) => {
    const filterArgs = filter
      .match(/\(([^()]+)\)/g)[0]
      .split(",")
      .reduce((acc, v) => {
        const matchString = v.match(/"(.*?)"|'(.*?)'/);
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

const getDirectiveBindingValue = (
  filters: ((val: any) => any)[],
  parseValueMethod: (str: string) => any,
  directiveName: string,
  el: Element,
  app: ZenithicApp
) => {
  filters.reduce(
    (acc, filter) => filter(acc),
    parseValueMethod
      .call(
        compileComponent,
        el.getAttribute(`v-${directiveName}`).split("|")[0].trim()
      )
      .bind(app)
  );
};

const prepareComponent = (comp: Component) => {
  const component: Component = Object.assign(comp, {
    data() {
      const reactiveData = reactive(comp.data());

      Object.keys(component.mixins).forEach((mixinKey) => {
        if (component.mixins[mixinKey].data) {
          Object.assign(
            reactiveData,
            reactive(component.mixins[mixinKey].data())
          );
        }
      });

      return reactiveData;
    },
  });

  Object.keys(component.mixins).forEach((mixinKey) => {
    if (component.mixins[mixinKey].computed) {
      Object.keys(component.mixins[mixinKey].computed).forEach((key) => {
        defineComputed(
          component.computed,
          key,
          component.mixins[mixinKey].computed[key]
        );
      });
    }
    if (component.mixins[mixinKey].methods) {
      Object.keys(component.mixins[mixinKey].methods).forEach((key) => {
        component.methods[key] = component.mixins[mixinKey].methods[key];
      });
    }
    if (component.mixins[mixinKey].watch) {
      Object.keys(component.mixins[mixinKey].watch).forEach((key) => {
        const handler = component.mixins[mixinKey].watch[key];
        watch(component.data(), key, (newValue, oldValue) => {
          handler.call(component, newValue, oldValue);
        });
      });
    }
  });

  return component;
};

const compileComponent = (component: Component): CompiledComponent => {
  const app: ZenithicApp = this;

  // Define the component object
  const preparedComponent = prepareComponent(component);

  // Create the component constructor
  const ComponentConstructor = (obj: Component) => {};

  ComponentConstructor.prototype = {
    constructor(obj: Component) {
      Object.assign(this, obj);
      let compiledComponent: CompiledComponent = this;

      // Set up dom
      const dom = document.createElement("div");
      dom.innerHTML = component.template;
      compiledComponent.el = dom;

      // Set up the reactive data
      compiledComponent.$data = reactive(obj.data());

      // Set up the computed properties
      for (const key in compiledComponent.computed) {
        const getter = compiledComponent.computed[key].bind(compiledComponent);
        defineComputed(compiledComponent, key, getter);
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
      // iterate app registered directives
      Object.keys(app.directives).forEach((directive) => {
        const nodesWithThisDirective = compiledComponent.el.querySelectorAll(
          `["v-${directive}"]`
        );

        // iterate directive methods
        Object.keys(app.directives[directive]).forEach((method) => {
          const methodCopy = compiledComponent[method];
          compiledComponent[method] = () => {
            methodCopy.call(compiledComponent);

            // iterate nodes with this directive
            nodesWithThisDirective.forEach((el: Element) => {
              const filters = getFiltersFromValue(
                app,
                compiledComponent,
                el.getAttribute(`v-${directive}`)
              );

              app.directives[directive][method].call(compiledComponent, el, {
                value: getDirectiveBindingValue(
                  filters,
                  app.directives[directive].parseValue,
                  directive,
                  el,
                  app
                ),
                arg: null, // TODO: implement argument
              });
            });
          };
        });
      });
    },
    $destroy: function () {
      // Call the beforeDestroy hook
      this.beforeDestroy.call(this);

      // Destroy the component
      unwatch(this.$data);
      delete this.$data;
      Object.setPrototypeOf(this, null);

      // Call the destroyed hook
      this.destroyed.call(this);
    },
    render: function () {
      this.el = makeComponentRenderFn.call(this, app).call();
      return this.el;
    },
  };

  // Return the component constructor
  return new ComponentConstructor(preparedComponent);
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
    mixins: null,
    directives: null,
    filters: null,
    components: null,
    utils: null,
    context: null,
    use(plugin: Plugin) {
      if (plugin.install) {
        plugin.install(this);
      }
    },
    mount(selector: string, component: Component, props: Props) {
      const mountPoint = window.document.querySelector(selector);

      if (mountPoint) {
        // assign mounted properties to computed data
        Object.assign(component, { computed: props });

        // create empty document and assign it to app object
        const fragment = document.createDocumentFragment();
        this.el = fragment;

        // compile component, render it, and fill the fragment with the result
        const compiledComponent = compileComponent.call(this, component);

        // @Lifecycle:beforeMount
        compiledComponent.beforeMount();

        // render and mount the component
        const node = compiledComponent.render();
        fillFragmentOrElement(node, fragment);
        fillFragmentOrElement(fragment, querySelector(selector));

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
  };

  return app;
};

export { createApp };
