# Zenithic
Zenithic is a lightweight, fast, and highly customizable JavaScript framework designed as an alternative to React and other existing competitors. It features a powerful virtual DOM rendering engine, an intuitive and easy-to-learn API, and a flexible and modular architecture that allows developers to use only the features they need.

One of the main advantages of Zenithic is its small size and minimal overhead, requiring only a fraction of the memory footprint of existing frameworks. This allows developers to create responsive and performant applications with minimal effort.

Zenithic also focuses on developer productivity, offering a powerful templating system and state management library that reduce the amount of code needed to implement a feature. Additionally, it provides a robust plugin system that allows developers to extend the framework with custom components and features.

The framework has a core library size of under 50KB and no dependencies, and it supports server-side rendering, as well as the latest versions of all major browsers.

## Features
• Small size: Core library size of under 50KB and no dependencies
• Fast: Powerful virtual DOM rendering engine for efficient updates
• Customizable: Flexible and modular architecture allows developers to use only the features they need
• Productivity: Powerful templating system and state management library that reduce the amount of code needed to implement a feature
• Plugin system: Robust plugin system that allows developers to extend the framework with custom components and features
• Server-side rendering: Supported
• Browser support: Latest versions of all major browsers

## File structure
- src/
  - components/
    - Button.js
    - DatePicker.js
    - Input.js
    - Item.js
    - List.js
    - Select.js
    - TextArea.js
  - directives/
    - bind.js
    - cloak.js
    - for.js
    - if.js
    - model.js
    - on.js
    - once.js
    - pre.js
    - show.js
    - index.js
  - filters/
    - capitalize.js
    - currency.js
    - date.js
    - limitTo.js
    - lowercase.js
    - orderBy.js
    - uppercase.js
    - index.js
  - mixins/
    - clickOutside.js
    - draggable.js
    - focus.js
    - form.js
    - tooltip.js
    - transition.js
    - validator.js
    - index.js
  - router/
    - history.js
    - index.js
    - router.js
    - routes.js
    - utils.js
  - store/
    - actions.js
    - getters.js
    - modules.js
    - mutations.js
    - state.js
    - store.js
    - index.js
  - utils/
    - ajax.js
    - date.js
    - dom.js
    - log.js
    - number.js
    - url.js
    - utils.js
    - index.js
  - core.js
  - config.js
  - index.js
- .babelrc
- .editorconfig
- .eslintrc
- .gitignore
- .nvmrc
- package.json
- webpack.config.js

## Usage

To get started, install Zenithic using npm or yarn:

```bash
npm install zenithic
# or
yarn add zenithic
```

Then create a new application instance:

```js
import createZenithic from 'zenithic';

const app = createZenithic({
    // Application config
});
```

## Components
Components are the building blocks of Zenithic applications. They are reusable UI elements that can be combined to create complex interfaces. A component is defined as an object with properties that describe its behavior, data, and presentation.

### Component object properties

- `template`: A string that defines the component's markup. The template can contain placeholders for data properties that are defined in the data property. The placeholders are enclosed in double curly braces (e.g., {{ message }}).
- `props`: An object that defines the component's input properties. Props are similar to function parameters; they are used to pass data into the component. Each prop is defined as a key-value pair, where the key is the name of the prop and the value is an object that describes its type, default value, and other options.
- `data`: An object that defines the component's reactive data properties. Data properties are used to store and manipulate state within the component. Changes to data properties trigger a re-render of the component.
- `computed`: An object that defines the component's computed properties. Computed properties are derived from one or more data properties and are updated automatically when their dependencies change.
- `methods`: An object that defines the component's methods. Methods are used to perform actions or calculations within the component.
- `watch`: An object that defines the component's watchers. Watchers are used to perform an action when a data property changes. Watchers are defined as key-value pairs, where the key is the name of the property to watch and the value is a function that is executed when the property changes.
- `mounted`: A function that is executed when the component is mounted. Mounted is a lifecycle hook that is used to perform initialization tasks that require access to the DOM.
- `updated`: A function that is executed when the component is updated. Updated is a lifecycle hook that is used to perform tasks after the component has been re-rendered.
- `beforeDestroy`: A function that is executed before the component is destroyed. BeforeDestroy is a lifecycle hook that is used to perform cleanup tasks before the component is removed from the DOM.
- `destroyed`: A function that is executed when the component is destroyed. Destroyed is a lifecycle hook that is used to perform cleanup tasks after the component has been removed from the DOM.
- `mixins`: An array of objects that define mixins to be applied to the component. Mixins are reusable sets of component options that can be combined with other options to create a new component definition.

### Component Example
Here's an example of a simple component that displays a message:

```js
const HelloWorld = {
  template: '<div>{{ message }}</div>',
  data() {
    return {
      message: 'Hello, World!'
    }
  }
};
```

This component has a single data property (message) and a template that references it. When this component is rendered, it will display "Hello, World!".

### Usage

To use the Button component in another component, import it:

```js
import Button from './Button.js';
```

Then use it in the template:

```js
<Button @button-clicked="handleButtonClick" label="Click me!" />
```

And listen for the emitted event:

```js
export default {
    methods: {
        handleButtonClick(label) {
            // do something
        }
    }
};
```

## Filters
Filters are functions that can be used to transform data in a template. They are applied to an expression in double curly braces (e.g., {{ expression | filterName }}) and modify the data before it is displayed.

Zenithic comes with several built-in filters that can be used to format and manipulate data:

• capitalize: Capitalizes the first letter of a string.
• currency: Formats a number as currency using the specified currency code (e.g., USD, EUR).
• date: Formats a date using the specified format string (e.g., 'YYYY-MM-DD').
• limitTo: Limits an array to the specified number of items.
• lowercase: Converts a string to lowercase.
• orderBy: Orders an array by the specified property or function.
• uppercase: Converts a string to uppercase.

To use a filter, simply apply it to an expression in the template using the pipe character (|) followed by the filter name and any optional arguments. For example:

```html
<!-- Displays "Hello, World!" -->
<p>{{ message | capitalize }}</p>

<!-- Displays "$1,234.56" -->
<p>{{ price | currency('USD') }}</p>

<!-- Displays "2022-01-01" -->
<p>{{ date | date('YYYY-MM-DD') }}</p>

<!-- Displays the first 3 items in the array -->
<ul>
  <li v-for="item in items | limitTo(3)">{{ item }}</li>
</ul>

<!-- Displays "john doe" -->
<p>{{ name | lowercase }}</p>

<!-- Displays the array sorted by the 'name' property -->
<ul>
  <li v-for="item in items | orderBy('name')">{{ item.name }}</li>
</ul>

<!-- Displays "JOHN DOE" -->
<p>{{ name | uppercase }}</p>
```

You can also chain filters to apply multiple transformations to the same data:

```html
<!-- Displays the first 3 items in the array, sorted by the 'name' property -->
<ul>
  <li v-for="item in items | orderBy('name') | limitTo(3)">{{ item.name }}</li>
</ul>
```

To register a new filter with the framework, you can use the registerFilter function.
The name parameter is a string representing the name of the filter, and the filter parameter is a function that takes a value and returns the transformed value.

For example, the following code registers a new reverse filter that reverses a string:

```js
registerFilter('reverse', (value) => {
    return value.split('').reverse().join('');
});
```

This filter splits the input string into an array, reverses the array, and then joins the array back into a string.


## Mixins
Mixins are reusable components that can be shared across components.

```js
// Define a mixin
const myMixin = {
    methods: {
        myMethod() {
            // do something
        }
    }
};

// Register the mixin
app.use(myMixin);

// Use the mixin in a component
export default {
    mixins: [myMixin],
    methods: {
        // Use the mixin's method
        myOtherMethod() {
            this.myMethod();
        }
    }
};
```

## Directives
Directives are functions that can be used to extend HTML elements.
For example, the following code registers a new v-scroll directive that updates a component's data property when the user scrolls the page:

```js
app.registerDirective('scroll', {
    mounted(el, binding) {
        window.addEventListener('scroll', () => {
            const { value } = binding;
            const { top } = el.getBoundingClientRect();
            const isVisible = top < window.innerHeight && top > 0;
            value(el, isVisible);
        });
    },
});
```
This directive adds an event listener to the window object that updates the isVisible data property of the component whenever the user scrolls the page.


```html
<div v-show="isVisible">Visible</div>
```

In this example, the `v-show` directive will show the div element only when the isVisible data property is true.

Other commonly used directives include `v-if`, `v-for`, `v-bind`, and `v-on`.

## Plugins

Plugins can be used to register application-level features.

```js
// Define a plugin
const myPlugin = {
    install(app) {
        app.myMethod = () => {
            // do something
        };
    }
};

// Register the plugin
app.use(myPlugin);

// Use the plugin
app.myPlugin.myMethod();
```

## Routing
To enable routing, use the `router` plugin:

```js
import router from 'zenithic/plugins/router';

app.use(router.createRouter());
```

Then define your routes:

```js
app.router.addRoutes([
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/about',
        component: AboutPage
    }
]);
```

## Store (state management)

To enable state management, use the `store` plugin:

```js
import store from 'zenithic/plugins/store';

app.use(store.createStore());
```

Then define your state and mutations:

```js
app.store.state.myState = {
    count: 0
};

app.store.mutations.increment = (state) => {
    state.count++;
};
```

### Modules
To create modular state, you can use modules.

Create a module by defining its state and mutations

```js
const userModule = {
    state: {
        userName: ''
    },
    mutations: {
        setUserName (state, userName) {
            state.userName = userName
        }
    }
}
```

Then register your module to the store

```js
app.store.registerModule('user', userModule);
```

### Actions
Actions can be used to dispatch multiple mutations to the store.

Define an action

```js
app.store.actions.editUserName = ({ commit }, userName) => {
    commit('setUserName', userName);
};
```

Dispatch an action

```js
app.store.dispatch('editUserName', 'John Doe');
```

### Difference between actions and mutations
A mutation is a strategy for mutating the state of an application. Mutations are Synchronous functions that directly modify the state object. When a mutation is triggered, the mutation handler is executed and the new data is pushed to the store. 

An action is a strategy for modifying the state of an application. Unlike mutations, actions are Asynchronous functions that do not directly modify the state object. Actions can be used to perform more complex operations that require multiple steps such as making an API call, doing some business logic, or dispatching multiple mutations. When an action is triggered, the action handler is executed and the mutation handlers are dispatched to update the state.

### Retrieving data

Data can be retrieved from the store using getters.

Define a getter

```js
app.store.getters.userName = (state) => state.userName;
```

Retrieve the data

```js
app.store.get('userName'); // 'John Doe'
```

## Customizing the configuration

You can customize the configuration by passing options to the `createZenithic` method.

## Rendering

To render the application, use the `render` method:

```js
app.render();
```

## App example
App.js
```js
export default {
  template: `<div>{{ title }}</div>`,
  props: {
      title: {
          type: String,
          required: true
      }
};
```

config.js
```javascript
export default {
  plugins: [],
  directives: [],
  store: {
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    modules: {}
  }
};
```

index.js
```javascript
import createZenithic, component from 'zenithic';

import App from './App';
import config from './config';

// Create application instance
const app = createZenithic(config);

// Register router plugin
app.use(router.createRouter());

// Register store plugin
app.use(store.createStore());

// Setup routes
app.router.addRoutes([
    {
        path: '/',
        component: App
    }
]);

// Setup state
app.store.state.count = 0;

// Setup mutations
app.store.mutations.increment = (state) => {
    state.count++;
};

// Mount and render
app.mount('#app', App, { title: 'Hello World' });
```

package.json
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "zenithic": "^1.0.0"
  }
}
```