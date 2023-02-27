import { Mixins } from "../mixins";

export type ComponentsConfig = string[];

export type Prop = {
  type: any;
  required: boolean;
};

export type Props = {
  [key: string]: Prop;
};

export type Method = (...args: any[]) => unknown;

export type CompiledComponent = Component & {
  el: Element;
  render: () => DocumentFragment;
  $destroy: () => void;
  $emit: (key: string, ...args: any[]) => void;
  $data: { [key: string]: any };
  [properties: string]: ((...args: any[]) => any) | any;
}

export type Component = {
  template: string;
  props?: Props;
  data?(): { [key: string]: any };
  computed?: { [key: string]: any };
  methods?: {
    [key: string]: Method;
  };
  watch?: {[key: string]: () => any };
  beforeMount?: () => any;
  mounted?: () => any;
  updated?: () => any;
  beforeDestroy?:() => any;
  destroyed?: () => any;
  mixins?: Mixins;
  context?: { [key: string]: any };
};

export type Components = {
  [component: string]: Component;
};

export type TextareaComponent = {
  template: string;
  props: {
    value: {
      type: StringConstructor;
      required: true;
    };
    placeholder: {
      type: StringConstructor;
      required: false;
    };
    onInput: {
      type: FunctionConstructor;
      required: true;
    };
  };
  methods: {
    handleInput: (e: Event) => void;
  };
};

export type SelectComponent = {
  template: string;
  props: {
    value: {
      type: StringConstructor;
      required: true;
    };
    options: {
      type: ArrayConstructor;
      required: true;
    };
    onChange: {
      type: FunctionConstructor;
      required: true;
    };
  };
  methods: {
    handleChange: (e: Event) => void;
  };
};

export type ListComponent = {
  template: string;
  props: {
    items: {
      type: ArrayConstructor;
      required: false;
    };
  };
};

export type InputComponent = {
  template: string;
  props: {
    value: {
      type: StringConstructor;
      required: true;
    };
    placeholder: {
      type: StringConstructor;
      required: false;
    };
    onInput: {
      type: FunctionConstructor;
      required: true;
    };
  };
  methods: {
    handleInput: (e: Event) => void;
  };
};

export type DatePickerComponent = {
  template: string;
  props: {
    value: {
      type: DateConstructor;
      required: true;
    };
    placeholder: {
      type: StringConstructor;
      required: false;
    };
    onInput: {
      type: FunctionConstructor;
      required: true;
    };
  };
  methods: {
    handleInput: (e: Event) => void;
  };
};

export type ButtonComponent = {
  template: string;
  props: {
    text: {
      type: StringConstructor;
      required: true;
    };
  };
};
