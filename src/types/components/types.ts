export type ComponentsConfig = string[];

export type Prop = {
  type: any;
  required: boolean;
};

export type Method = (...args: any[]) => unknown;

export type Component = {
  template: string;
  props?: {
    [key: string]: Prop;
  };
  data?: any;
  computed?: any;
  methods?: {
    [key: string]: Method;
  };
  watch?: any;
  beforeMount?: any;
  mounted?: any;
  updated?: any;
  beforeDestroy?: any;
  destroyed?: any;
  mixins?: any;
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
