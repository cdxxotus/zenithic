import clickOutside from './clickOutside';
import draggable from './draggable';
import focus from './focus';
import form from './form';
import tooltip from './tooltip';
import transition from './transition';
import validator from './validator';

export function createMixins(config) {
    return {
        install: (app) => app['mixins'] = {
            clickOutside,
            draggable,
            focus,
            form,
            tooltip,
            transition,
            validator,
        }
    };
}