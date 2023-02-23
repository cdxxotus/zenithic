import bind from './bind';
import cloak from './cloak';
import forLoop from './for';
import ifCondition from './if';
import model from './model';
import on from './on';
import once from './once';
import pre from './pre';
import show from './show';

export function createDirectives(config) {
    return {
        install: (app) => app['directives'] = {
            bind,
            cloak,
            for: forLoop,
            if: ifCondition,
            model,
            on,
            once,
            pre,
            show,
        }
    };
}