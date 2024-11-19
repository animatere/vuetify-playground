<script lang="ts">
import { VForm } from 'vuetify/components'

export default {
  data: () => ({
    name: "",
    agreeToTerms: false,
    email: "",
    // nameRules: () => [
    //   value => !!value || 'Name is required',
    //   // value => (value && value.length <= 10) || 'Name must be 10 characters or less',
    // ],
    emailRules: [
      (value: string) => !!value || "Email is required. ",
      (value: string) => value.includes("@") || "No valid email address.",
      (value: string) => value.indexOf("@") !== 0 || "Email should have username.",
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
      console.log(this.formValidity);
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
        <v-form ref="signUpform" v-model="formValidity">
          <v-text-field
            label="Email"
            type="email"
            v-model="email"
            :rules="emailRules"
            required
          >
          </v-text-field>
          <v-autocomplete label="Components" :items="items"> </v-autocomplete>
          <!--        <v-file-input-->
          <!--          label="Attached profile picture"-->
          <!--        >-->
          <!--        </v-file-input>-->

          <!--        <v-text-field-->
          <!--          label="Birthday"-->
          <!--          v-model="birthday"-->
          <!--          readonly>-->
          <!--        </v-text-field>-->

          <!--        <v-date-picker-->
          <!--          v-model="birthday">-->
          <!--        </v-date-picker><br>-->
          <v-col style="margin: 25px">
            <v-checkbox
              label="Agree to terms & conditions"
              v-model="agreeToTerms"
              :rules="agreeToTermsRules"
              required
            >
            </v-checkbox>
          </v-col>
          <v-btn color="primary" type="submit" :disabled="!formValidity"
            >Submit</v-btn
          >
          <v-btn color="warning" @click="resetForm">Reset</v-btn>
          <v-btn color="error" @click="resetValidation">Reset Validation</v-btn>
          <v-btn color="info" @click="validate">Validate</v-btn>
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
.v-btn {
  margin-right: 5px;
}
</style>
