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

const userData = [
  {
    id: 1,
    username: "Alice Smith",
    status: "1",
    work_area: "Development",
    roles: "Developer",
  },
  {
    id: 2,
    username: "Bob Johnson",
    status: "2",
    work_area: "Marketing",
    roles: "Manager",
  },
  {
    id: 3,
    username: "Carol Williams",
    status: "1",
    work_area: "Finance",
    roles: "Accountant",
  },
  {
    id: 4,
    username: "Dave Brown",
    status: "3",
    work_area: "Customer Support",
    roles: "Support Agent",
  },
  {
    id: 5,
    username: "Emma Davis",
    status: "1",
    work_area: "IT",
    roles: "Administrator",
  },
  {
    id: 6,
    username: "Frank Wilson",
    status: "2",
    work_area: "Sales",
    roles: "Sales Manager",
  },
  {
    id: 7,
    username: "Grace Martinez",
    status: "1",
    work_area: "Research",
    roles: "Researcher",
  },
  {
    id: 8,
    username: "Henry Taylor",
    status: "3",
    work_area: "Logistics",
    roles: "Coordinator",
  },
  {
    id: 9,
    username: "Isabella Anderson",
    status: "1",
    work_area: "Human Resources",
    roles: "HR Specialist",
  },
  {
    id: 10,
    username: "James Thomas",
    status: "2",
    work_area: "Legal",
    roles: "Legal Advisor",
  },
  {
    id: 11,
    username: "Julia Evans",
    status: "1",
    work_area: "Quality Assurance",
    roles: "QA Engineer",
  },
  {
    id: 12,
    username: "Kyle Scott",
    status: "2",
    work_area: "Operations",
    roles: "Operations Manager",
  },
  {
    id: 13,
    username: "Lily Green",
    status: "1",
    work_area: "Product Management",
    roles: "Product Owner",
  },
  {
    id: 14,
    username: "Mason Clark",
    status: "3",
    work_area: "Supply Chain",
    roles: "Supply Chain Analyst",
  },
  {
    id: 15,
    username: "Nina Baker",
    status: "1",
    work_area: "Data Science",
    roles: "Data Scientist",
  },
  {
    id: 16,
    username: "Oscar Perez",
    status: "2",
    work_area: "Legal",
    roles: "Paralegal",
  },
  {
    id: 17,
    username: "Paula Reed",
    status: "1",
    work_area: "Marketing",
    roles: "Content Strategist",
  },
  {
    id: 18,
    username: "Quinn Murphy",
    status: "1",
    work_area: "Business Development",
    roles: "Business Analyst",
  },
  {
    id: 19,
    username: "Rachel Lopez",
    status: "3",
    work_area: "Finance",
    roles: "Financial Analyst",
  },
  {
    id: 20,
    username: "Sam Walker",
    status: "1",
    work_area: "Research & Development",
    roles: "R&D Specialist",
  },
];

const headers = [
  { title: "Id", value: "id", key: "id" },
  { title: "Username", value: "username", key: "username" },
  { title: "Status", value: "status", key: "status" },
  { title: "Work Area", value: "work_area", key: "work_area" },
  { title: "Roles", value: "roles", key: "roles" },
];
</script>

<template>
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
</style>
