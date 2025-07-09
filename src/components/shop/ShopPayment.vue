<template>
  <v-container>
    <v-row>
      <v-col class="CustomerInformation" cols="6">
        <v-form>
          <div>
            <h3>Kundenangaben</h3>
            <v-text-field
              name="name"
              label="Email-Adresse"
              id="id"
            ></v-text-field>
            <v-text-field name="name" label="Vorname" id="id"></v-text-field>
            <v-text-field name="name" label="Nachname" id="id"></v-text-field>
            <v-text-field
              name="name"
              label="Telefonnummer"
              id="id"
              type="number"
            ></v-text-field>
          </div>
          <div>
            <h3>Lieferadresse</h3>
            <v-text-field name="name" label="Straße" id="id"></v-text-field>
            <v-text-field name="name" label="Hausnummer" id="id"></v-text-field>
            <v-text-field
              name="name"
              label="Postleitzahl"
              id="id"
            ></v-text-field>
            <v-text-field name="name" label="Stadt" id="id"></v-text-field>
          </div>
        </v-form>
      </v-col>
      <v-col class="PurchaseOverview" cols="5">
        <h3>Bestellübersicht</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.PurchaseOverview {
  background-color: rgb(202, 197, 197);
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
</style>
