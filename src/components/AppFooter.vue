<template>
  <v-footer class="my-footer">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        color="black"
        rounded="xl"
        variant="text"
      >
        <p class="foot-links">{{ link }}</p>
      </v-btn>
      <v-col class="text-center mt-4" cols="12" style="color: black">
        {{ new Date().getFullYear() }} — <strong> by Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script lang="ts">
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
      {
        name: "Eclair",
        calories: 262,
      },
      {
        name: "Cupcake",
        calories: 305,
      },
      {
        name: "Gingerbread",
        calories: 356,
      },
      {
        name: "Jelly bean",
        calories: 375,
      },
      {
        name: "Lollipop",
        calories: 392,
      },
      {
        name: "Honeycomb",
        calories: 408,
      },
      {
        name: "Donut",
        calories: 452,
      },
      {
        name: "KitKat",
        calories: 518,
      },
    ],
  }),
};
</script>

<style>
.v-footer {
  max-height: 100px;
}

v-btn {
  color: black;
}

.my-footer {
  background-color: #4ea8de !important;
}

.foot-links:hover {
  color: white;
}
</style>
