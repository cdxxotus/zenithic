export function createActions(config) {
    const { actions = {}, modules = {} } = config;
    const allActions = {};

    Object
        .keys(modules)
        .forEach(moduleName => {
            const module = modules[moduleName];
            const { actions = {} } = module;
            
            Object
                .keys(actions)
                .forEach(actionName => {
                    const actionFullName = `${ moduleName }/${ actionName }`;
                    allActions[actionFullName] = actions[actionName];
                });
        });

    Object
        .keys(actions)
        .forEach(actionName => {
            allActions[actionName] = actions[actionName];
        });
        
    return allActions;
}