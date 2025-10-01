<template>
  <v-container>
    <v-row>
      <v-col class="CustomerInformation" lg="6" md="12" sm="12">
        <address-view></address-view>
      </v-col>
      <v-col class="PaymentOverview" lg="5" md="12" sm="12">
        <payment-view></payment-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.PaymentOverview {
  /* background-color: rgb(202, 197, 197); */
  padding: 25px;
}

.CustomerInformation {
  padding: 25px;
  border-right: solid black 1px;
  margin-right: 25px;
}

.v-text-field {
  padding: 5px;
}

h3 {
  text-align: left;
  margin-bottom: 5px;
}

@media (max-width: 960px) {
  .PaymentOverview {
    padding: 20px;
  }
  .CustomerInformation {
    padding: 20px;
  }
}

@media (max-width: 1280px) {
  .PaymentOverview {
    padding: 30px;
  }
  .CustomerInformation {
    padding: 30px;
  }
}

@media (max-width: 1920px) {
  .PaymentOverview {
    padding: 40px;
  }
  .CustomerInformation {
    padding: 40px;
  }
}

@media (max-width: 2560) {
  .PaymentOverview {
    padding: 50px;
  }
  .CustomerInformation {
    padding: 50px;
  }
}
</style>
