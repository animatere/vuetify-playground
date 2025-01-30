<template>
    <v-container>

        <v-row style="margin-bottom: 25px;">
            <v-btn color="warning" @click="onChangeCategory('Back')">Back</v-btn>
        </v-row>

        <v-row v-if="category === ''">
            <col class="category-col" cols="3">
                <v-btn class="category-card"color="accent" @click="onChangeCategory('Fun')">
                    Fun
                </v-btn>
            </col>
            <col class="category-col" cols="3">
                <v-btn class="category-card"color="success" @click="onChangeCategory('Action')">
                    Action
                </v-btn>
            </col>
            <col class="category-col" cols="3">
                <v-btn class="category-card" color="info" @click="onChangeCategory('Brain')">
                    Brain
                </v-btn>
            </col>
        </v-row>

        <v-row v-if="category === 'Fun'">
            <qh-questcard :category="category" />
        </v-row>

        <v-row v-if="category === 'Action'">
            <qh-questcard :category="category" />
        </v-row>

        <v-row v-if="category === 'Brain'">
            <qh-questcard :category="category" />
        </v-row>

    </v-container>

    

  </template>
  
  <script setup lang="ts">
    let category = ref('')

    onMounted(async () => {
        console.log(category)
    });

    function onChangeCategory(newCategory: string){

        if(newCategory === 'Back')
            category.value = ''

        else{
            category.value = newCategory
            console.log(category.value)
        }

    }

  </script>
  
  <style scoped>
    .content-box{
        border: solid black 2px;
    }

    .cursor-over{
        cursor: pointer;
    }

    .category-col{
        width:15%
    }

    .category-card{
        width: 15%;
    }
  </style>
  