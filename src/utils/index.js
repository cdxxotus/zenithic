import ajax from './ajax';
import date from './date';
import dom from './date';
import log from './date';
import number from './date';
import url from './date';
import utils from './date';

export function createUtils(config) {
    return {
        install: (app) => app['utils'] = {
            ajax,
            date,
            dom,
            log,
            number,
            url,
            utils,
        }
    }
};