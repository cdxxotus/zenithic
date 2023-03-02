import { querySelector, makeElementFromString } from "./utils/dom";
import { isFunction, isObject, isString } from "./utils/type";

import { Component, CompiledComponent } from "./types/components";
import { Plugin, ZenithicApp } from "./types/core";
import { Directive } from "./types/directives";
import { Filter } from "./types/filters";
import { log } from "./utils/log";

/**
 * Adds a watcher to a reactive object.
 * @param {object} obj - The object to watch.
 * @param {string} key - The key to watch.
 * @param {function} handler - The handler function to be called when the value changes.
 */
const watch = (
  obj: { [key: string]: any },
  key: string,
  handler: (newValue: any, oldvalue: any) => void
) => {
  if (!isObject(obj)) throw new Error("The object to watch must be an object.");
  if (!isString(key) || key.trim() === "")
    throw new Error("The key to watch must be a non-empty string.");
  if (!isFunction(handler))
    throw new Error("The handler function must be a function.");

  Object.defineProperty(obj, key, {
    get() {
      this[key];
    },
    set(newValue) {
      handler(newValue, this[key]);
      this[key] = newValue;
    },
  });
};

/**
 * Removes all watchers from a reactive object.
 * @param {object} obj - The object to unwatch.
 */
const unwatch = (obj: { [key: string]: any }) => {
  if (!isObject(obj))
    throw new Error("The object to unwatch must be an object.");

  Object.keys(obj).forEach((key) => {
    Object.defineProperty(obj, key, {
      get() {
        this[key];
      },
      set(newValue) {
        this[key] = newValue;
      },
    });
  });
};

/**
 * Defines a property on an object.
 * @param {object} obj - The object on which to define the property.
 * @param {string} key - The key of the property to define.
 * @param {function} getter - The getter function for the property.
 * @param {function} setter - The setter function for the property.
 */
const defineProperty = (
  obj: { [key: string]: any },
  key: string,
  getter: () => any,
  setter: (newValue: any) => any | null
) => {
  if (!isObject(obj))
    throw new Error("The object to unwatch must be an object.");

  let params = {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  };

  if (!setter) delete params.set;

  Object.defineProperty(obj, key, params);
};

/**
 * Returns a reactive object that tracks changes to its properties.
 * @param {CompiledComponent} compiledComponent - The compiled component to trigger uppdates.
 * @param {object} obj - The object to make reactive.
 * @returns {object} The reactive object.
 */
const reactive = (
  compiledComponent: CompiledComponent,
  obj: { [key: string]: any }
) => {
  if (!isObject(obj))
    throw new Error("The object to unwatch must be an object.");

  const observed = new Proxy(obj, {
    set(target, key, value) {
      const oldValue = obj[key];
      const result = Reflect.set(target, key, value);
      compiledComponent.updated(key, value, oldValue);
      return result;
    },
  });

  return observed;
};

/**
 * Returns the property name from a string that includes filters.
 * @param {string} str - The string to extract the property name from.
 * @returns {string} The property name.
 */
const getPropertyNameFromStringWithFilters = (str: string) =>
  str.split("|")[0].trim();

/**
 * Returns an object containing the properties of an element.
 * @param {Element} el - The element to get the properties from.
 * @returns {object} An object containing the properties of the element.
 */
const componentPropsFromElement = (el: Element) => {
  return Array.from(el.attributes).reduce(
    (acc, v) => {
      return { ...acc, [v.name]: v.value };
    },
    { children: el.innerHTML }
  );
};

/**
 * Creates a render function for a component that generates a virtual DOM element.
 * @param {ZenithicApp} app - The parent app instance.
 * @param {CompiledComponent} compiledComponent - The compiled component to render.
 * @returns {Function} The render function.
 */
const makeComponentRenderFn = (
  app: ZenithicApp,
  compiledComponent: CompiledComponent
): (() => Element) => {
  /**
   * Generates the virtual DOM element for the component.
   * @returns {Element} The virtual DOM element.
   */
  const vdom = () => {
    // Replace values in the template string with component properties and children.
    const { children, template, context } = compiledComponent;
    const { components } = app;
    const componentsNames = Object.keys(components || {});

    const templateWithReplacedProperties = template
      .replace(/\{\{(.+?)\}\}/gms, (_match, property) => {
        if (property.trim() === "children") return children;
        const filters = getFiltersFromValue(
          app,
          compiledComponent,
          property.trim()
        );
        const value =
          compiledComponent[
            getPropertyNameFromStringWithFilters(property.trim())
          ];
        return filters.length > 0
          ? filters.reduce((acc, filter) => filter(acc), value)
          : value;
      })
      .trim();

    // Create a new element from the template.
    const element = makeElementFromString(templateWithReplacedProperties);

    // Set up directives
    Object.keys(app.directives || {}).forEach((directive) => {
      const nodes = Array.from(element.querySelectorAll("*"));
      nodes.push(element);
      const nodesWithThisDirective = nodes.filter((n: Element) => {
        return hasDirective(n, directive);
      });

      if (nodesWithThisDirective.length > 0) {
        // iterate directive methods
        Object.keys(app.directives[directive])
          .filter((m) => m !== "parseValue")
          .forEach((method) => {
            const methodCopy = compiledComponent[method];
            compiledComponent[method] = () => {
              if (method !== "beforeMount") methodCopy.call(compiledComponent);

              // iterate nodes with this directive
              nodesWithThisDirective.forEach((el: Element) => {
                const attributes = Array.from(el.attributes).map((a) => a.name);
                const completeDirective =
                  attributes.find((a) => a === `v-${directive}`) ||
                  attributes.find((a) => a.includes(`v-${directive}:`));

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
                  compiledComponent
                );

                app.directives[directive][method].call(
                  compiledComponent,
                  el,
                  binding
                );
              });
            };
          });
      }

      // Mount child components.
      Array.from(element.children).forEach((child) => {
        if (componentsNames.includes(child.tagName)) {
          const props = componentPropsFromElement(child);
          const mountPoint = document.createDocumentFragment();
          app.mountComponent(
            mountPoint,
            components[child.tagName],
            Object.assign({}, context, props)
          );
          element.replaceChild(mountPoint.firstChild, child);
        }
      });
    });

    compiledComponent.beforeMount?.();

    return element;
  };

  return vdom.bind(this);
};

/**
 * Get an array of filter functions from a string of filters
 * @param {ZenithicApp} app - The ZenithicApp object containing filter functions
 * @param {CompiledComponent} compiledComponent - The compiled component object
 * @param {string} str - The string of filters
 * @returns {((val: any) => any)[]} - An array of filter functions
 */
const getFiltersFromValue = (
  app: ZenithicApp,
  compiledComponent: CompiledComponent,
  str: string
) => {
  if (!app) throw new Error("App is invalid");
  if (!compiledComponent) throw new Error("Component is invalid");
  if (!isString(str)) throw new TypeError("Invalid string");

  const [, ...strSplitted] = (str as string).split("|");

  return strSplitted.reduce((acc, filter) => {
    const trimedFilter = filter.trim();
    const match = trimedFilter.match(/\(([^()]+)\)/g);

    const filterArgs = match
      ? match[0].split(",").reduce((acc, v) => {
          const matchString = v.match(/"(.*?)"|'(.*?)'/g);
          if (matchString[1]) {
            return [...acc, matchString[1]];
          } else if (Number.isNaN(v.trim())) {
            [...acc, compiledComponent[v.trim()]];
          } else {
            [...acc, Number(v.trim())];
          }
        }, [])
      : [];

    const filterName = match
      ? trimedFilter.replace(filterArgs[0], "").replace("()", "")
      : trimedFilter;

    const fn = (val: any) => app.filters[filterName](val, ...filterArgs);

    return [...acc, fn];
  }, []);
};

/**
 * Get a directive binding object from an HTML element
 * @param {((val: any) => any)[]} filters - An array of filter functions
 * @param {(str: string) => any} parseValueMethod - A function to parse the value from an string
 * @param {string} completeDirective - The complete directive string
 * @param {Element} el - The HTML element to get the directive binding from
 * @param {CompiledComponent} compiledComponent - The compiled component object
 * @returns {Binding} - A directive binding object
 */
const getDirectiveBinding = (
  filters: ((val: any) => any)[],
  parseValueMethod: (str: string) => any,
  completeDirective: string,
  el: Element,
  compiledComponent: CompiledComponent
) => {
  if (
    !filters ||
    !parseValueMethod ||
    !completeDirective ||
    !el ||
    !compiledComponent ||
    !isFunction(parseValueMethod)
  ) {
    throw new Error("Invalid arguments");
  }

  const [value] = el.getAttribute(completeDirective).split("|");
  const arg = completeDirective.split(":")[1] || null;

  const result = filters.reduce(
    (acc, filter) => filter(acc),
    parseValueMethod.call(compiledComponent, value.trim())
  );

  return { value: result, arg };
};

/**
 * Prepares a component by adding reactive data, computed properties, methods, and watchers from its mixins.
 *
 * @param {Component} comp - The component to prepare.
 * @returns {Component} - The prepared component.
 */
const prepareComponent = (comp: Component) => {
  let compCopy: Component = { ...comp };

  const dataFn = {
    data() {
      let returnData = compCopy.data?.() ?? {};

      // Add data from mixins
      Object.keys(this.mixins || {}).forEach((mixinKey) => {
        if (this.mixins[mixinKey].data) {
          returnData = {
            ...this.mixins[mixinKey].data(),
            ...returnData,
          };
        }
      });

      return returnData;
    },
  };

  const component: Component = Object.assign(comp, dataFn);

  // Add computed properties, methods, and watchers from mixins
  Object.keys(component.mixins || {}).forEach((mixinKey) => {
    if (component.mixins[mixinKey].computed) {
      Object.assign(component.computed, component.mixins[mixinKey].computed);
    }
    if (component.mixins[mixinKey].watch) {
      Object.assign(component.watch, component.mixins[mixinKey].watch);
    }
  });

  return component;
};

/**
 * Check if an element has a given directive.
 * @param {Element} el - The element to check.
 * @param {string} directive - The directive to check for.
 * @returns {boolean} `true` if the element has the directive, `false` otherwise.
 */
const hasDirective = (el: Element, directive: string) => {
  if (!el || !el.attributes) return false;

  const string = `v-${directive}`;
  const stringWithArgument = `v-${directive}:`;
  return Array.from(el.attributes).some(
    (attr) =>
      (attr.name.match(new RegExp(string)) && attr.name === string) ||
      attr.name.match(new RegExp(stringWithArgument))
  );
};

/**
 * Compiles a Zenithic component into a Compiled Component.
 *
 * @param {ZenithicApp} app - The Zenithic app instance.
 * @param {Component} component - The component to compile.
 * @returns {CompiledComponent} - The compiled component.
 */
const compileComponent = (
  app: ZenithicApp,
  component: Component
): CompiledComponent => {
  // Define the component object
  const preparedComponent = prepareComponent(component);

  // Define the Compiled Component Class
  class CompiledComponentInstance {
    $el: null;
    $template: "";
    $data: {};

    beforeMount() {}
    mounted() {}
    beforeDestroy() {}
    destroyed() {}

    constructor(obj: Component) {
      // Assign the component properties to the Compiled Component Instance
      Object.assign(this, obj);

      // Set up the compiled component object
      const compiledComponent = this as unknown as CompiledComponent;

      // Set template
      compiledComponent.$template = component.template.trim();

      // Set up the reactive data
      compiledComponent.$data = reactive(compiledComponent, obj.data());

      for (const key in compiledComponent.$data) {
        const getter = () => compiledComponent.$data[key];
        const setter = (newValue: any) =>
          (compiledComponent.$data[key] = newValue);
        defineProperty(compiledComponent, key, getter, setter);
      }

      // Set up the computed properties
      for (const key in compiledComponent.computed) {
        const getter = () => compiledComponent.computed[key];
        defineProperty(compiledComponent, key, getter, null);
      }

      // Set up the methods
      for (const key in obj.methods) {
        this[key] = obj.methods[key].bind(compiledComponent);
      }
      Object.keys(component.mixins || {}).forEach((mixinKey) => {
        if (component.mixins[mixinKey].methods) {
          Object.keys(component.mixins[mixinKey].methods || {}).forEach(
            (key) => {
              if (!component.methods[key]) {
                const fnCopy = component.methods[key].bind({});
                component.methods[key] = (...args) => {
                  fnCopy.call(compiledComponent, ...args);
                  component.mixins[mixinKey].methods[key].call(
                    compiledComponent,
                    ...args
                  );
                };
              } else {
                component.methods[key] =
                  component.mixins[mixinKey].methods[key].bind(
                    compiledComponent
                  );
              }
            }
          );
        }
      });

      // Set up the watchers
      for (const key in obj.watch) {
        const handler = obj.watch[key].bind(compiledComponent);
        watch(this.$data, key, handler);
      }
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
      const compiledComponent = this as unknown as CompiledComponent;
      const oldEl = this.$el as Element;
      const parentNode = oldEl?.parentElement;

      // render the component
      const newEl = makeComponentRenderFn(app, compiledComponent)();
      (this.$el as Element) = newEl;

      if (parentNode) parentNode.replaceChild(newEl, oldEl);
      return;
    }

    updated(key: string, value: any, oldValue: any) {
      log("component updated", { key, value, oldValue });
      this.render();
    }
  }

  // Return the component constructor
  return new CompiledComponentInstance(
    preparedComponent
  ) as unknown as CompiledComponent;
};

/**
 * Fills a parent element with a document fragment or an element.
 * @param {DocumentFragment | Element} content - The content to fill the parent element with.
 * @param {DocumentFragment | Element} parent - The parent element to fill with the content.
 */
const fillFragmentOrElement = (
  content: DocumentFragment | Element,
  parent: DocumentFragment | Element
) => {
  if (
    (content instanceof DocumentFragment || content instanceof Element) &&
    (parent instanceof DocumentFragment || parent instanceof Element)
  ) {
    while (parent.firstChild) parent.removeChild(parent.firstChild);
    parent.appendChild(content);
  } else {
    throw new TypeError(
      "Invalid content or parent provided. Expected a DocumentFragment or Element."
    );
  }
};

/**
 * Creates a Zenithic app instance.
 * @returns The Zenithic app instance.
 */
const createApp = (): ZenithicApp => {
  const app: ZenithicApp = {
    $el: null,
    main: null,
    router: null,
    store: null,
    mixins: {},
    directives: {},
    filters: {},
    components: {},
    utils: {},
    context: {},

    /**
     * Adds a plugin to the app instance.
     * @param plugin The plugin to add.
     */
    use(plugin: Plugin) {
      if (plugin.install) {
        plugin.install(this);
      }
    },

    /**
     * Mounts a component to an element in the DOM.
     * @param selectorOrElement The selector or element to mount the component to.
     * @param component The component to mount.
     * @param props The props to pass to the component.
     * @returns {CompiledComponent} The compiled component.
     */
    mountComponent(
      selectorOrElement: string | Element,
      component: Component,
      props: { [key: string]: any }
    ) {
      const mountPoint =
        typeof selectorOrElement === "string"
          ? querySelector(selectorOrElement)
          : selectorOrElement;

      if (!mountPoint) return null;

      // assign mounted properties to computed data.
      component.computed = component.computed ?? {};
      Object.assign(component.computed, props, this.context);

      // compile the component into an object with render function.
      const compiledComponent: CompiledComponent = compileComponent(
        this,
        component
      );

      // @Lifecycle:beforeMount
      compiledComponent.beforeMount?.();

      // render the component.
      compiledComponent.render?.();

      // mount the component to the DOM
      fillFragmentOrElement(compiledComponent.$el, mountPoint);

      // @Lifecycle:mounted
      compiledComponent.mounted?.();

      return compiledComponent;
    },

    /**
     * Mounts app to an element in the DOM and sets the app's $el property.
     * @param selectorOrElement The selector or element to mount the component to.
     * @param component The component to mount.
     * @param props The props to pass to the component.
     */
    mount(
      selectorOrElement: string | Element,
      component: Component,
      props: { [key: string]: any }
    ) {
      const compiledComponent = this.mountComponent(
        selectorOrElement,
        component,
        props
      );
      this.$el = compiledComponent.$el;
    },

    /**
     * Removes the application's $el from the DOM.
     */
    unmount() {
      (this as ZenithicApp).$el?.parentNode.removeChild(this.$el);
      this.$el = null;
    },

    /**
     * Registers a component with the given name.
     * @param name The name of the component.
     * @param component The component to register.
     */
    registerComponent(name: string, component: Component) {
      Object.assign((this as ZenithicApp).components, { [name]: component });
    },

    /**
     * Gets the component with the given name.
     * @param name The name of the component.
     * @returns {Component} The component, or undefined if it is not found.
     */
    getComponent(name: string) {
      return (this as ZenithicApp).components[name];
    },

    /**
     * Registers a directive with the given name.
     * @param name The name of the component.
     * @param directive The directive to register.
     */
    registerDirective(name: string, directive: Directive) {
      Object.assign((this as ZenithicApp).directives, { [name]: directive });
    },

    /**
     * Registers a filter with the given name.
     * @param name The name of the filter.
     * @param filter The filter to register.
     */
    registerFilter(name: string, filter: Filter) {
      (this as ZenithicApp).filters[name] = filter;
    },

    /**
     * Sets app context.
     * @param context The context.
     */
    setContext(context: { [key: string]: any }) {
      (this as ZenithicApp).context = context;
    },
  };

  return app;
};

export { createApp };
