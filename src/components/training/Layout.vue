<!-- <template>
  <v-container>
    <v-row>
      <v-col class="custom1" v-for="item in items">
        <img :src="item.url" :alt="item.alt" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="custom2">
        <v-card>
          <v-card-title>Employees</v-card-title>
          <v-card-item>65</v-card-item>
        </v-card>
      </v-col>
      <v-col class="custom2">
        <v-card>
          <v-card-title>Ream Sold</v-card-title>
          <v-card-item>983,00</v-card-item>
        </v-card>
      </v-col>
      <v-col class="custom2">
        <v-card>
          <v-card-title>Rating</v-card-title>
          <v-card-item>87 %</v-card-item>
        </v-card>
      </v-col>
      <v-col class="custom2">
        <v-card>
          <v-card-title>Revenue</v-card-title>
          <v-card-item>$2.3M</v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12" lg="7" class="custom3">
        <table-views></table-views>
      </v-col>
      <v-col md="12" lg="5" class="custom3">
        <div>
          <v-banner
            class="my-4"
            color="deep-purple-accent-4"
            icon="mdi-lock"
            lines="two"
          >
            <v-banner-text> Banner with one line of text. </v-banner-text>

            <template v-slot:actions>
              <v-btn>Action</v-btn>
            </template>
          </v-banner>

          <v-banner
            class="my-4"
            color="error"
            icon="mdi-weather-hurricane"
            lines="two"
          >
            <v-banner-text>
              Banner with two lines of text. If the text is too long to fit on
              two lines then an ellipsis will be used to hide the remaining
              content. So this next line will be hidden.
            </v-banner-text>

            <template v-slot:actions>
              <v-btn>Action</v-btn>
            </template>
          </v-banner>

          <v-banner class="my-4" color="warning" icon="$warning" lines="two">
            <v-banner-text>
              Banner with two lines of text. One or two lines is preferable. two
              lines should be considered the absolute maximum length on desktop
              in order to keep messages short and actionable.
            </v-banner-text>

            <template v-slot:actions>
              <v-btn>Action</v-btn>
            </template>
          </v-banner>

          <v-banner
            class="my-4"
            color="deep-purple-accent-4"
            icon="mdi-controller"
            lines="two"
          >
            <v-banner-text> Banner with one line of text. </v-banner-text>

            <template v-slot:actions>
              <v-btn>Action</v-btn>
            </template>
          </v-banner>

          <v-banner
            class="my-4"
            color="error"
            icon="mdi-alarm-light"
            lines="two"
          >
            <v-banner-text>
              Banner with two lines of text. If the text is too long to fit on
              two lines then an ellipsis will be used to hide the remaining
              content. So this next line will be hidden.
            </v-banner-text>

            <template v-slot:actions>
              <v-btn>Action</v-btn>
            </template>
          </v-banner>

          <v-banner class="my-4" color="warning" icon="mdi-alert" lines="two">
            <v-banner-text>
              Banner with two lines of text. One or two lines is preferable. two
              lines should be considered the absolute maximum length on desktop
              in order to keep messages short and actionable.
            </v-banner-text>

            <template v-slot:actions>
              <v-btn>Action</v-btn>
            </template>
          </v-banner>

          <v-banner class="my-4" color="error" icon="mdi-biathlon" lines="two">
            <v-banner-text>
              Banner with two lines of text. If the text is too long to fit on
              two lines then an ellipsis will be used to hide the remaining
              content. So this next line will be hidden.
            </v-banner-text>

            <template v-slot:actions>
              <v-btn>Action</v-btn>
            </template>
          </v-banner>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const items = [
  {
    id: 1,
    url: "https://cdn.boldbi.com/wp/blogs/sales-opportunities/opportunities-by-created.webp",
    alt: "Picture missing: Oppurtinities by Created Date",
  },
  {
    id: 2,
    url: "https://garysmithpartnership.com/wp-content/uploads/2019/03/PIPELI1.jpg",
    alt: "Picture missing: Pipeline by Close Day",
  },
  {
    id: 3,
    url: "https://cdn.venngage.com/template/thumbnail/small/c3818539-d91a-49ba-b26a-98ea90bbeb19.webp",
    alt: "Picture missing: Sales Performance Analysis",
  },
];
</script>

<style scoped>
.v-card {
  background-color: #4ea8de;
}

.v-banner {
  background-color: #4ea8de;
}

.v-card-title {
  text-align: left;
}

.v-card-item {
  text-align: left;
  font-size: xx-large;
}

.v-data-table {
  background-color: #f6fff8;
}

img {
  border-radius: 2%;
  width: 300px;
  height: 250px;
}

@media (max-width: 600px) {
  .v-banner icon {
    display: none;
  }
}
</style> -->
