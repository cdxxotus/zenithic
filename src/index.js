import { createApp } from './core';
import { createRouter } from './router';
import { createStore } from './store';
import { createMixins } from './mixins';
import { createDirectives } from './directives';
import { createFilters } from './filters';
import { createComponents } from './components';
import { createUtils } from './utils';
import defaultConfig from './config';

export default function createZenithic(config = defaultConfig) {
    const app = createApp();
    const router = createRouter(config);
    const store = createStore(config);
    const mixins = createMixins(config);
    const directives = createDirectives(config);
    const filters = createFilters(config);
    const components = createComponents(config);
    const utils = createUtils(config);

    app.use(router);
    app.use(store);
    app.use(mixins);
    app.use(directives);
    app.use(filters);
    app.use(components);
    app.use(utils);

    return app;
}