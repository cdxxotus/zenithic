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

type FormMixin = Mixin & {
  form: Form;
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
    validateField(fieldName) {
      const field = (this as FormMixin).form.fields[fieldName];
      const validators = field.validators || [];

      let isValid = true;
      let errors = [];

      for (let validator of validators) {
        const result = validator(field.value);
        if (!result.isValid) {
          isValid = false;
          field.isValid = isValid;
          errors.push(result.error);
          (this as FormMixin).form.errors[fieldName] = errors;
        }
      }
    },

    validateForm() {
      for (let fieldName in (this as FormMixin).form.fields) {
        (this as FormMixin).validateField(fieldName);
      }

      (this as FormMixin).form.isValid = Object.values((this as FormMixin).form.fields).every(
        (field) => field.isValid
      );
    },

    submitForm() {
      (this as FormMixin).validateForm();

      if ((this as FormMixin).form.isValid) {
        (this as FormMixin).form.isSubmitted = true;

        (this as FormMixin).$emit("submit", this.form.fields, this.onSuccess, this.onError);
      }
    },

    resetForm() {
      for (let fieldName in this.form.fields) {
        (this as FormMixin).form.fields[fieldName].value = "";
        (this as FormMixin).form.fields[fieldName].isValid = false;
      }

      (this as FormMixin).form.errors = {};
      (this as FormMixin).form.isValid = false;
      (this as FormMixin).form.isSubmitted = false;
      (this as FormMixin).form.submitError = null;
      (this as FormMixin).form.submitSuccess = null;
    },

    onSuccess(response) {
      (this as FormMixin).form.isSubmitted = false;
      (this as FormMixin).form.submitSuccess = response;

      (this as FormMixin).$emit("success", response);
    },

    onError(error: any) {
      (this as FormMixin).form.isSubmitted = false;
      (this as FormMixin).form.submitError = error;

      (this as FormMixin).$emit("error", error);
    },
  },
};

export default form;
