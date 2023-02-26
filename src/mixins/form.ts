import { CompiledComponent } from "../types/components";
import { Mixin } from "../types/mixins";

type Form = {
  fields: { [fieldName: string]: Field };
  errors: { [fieldName: string]: string[] };
  isValid: boolean;
  isSubmitted: boolean;
  submitError: any;
  submitSuccess: any;
};

type FieldValidator = (value: any) => { isValid: boolean; error: string };

type Field = {
  isValid: boolean;
  validators: FieldValidator[];
  value: string;
};

type CompiledFormMixin = CompiledComponent & {
  form: Form;
  validateFormField: (fieldName: string) => void;
  validateForm: () => void;
  submitForm: () => void;
  resetForm: () => void;
  onFormSubmitSuccess: (response: any) => void;
  onFormSubmitError: (error: any) => void;
}

const form: Mixin = {
  data() {
    return {
      form: {
        fields: {},
        errors: {},
        isValid: false,
        isSubmitted: false,
        submitError: null,
        submitSuccess: null,
      } as Form,
    };
  },

  methods: {
    validateFormField(fieldName: string) {
      const field = (this as CompiledFormMixin).form.fields[fieldName];
      const validators = field.validators || [];

      let isValid = true;
      let errors = [];

      for (let validator of validators) {
        const result = validator(field.value);
        if (!result.isValid) {
          isValid = false;
          field.isValid = isValid;
          errors.push(result.error);
          (this as CompiledFormMixin).form.errors[fieldName] = errors;
        }
      }
    },

    validateForm() {
      for (let fieldName in (this as CompiledFormMixin).form.fields) {
        (this as CompiledFormMixin).validateField(fieldName);
      }

      (this as CompiledFormMixin).form.isValid = Object.values((this as CompiledFormMixin).form.fields).every(
        (field) => field.isValid
      );
    },

    submitForm() {
      (this as CompiledFormMixin).validateForm();

      if ((this as CompiledFormMixin).form.isValid) {
        (this as CompiledFormMixin).form.isSubmitted = true;

        (this as CompiledFormMixin).$emit("submit", this.form.fields, this.onSuccess, this.onError);
      }
    },

    resetForm() {
      for (let fieldName in this.form.fields) {
        (this as CompiledFormMixin).form.fields[fieldName].value = "";
        (this as CompiledFormMixin).form.fields[fieldName].isValid = false;
      }

      (this as CompiledFormMixin).form.errors = {};
      (this as CompiledFormMixin).form.isValid = false;
      (this as CompiledFormMixin).form.isSubmitted = false;
      (this as CompiledFormMixin).form.submitError = null;
      (this as CompiledFormMixin).form.submitSuccess = null;
    },

    onFormSubmitSuccess(response: any) {
      (this as CompiledFormMixin).form.isSubmitted = false;
      (this as CompiledFormMixin).form.submitSuccess = response;

      (this as CompiledFormMixin).$emit("success", response);
    },

    onFormSubmitError(error: any) {
      (this as CompiledFormMixin).form.isSubmitted = false;
      (this as CompiledFormMixin).form.submitError = error;

      (this as CompiledFormMixin).$emit("error", error);
    },
  },
};

export default form;
