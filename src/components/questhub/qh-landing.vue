<template>
    <v-container>

        <v-row style="margin-bottom: 25px;">
            <v-btn v-if="category !== ''" color="warning" @click="onChangeCategory('')">
                <v-icon icon="mdi-arrow-left" style="margin-right: 5px"></v-icon>
                Back
            </v-btn>
        </v-row>

        <v-row v-if="category === ''">
            <col class="category-col" cols="3">
                <v-btn class="category-card"color="accent" @click="onChangeCategory(QuestCategory.FUN)">
                    <v-icon icon="mdi-party-popper" style="margin-right: 5px"></v-icon>
                    Fun
                </v-btn>
            </col>
            <col class="category-col" cols="3">
                <v-btn class="category-card"color="success" @click="onChangeCategory(QuestCategory.ACTION)">
                    <v-icon icon="mdi-run" style="margin-right: 5px"></v-icon>
                    Action
                </v-btn>
            </col>
            <col class="category-col" cols="3">
                <v-btn class="category-card" color="info" @click="onChangeCategory(QuestCategory.BRAIN)">
                    <v-icon icon="mdi-brain" style="margin-right: 5px"></v-icon>
                    Brain
                </v-btn>
            </col>
        </v-row>

        <v-row v-if="category === QuestCategory.FUN">
            <qh-questcard :category="category" />
        </v-row>

        <v-row v-if="category === QuestCategory.ACTION">
            <qh-questcard :category="category" />
        </v-row>

        <v-row v-if="category === QuestCategory.BRAIN">
            <qh-questcard :category="category" />
        </v-row>

    </v-container>

    

  </template>
  
  <script setup lang="ts">
import { QuestCategory } from '@/Enums/enums';

    const category = ref<QuestCategory | "">(""); 

    onMounted(async () => {
        console.log(category)
    });

    function onChangeCategory(newCategory: QuestCategory | ""){

        if(newCategory === "")
            category.value = ""

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
  