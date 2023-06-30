<template>
  <div class="createSquare q-mr-xl">
    <div class="square" v-if="shouldRenderImages">
      <img
        v-for="index in 6"
        :key="index"
        :src="getImageSource()[0]"
        :id="data.pattern + `${index}`"
      />
      <img
        v-for="index in 6"
        :key="index"
        :src="getImageSource()[1]"
        :id="data.pattern + `${index + 6}`"
      />
      <img
        v-for="index in 3"
        :key="index"
        :src="getImageSource()[2]"
        :id="data.pattern + `${index + 12}`"
      />
    </div>
    <div class="square" v-else></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
const data = ref({
  pattern: "",
});
const props = defineProps({
  data: Object,
});
const shouldRenderImages = ref(false);

watch(
  () => props.data.selectedIcons,
  (newSelectedIcons) => {
    if (newSelectedIcons && newSelectedIcons.length > 0) {
      shouldRenderImages.value = true;
      getPatternSource();
      nextTick(randomBg);
    } else shouldRenderImages.value = false;
  }
);

function getImageSource() {
  return props.data.selectedIcons;
}

function getPatternSource() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  data.value.pattern = `pattern${randomNumber}-`;
}

function randomBg() {
  const bg = [
    "linear-gradient(180deg, #FBFF2D 0%, #00FFFF 100%)",
    "linear-gradient(180deg, #FEFFDC 0%, #FF008A 100%)",
    "linear-gradient(180deg, #8F00FF 0%, #00FFFF 100%)",
    "linear-gradient(0deg, #000A3E, #000A3E)",
    "black",
  ];
  const randomNumber = Math.floor(Math.random() * 5);
  const el = document.querySelector(".square");
  console.log(el);
  el.style.background = bg[randomNumber];
}
</script>

<style lang="scss" scoped>
.square {
  border: 3px solid $primary;
  height: 675px;
  width: 392px;
  background: yellow;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

img {
  position: absolute;
}

#pattern1-3 {
  top: -70px;
  left: 39px;
  width: 120px;
  height: 120px;
}
#pattern1-1 {
  top: 141px;
  left: 84px;
  width: 120px;
  height: 120px;
  transform: rotate(90deg);
}
#pattern1-2 {
  top: 385px;
  left: 224px;
  width: 120px;
  height: 120px;
}
#pattern1-4 {
  top: 600px;
  left: -44px;
  width: 120px;
  height: 120px;
}
#pattern1-5 {
  top: 600px;
  left: 345px;
  width: 120px;
  height: 120px;
}
#pattern1-6 {
  top: 771px;
  left: 39px;
  width: 120px;
  height: 120px;
}
#pattern1-7 {
  top: 71px;
  left: -63px;
  width: 101px;
  height: 101px;
  transform: rotate(9.74deg);
}
#pattern1-8 {
  top: 71px;
  left: 326px;
  width: 101px;
  height: 101px;
  transform: rotate(9.74deg);
}
#pattern1-9 {
  top: 235px;
  left: 228px;
  width: 101px;
  height: 101px;
  transform: rotate(9.74deg);
}
#pattern1-10 {
  top: 417px;
  left: -36px;
  width: 150px;
  height: 150px;
  transform: rotate(-25.65deg);
}
#pattern1-11 {
  top: 417px;
  left: 354px;
  width: 150px;
  height: 150px;
  transform: rotate(-25.65deg);
}
#pattern1-12 {
  top: 699px;
  left: 224px;
  width: 120px;
  height: 120px;
}
#pattern1-13 {
  top: 9px;
  left: 188px;
  width: 100px;
  height: 100px;
  transform: rotate(-16.5deg);
}
#pattern1-14 {
  top: 282px;
  left: 30px;
  width: 91px;
  height: 91px;
  transform: rotate(21.6deg);
}
#pattern1-15 {
  top: 558px;
  left: 129px;
  width: 120px;
  height: 120px;
  transform: rotate(-17.14deg);
}
</style>
