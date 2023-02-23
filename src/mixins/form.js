export default {
  data() {
    return {
      form: {
        fields: {},
        errors: {},
        isValid: false,
        isSubmitted: false,
        submitError: null,
        submitSuccess: null,
      },
    };
  },

  methods: {
    validateField(fieldName) {
      const field = this.form.fields[fieldName];
      const validators = field.validators || [];

      let isValid = true;
      let errorMessage = "";

      for (let validator of validators) {
        const result = validator(field.value);

        if (typeof result === "string") {
          isValid = false;
          errorMessage = result;
          break;
        } else {
          isValid = result;
        }
      }

      this.form.errors[fieldName] = errorMessage;
      field.isValid = isValid;
    },

    validateForm() {
      for (let fieldName in this.form.fields) {
        this.validateField(fieldName);
      }

      this.form.isValid = Object.values(this.form.fields).every(
        (field) => field.isValid
      );
    },

    submitForm() {
      this.validateForm();

      if (this.form.isValid) {
        this.form.isSubmitted = true;

        this.$emit("submit", this.form.fields, this.onSuccess, this.onError);
      }
    },

    resetForm() {
      for (let fieldName in this.form.fields) {
        this.form.fields[fieldName].value = "";
        this.form.fields[fieldName].isValid = false;
      }

      this.form.errors = {};
      this.form.isValid = false;
      this.form.isSubmitted = false;
      this.form.submitError = null;
      this.form.submitSuccess = null;
    },

    onSuccess(response) {
      this.form.isSubmitted = false;
      this.form.submitSuccess = response;

      this.$emit("success", response);
    },

    onError(error) {
      this.form.isSubmitted = false;
      this.form.submitError = error;

      this.$emit("error", error);
    },
  },
};
