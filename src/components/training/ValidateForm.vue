<script lang="ts">
import { VForm } from "vuetify/components";

export default {
  data: () => ({
    agreeToTerms: false,
    email: "",
    emailRules: [
      (value: string) => !!value || "Email is required. ",
      (value: string) => value.includes("@") || "No valid email address.",
      (value: string) =>
        value.indexOf("@") !== 0 || "Email should have username.",
      (value: string) =>
        value.indexOf(".") - value.indexOf("@") > 1 ||
        "Email should contain a valid domain.",
    ],
    agreeToTermsRules: [
      (value: string) => !!value || "You must agree this Terms and Conditions",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    birthday: new Date(),
    formValidity: false,
  }),

  methods: {
    async validate() {
      const { valid } = await (this.$refs.signUpform as VForm).validate();
      return valid;
    },
    resetForm() {
      (this.$refs.signUpform as VForm).reset();
    },
    resetValidation() {
      (this.$refs.signUpform as VForm).resetValidation();
    },
  },
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form
          ref="signUpform"
          v-model="formValidity"
          style="width: 90vw; margin-left: 5vw; margin-right: 5vw"
        >
          <v-text-field
            label="Email"
            type="email"
            v-model="email"
            :rules="emailRules"
            required
          >
          </v-text-field>
          <v-autocomplete label="Components" :items="items"> </v-autocomplete>
          <v-col style="margin: 25px">
            <v-checkbox
              label="Agree to terms & conditions"
              v-model="agreeToTerms"
              :rules="agreeToTermsRules"
              required
            >
            </v-checkbox>
          </v-col>
          <v-btn
            color="primary"
            class="validation-btn"
            type="submit"
            :disabled="!formValidity"
            >Submit</v-btn
          >
          <v-btn color="warning" class="validation-btn" @click="resetForm"
            >Reset</v-btn
          >
          <v-btn color="error" class="validation-btn" @click="resetValidation"
            >Reset Validation</v-btn
          >
          <v-btn color="info" class="validation-btn" @click="validate"
            >Validate</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-sheet {
  margin-top: 15px;
  padding: 35px;
}
.validation-btn {
  margin-right: 5px !important;
  width: 180px !important;
}

@media (max-width: 800px) {
  .validation-btn {
    margin-top: 15px;
  }
}
</style>
