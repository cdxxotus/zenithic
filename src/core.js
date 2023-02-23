const parseDirectives = (template) => {
  const directiveRegex = /v-(\w+):?([a-zA-Z]*)="(.*?)"/g; // Expression régulière pour identifier les directives
  let match = directiveRegex.exec(template);
  const directives = {};
  while (match !== null) {
    const [, name, arg, value] = match;
    directives[name] = { arg, value };
    match = directiveRegex.exec(template);
  }
  return directives;
};

// This function adds a watcher to a reactive object.
const watch = (obj, key, handler) => {
  const oldValue = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      return oldValue;
    },
    set(newValue) {
      handler(newValue, oldValue);
      oldValue = newValue;
      // trigger update
    },
  });
};

// This function removes all watchers from a reactive object.
const unwatch = (obj) => {
  Object.keys(obj).forEach((key) => {
    delete obj[key];
  });
};

// This function returns a reactive object that tracks changes to its properties.
const reactive = (obj) => {
  const observed = new Proxy(obj, {
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      // trigger update
      return result;
    },
  });
  return observed;
};

// This function defines a computed property on an object.
const defineComputed = (obj, key, getter) => {
  Object.defineProperty(obj, key, {
    get: getter,
    enumerable: true,
    configurable: true,
  });
};

const parse = (template, options = {}) => {
  const { delimiters = ["{{", "}}"], state = {} } = options;

  // Use the DOMParser API to parse the HTML template string
  const parser = new DOMParser();
  const doc = parser.parseFromString(template, "text/html");

  // Create an empty virtual DOM object
  const vdom = {};

  // Set the tag name of the root element
  vdom.tagName = doc.body.firstChild.tagName.toLowerCase();

  // Set the attributes of the root element
  vdom.attrs = {};
  const attrList = doc.body.firstChild.attributes;
  for (let i = 0; i < attrList.length; i++) {
    const attr = attrList[i];
    vdom.attrs[attr.name] = attr.value;
  }

  // Recursively parse child nodes and append them to the root vdom object
  vdom.children = [];
  const childNodes = doc.body.firstChild.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];
    if (childNode.nodeType === Node.ELEMENT_NODE) {
      vdom.children.push(parseNode(childNode));
    } else if (childNode.nodeType === Node.TEXT_NODE) {
      vdom.children.push(childNode.textContent.trim());
    }
  }

  // Return the final vdom object
  return vdom;
};

const parseNode = (node) => {
  // Create a new vdom object for the node
  const vdom = {};

  // Set the tag name of the node
  vdom.tagName = node.tagName.toLowerCase();

  // Set the attributes of the node
  vdom.attrs = {};
  const attrList = node.attributes;
  for (let i = 0; i < attrList.length; i++) {
    const attr = attrList[i];
    vdom.attrs[attr.name] = attr.value;
  }

  // Recursively parse child nodes and append them to the vdom object
  vdom.children = [];
  const childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];
    if (childNode.nodeType === Node.ELEMENT_NODE) {
      vdom.children.push(parseNode(childNode));
    } else if (childNode.nodeType === Node.TEXT_NODE) {
      vdom.children.push(childNode.textContent.trim());
    }
  }

  // Return the final vdom object for the node
  return vdom;
};

const buildVdom = (templateString, options = {}) => {
  const ast = parse(templateString.trim(), options);

  const genProps = (attrs) => {
    if (!attrs.length) {
      return "null";
    }

    let props = "";
    attrs.forEach((attr, i) => {
      props += `${i !== 0 ? "," : ""}${JSON.stringify(attr.name)}:${
        attr.value ? JSON.stringify(attr.value) : "true"
      }`;
    });
    return `{${props}}`;
  };

  const gen = (node) => {
    if (node.type === 1) {
      // element node
      return genElement(node);
    } else if (node.type === 2) {
      // expression node
      return `_s(${node.expression})`;
    } else {
      // text node
      return JSON.stringify(node.text);
    }
  };

  const genElement = (node) => {
    const children = genChildren(node);
    const props = genProps(node.attrs);
    return `_c("${node.tag}",${props ? props + "," : ""}${children})`;
  };

  const genChildren = (node) => {
    const children = node.children;
    if (children.length) {
      return `[${children.map((c) => gen(c)).join(",")}]`;
    }
    return "undefined";
  };

  const code = genElement(ast);
  return new Function(`with(this){return ${code}}`);
};

const parseComponent = (component) => {
  const { template, data, computed, methods, props } = component;
  const state = { ...data(), ...computed, ...props, methods };
  const directives = parseDirectives(template);

  // Parse template string and create virtual DOM tree
  const vdom = buildVdom(template, { state, directives });

  return vdom;
};

const createComponent = ({
  template = "",
  props = {},
  data = {},
  computed = {},
  methods = {},
  watch = {},
  mounted = () => {},
  updated = () => {},
  beforeDestroy = () => {},
  destroyed = () => {},
  mixins = [],
  setContext = () => {},
} = {}) => {
  const component = {
    template,
    props,
    data: () => {
      const reactiveData = reactive(data);
      mixins.forEach((mixin) => {
        if (mixin.data) {
          Object.assign(reactiveData, mixin.data());
        }
      });
      return reactiveData;
    },
    computed,
    methods,
    mounted,
    updated,
    beforeDestroy,
    destroyed,
    mixins,
    setContext,
  };
  mixins.forEach((mixin) => {
    if (mixin.computed) {
      Object.keys(mixin.computed).forEach((key) => {
        defineComputed(component.computed, key, mixin.computed[key]);
      });
    }
    if (mixin.methods) {
      Object.keys(mixin.methods).forEach((key) => {
        component.methods[key] = mixin.methods[key];
      });
    }
    if (mixin.watch) {
      Object.keys(mixin.watch).forEach((key) => {
        const handler = mixin.watch[key];
        watch(component.data(), key, (newValue, oldValue) => {
          handler.call(component, newValue, oldValue);
        });
      });
    }
  });
  return component;
};

const compileComponent = (component) => {
  // Define the component object
  const obj = createComponent(component);

  // Define the component template
  const template = component.template;

  // Create the component constructor
  const ComponentConstructor = () => {
    // Set the context for the component
    obj.setContext.call(this);

    // Set up the reactive data
    this.$data = reactive(obj.data);

    // Set up the computed properties
    for (const key in obj.computed) {
      const getter = obj.computed[key].bind(this);
      defineComputed(this, key, getter);
    }

    // Set up the methods
    for (const key in obj.methods) {
      this[key] = obj.methods[key].bind(this);
    }

    // Set up the watchers
    for (const key in obj.watch) {
      const handler = obj.watch[key].bind(this);
      watch(this.$data, key, handler);
    }

    // Call the mounted hook
    obj.mounted.call(this);
  };

  // Set up the component prototype
  ComponentConstructor.prototype = {
    ...ComponentConstructor.prototype,
    $destroy: function () {
      // Call the beforeDestroy hook
      obj.beforeDestroy.call(this);

      // Destroy the component
      unwatch(this.$data);
      delete this.$data;
      Object.setPrototypeOf(this, null);

      // Call the destroyed hook
      obj.destroyed.call(this);
    },
  };

  // Define the render function
  const vdom = parseComponent(component);

  // Add the render function to the component prototype
  ComponentConstructor.prototype.render = () => {
    return vdom();
  };

  // Return the component constructor
  return ComponentConstructor;
};

const fillFragment = (el, fragment) => {
  if (el) {
    const childNodes = fragment.childNodes;
    while (childNodes.length > 0) fragment.removeChild(childNodes[0]);
    fragment.appendChild(el);
  }
};

const createApp = () => {
  const proto = {
    el: null,
    main: null,
    router: null,
    store: null,
    mixins: null,
    directives: null,
    filters: null,
    components: null,
    utils: null,
  };

  const install = (plugin) => {
    if (plugin.install) {
      plugin.install(this);
    }
  };

  const mount = (el, comp, props) => {
    // mount the application to the DOM
    const mountPoint = window.document.querySelector(el);

    if (mountPoint) {
      if (comp.setContext) {
        comp.setContext(el, comp);
      }

      comp.props = props;

      const fragment = document.createDocumentFragment();
      const compiledComponent = compileComponent(comp);
      const node = compiledComponent.render();
      fillFragment(node, fragment);
    }
  };

  const unmount = () => {
    // unmount the application from the DOM
    this.el.parentNode.removeChild(this.el);
  };

  // This function registers a component with the framework.
  const registerComponent = (name, component) => {
    Object.assign(this.components, { [name]: component });
  };

  // This function retrieves a component by name.
  const getComponent = (name) => {
    return this.components[name];
  };

  const registerDirective = (name, directive) => {
    Object.assign(this.directives, { [name]: directive });
  };

  const registerFilter = (name, filter) => {
    Object.assign(this.filters, { [name]: filter });
  };

  const app = {
    ...proto,
    use: install,
    mount,
    unmount,
    registerComponent,
    getComponent,
    registerDirective,
    registerFilter,
  };

  return app;
};

export { watch, unwatch, reactive, defineComputed, createComponent, createApp };
