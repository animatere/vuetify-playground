<template>
  <v-form>
    <div>
      <h3>Kundenangaben</h3>
      <v-text-field name="Vorname" label="Vorname" id="Vorname"></v-text-field>
      <v-text-field
        name="Nachname"
        label="Nachname"
        id="Nachname"
      ></v-text-field>
      <v-text-field
        name="name"
        label="Telefonnummer"
        id="id"
        type="number"
      ></v-text-field>
    </div>

    <div>
      <h3>Adresse</h3>
      <v-text-field name="Straße" label="Straße" id="Straße"></v-text-field>
      <v-text-field
        name="Hausnummer"
        label="Hausnummer"
        id="Hausnummer"
      ></v-text-field>
      <v-text-field
        name="Postleitzahl"
        label="Postleitzahl"
        id="Postleitzahl"
      ></v-text-field>
      <v-text-field name="Stadt" label="Stadt" id="Stadt"></v-text-field>
    </div>
  </v-form>

  <v-row>
    <v-col>
      <v-btn
        @click="confirmSaveClicked"
        color="primary"
        style="margin-top: 10px"
      >
        Save</v-btn
      >
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
function confirmSaveClicked() {
  console.log("User Address saved.");
}
</script>
