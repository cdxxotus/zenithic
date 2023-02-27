// THIS FILE IS A BIG WORK IN PROGRESS
// THERE IS STILL A LOT TO DO FOR COMPILING TO AST AND GENERATE VDOM WHILE IMPLEMENTING
// DIRECTIVES, FILTERS, MIXINS, AND OTHER CAPABILITIES
// NONE OF THOSE FUNCIONS ARE DEFINITIVE, COMPLETE, SECURE OR WORKING

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

const makeComponentRenderFn = (app: ZenithicApp): (() => string) => {
  const vdom = () => {
    const compiledComponent = this || { el: document.createElement("div") };
    // 2. use filters

    // 3. parse components

    // 4. replace placeholders
    return compiledComponent.el.innerHTML.replace(
      /\{{(.*?)\}}/gm,
      (_substring: string, property: string) => {
        return app ? app[property.trim()] : "";
      }
    );
  };

  return vdom.bind(this);
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
              app.directives[directive][method].call(compiledComponent, el, {
                value: app.directives[directive].parseValue.call(
                  compileComponent,
                  el.getAttribute(`v-${directive}`)
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
      this.el = makeComponentRenderFn.call(this).call();
      return this.el;
    },
  };

  // ComponentConstructor = makeLifecycleFunctions(this)

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
        const compiledComponent = compileComponent(component).bind(this);

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

// const parse = (template, options = {}) => {
//   const { delimiters = ["{{", "}}"], state = {} } = options;

//   // Use the DOMParser API to parse the HTML template string
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(template, "text/html");

//   // Create an empty virtual DOM object
//   const vdom = {};

//   // Set the tag name of the root element
//   vdom.tagName = doc.body.firstChild.tagName.toLowerCase();

//   // Set the attributes of the root element
//   vdom.attrs = {};
//   const attrList = doc.body.firstChild.attributes;
//   for (let i = 0; i < attrList.length; i++) {
//     const attr = attrList[i];
//     vdom.attrs[attr.name] = attr.value;
//   }

//   // Recursively parse child nodes and append them to the root vdom object
//   vdom.children = [];
//   const childNodes = doc.body.firstChild.childNodes;
//   for (let i = 0; i < childNodes.length; i++) {
//     const childNode = childNodes[i];
//     if (childNode.nodeType === Node.ELEMENT_NODE) {
//       vdom.children.push(parseNode(childNode));
//     } else if (childNode.nodeType === Node.TEXT_NODE) {
//       vdom.children.push(childNode.textContent.trim());
//     }
//   }

//   // Return the final vdom object
//   return vdom;
// };

// const parseNode = (node) => {
//   // Create a new vdom object for the node
//   const vdom = {};

//   // Set the tag name of the node
//   vdom.tagName = node.tagName.toLowerCase();

//   // Set the attributes of the node
//   vdom.attrs = {};
//   const attrList = node.attributes;
//   for (let i = 0; i < attrList.length; i++) {
//     const attr = attrList[i];
//     vdom.attrs[attr.name] = attr.value;
//   }

//   // Recursively parse child nodes and append them to the vdom object
//   vdom.children = [];
//   const childNodes = node.childNodes;
//   for (let i = 0; i < childNodes.length; i++) {
//     const childNode = childNodes[i];
//     if (childNode.nodeType === Node.ELEMENT_NODE) {
//       vdom.children.push(parseNode(childNode));
//     } else if (childNode.nodeType === Node.TEXT_NODE) {
//       vdom.children.push(childNode.textContent.trim());
//     }
//   }

//   // Return the final vdom object for the node
//   return vdom;
// };

// const buildVdom = (templateString, options = {}) => {
//   const ast = parse(templateString.trim(), options);

//   const genProps = (attrs) => {
//     if (!attrs.length) {
//       return "null";
//     }

//     let props = "";
//     attrs.forEach((attr, i) => {
//       props += `${i !== 0 ? "," : ""}${JSON.stringify(attr.name)}:${
//         attr.value ? JSON.stringify(attr.value) : "true"
//       }`;
//     });
//     return `{${props}}`;
//   };

//   const gen = (node) => {
//     if (node.type === 1) {
//       // element node
//       return genElement(node);
//     } else if (node.type === 2) {
//       // expression node
//       return `_s(${node.expression})`;
//     } else {
//       // text node
//       return JSON.stringify(node.text);
//     }
//   };

//   const genElement = (node) => {
//     const children = genChildren(node);
//     const props = genProps(node.attrs);
//     return `_c("${node.tag}",${props ? props + "," : ""}${children})`;
//   };

//   const genChildren = (node) => {
//     const children = node.children;
//     if (children.length) {
//       return `[${children.map((c) => gen(c)).join(",")}]`;
//     }
//     return "undefined";
//   };

//   const code = genElement(ast);
//   return new Function(`with(this){return ${code}}`);
// };
