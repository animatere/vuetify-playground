<template>
  <h1>{{ title }}</h1>

  <div v-if="selectedItem.quantity > 5" style="color: red; font-size: larger">
    On Sale!
  </div>
  <div
    v-else-if="selectedItem.quantity === 0"
    style="color: red; font-size: larger"
  >
    Out of stock!
  </div>
  <div v-else><br /></div>

  <div class="mood-btns">
    <h1>Select one Mood</h1>
    <v-btn variant="outlined" @click="red">Angry</v-btn>
    <v-btn variant="flat" @click="green">Chill</v-btn><br />
    <v-btn variant="elevated" @click="blue">Sleepy</v-btn>
    <v-btn variant="tonal" @click="orange">Friends</v-btn><br />
    <v-btn variant="text" @click="grey">Cute</v-btn>
    <v-btn variant="plain" @click="yellow">Fighting</v-btn><br />
  </div>

  <div class="currentCat">
    <img
      :style="{
        border: 'solid ' + selectedItem.color + ' 5px',
        borderRadius: '25px',
        width: '500px',
        height: '450px',
      }"
      :src="selectedItem.image"
      alt=""
    /><br />
  </div>
  <div class="picNavigator">
    <v-btn @click="last" :disabled="picCount === 0">Last</v-btn>
    <v-btn @click="next" :disabled="item.variants.length === picCount + 1"
      >Next</v-btn
    ><br />
  </div>
  <h1>Color Select</h1>
  <div class="colorSelect">
    <div
      v-for="variant in item.variants"
      :key="variant.id"
      @click="changeOnClick(variant.id)"
      class="color-circle"
      :style="{ backgroundColor: variant.color }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Item } from "@/interfaces/interfaces";
import Counter from "@/components/training/Counter.vue";

export default defineComponent({
  components: { Counter },
  setup() {
    let picCount = ref(0);
    const item: Item = {
      cart: 0,
      product: "Cats",
      brand: "AWF Productions",
      inStock: false,
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "red",
          quantity: 10,
          image:
            "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b556605-fca4-404b-b055-ba30a12a010f/width=450/Image_00001_.jpeg",
        },
        {
          id: 2235,
          color: "green",
          quantity: 0,
          image:
            "https://i.pinimg.com/736x/c3/3a/04/c33a0430849fc27a8b8aa177b3803d30.jpg",
        },
        {
          id: 2236,
          color: "blue",
          quantity: 4,
          image:
            "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
        },
        {
          id: 2237,
          color: "orange",
          quantity: 9,
          image:
            "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
        },
        {
          id: 2238,
          color: "grey",
          quantity: 15,
          image:
            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
          id: 2239,
          color: "yellow",
          quantity: 0,
          image:
            "data:image/jpeg;base64,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",
        },
      ],
    };
    let selectedItem = ref(item.variants[0]);
    const red = () => {
      selectedItem.value = item.variants[0];
      picCount.value = 0;
    };
    const green = () => {
      selectedItem.value = item.variants[1];
      picCount.value = 1;
    };
    const blue = () => {
      selectedItem.value = item.variants[2];
      picCount.value = 2;
    };
    const orange = () => {
      selectedItem.value = item.variants[3];
      picCount.value = 3;
    };
    const grey = () => {
      selectedItem.value = item.variants[4];
      picCount.value = 4;
    };
    const yellow = () => {
      selectedItem.value = item.variants[5];
      picCount.value = 5;
    };

    const next = () => {
      if (picCount.value < item.variants.length - 1) {
        picCount.value += 1;
        selectedItem.value = item.variants[picCount.value];
      }
    };
    const last = () => {
      if (picCount.value > 0) {
        picCount.value -= 1;
        selectedItem.value = item.variants[picCount.value];
      }
    };

    const changeOnClick = (id: number) => {
      const variant = item.variants.find((v) => v.id === id);
      console.log(id);

      if (variant) {
        selectedItem.value = variant;
        picCount.value = item.variants.findIndex((cat) => cat.id === id);
      }
    };

    const title = computed(() => {
      return `${item.product} - ${selectedItem.value.color} Variant`;
    });

    return {
      picCount,
      green,
      red,
      blue,
      orange,
      grey,
      yellow,
      item,
      selectedItem,
      title,
      changeOnClick,
      last,
      next,
    };
  },
});
</script>

<style scoped>
v-btn {
  font-size: 1.5rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 150px;
}

.color-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
}
h1 {
  font-size: 2rem;
  text-align: center;
}

.colorSelect {
  margin-bottom: 15px;
}

.v-btn {
  width: 120px;
  margin-right: 15px;
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .currentCat img {
    width: 320px !important;
    height: 350px !important;
  }
}
</style>
