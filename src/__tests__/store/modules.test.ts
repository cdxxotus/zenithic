import { prepareModule } from '../../store/modules';
import { buildStore } from '../../store/store';
import { CompiledComponent } from '../../types/components';

import { Module, Store } from '../../types/store';

describe('prepareModule functions', () => {
  test('should buildStore with the correct config', () => {
    const moduleName = 'user';
    const module: Module = {
      initialState: {},
      actions: {},
      getters: {},
      mutations: {},
    };
    const expectedStore = {
      state: {
        user: {}
      },
      actions: {},
      getters: {},
      mutations: {},
    };
    const store = prepareModule(moduleName, module);
    expect(store).toStrictEqual(expectedStore);
  });

  test('should return an object with the correct properties', () => {
    const moduleName = 'user';
    const module: Module = {
      initialState: {
        firstName: 'John',
        lastName: 'Doe',
      },
      actions: {
        greet: jest.fn(),
      },
      getters: {
        fullName: () => `${(this as CompiledComponent).state.user.firstName} ${(this as CompiledComponent).state.user.lastName}`,
      },
      mutations: {
        setFirstName: jest.fn(),
        setLastName: jest.fn(),
      },
    };

    const expectedStore: Partial<Store> = {
      state: {
        user: {
            firstName: 'John',
            lastName: 'Doe'
        }
      },
      actions: {
        'user/greet': expect.any(Function),
      },
      getters: {
        'user/fullName': expect.any(Function),
      },
      mutations: {
        'user/setFirstName': expect.any(Function),
        'user/setLastName': expect.any(Function),
      },
    };
    const store = prepareModule(moduleName, module);
    expect(store).toEqual(expectedStore);
  });
});
