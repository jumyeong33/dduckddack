<template>
  <div :class="$q.screen.gt.sm ? 'createSquare q-mr-xl' : 'createSquare'">
    <q-intersection
      class="square"
      v-if="shouldRenderImages"
      transition="fade"
      transition-duration="1000"
    >
      <img
        v-for="index in data.length[data.pattern][0]"
        :key="index"
        :src="getImageSource()[0]"
        :id="'pattern' + data.pattern + -`${index}`"
      />
      <img
        v-for="index in data.length[data.pattern][1]"
        :key="index"
        :src="getImageSource()[1]"
        :id="
          'pattern' + data.pattern + -`${index + data.length[data.pattern][0]}`
        "
      />
      <img
        v-for="index in data.length[data.pattern][2]"
        :key="index"
        :src="getImageSource()[2]"
        :id="
          'pattern' +
          data.pattern +
          -`${
            index + data.length[data.pattern][0] + data.length[data.pattern][1]
          }`
        "
      />
    </q-intersection>
    <q-intersection
      class="square"
      v-else
      transition="fade"
      transition-duration="1000"
    ></q-intersection>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const data = ref({
  pattern: "",
  backgroundNum: "",
  length: {
    1: [6, 6, 3],
    2: [6, 7, 8],
    3: [8, 11, 4],
  },
});
const props = defineProps({
  data: Object,
});
const emit = defineEmits(["setMetadata"]);
const emitMetadata = (value) => {
  emit("setMetadata", value);
};
const shouldRenderImages = ref(false);

watch(
  () => props.data.selectedIcons,
  (newSelectedIcons) => {
    if (newSelectedIcons && newSelectedIcons.length > 0) {
      shouldRenderImages.value = true;
      getPatternSource();
      nextTick(randomBg);
      emitMetadata(data.value);
    } else shouldRenderImages.value = false;
  }
);

function getImageSource() {
  return props.data.selectedIcons;
}

function getPatternSource() {
  data.value.pattern = Math.floor(Math.random() * 3) + 1;
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
  data.value.backgroundNum = randomNumber;
  const el = document.querySelector(".square");
  el.style.background = bg[randomNumber];
}
</script>

<style lang="scss" scoped>
.square {
  border: 3px solid $primary;
  background: black;
  height: 675px;
  width: 392px;
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
  transform: rotate(15deg);
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

#pattern2-1 {
  top: -119px;
  left: 32px;
  width: 153px;
  height: 151px;
}
#pattern2-2 {
  top: -73px;
  left: 250px;
  width: 115px;
  height: 114px;
  transform: rotate(20.74deg);
}
#pattern2-3 {
  top: 177px;
  left: 20px;
  width: 145px;
  height: 143px;
  transform: rotate(-15deg);
}
#pattern2-4 {
  top: 430px;
  left: 197px;
  width: 115px;
  height: 114px;
  transform: rotate(16.6deg);
}
#pattern2-5 {
  top: 722px;
  left: 32px;
  width: 153px;
  height: 151px;
}
#pattern2-6 {
  top: 767px;
  left: 250px;
  width: 115px;
  height: 114px;
  transform: rotate(20.74deg);
}

#pattern2-7 {
  top: 72px;
  left: -88px;
  width: 114px;
  height: 114px;
  transform: rotate(23.37deg);
}
#pattern2-8 {
  top: 72px;
  left: 301px;
  width: 114px;
  height: 114px;
  transform: rotate(23.37deg);
}
#pattern2-9 {
  top: 385px;
  left: -56px;
  width: 115px;
  height: 115px;
}
#pattern2-10 {
  top: 385px;
  left: 333px;
  width: 115px;
  height: 115px;
}
#pattern2-11 {
  top: 712px;
  left: -53px;
  width: 86px;
  height: 86px;
}
#pattern2-12 {
  top: 712px;
  left: 339px;
  width: 86px;
  height: 86px;
}
#pattern2-13 {
  top: 610px;
  left: 50px;
  width: 86px;
  height: 86px;
  transform: rotate(-11.67deg);
}
#pattern2-14 {
  top: 61px;
  left: 115px;
  width: 86px;
  height: 86px;
  transform: rotate(5.15deg);
}
#pattern2-15 {
  top: 154px;
  left: 219px;
  width: 55px;
  height: 55px;
  transform: rotate(5.15deg);
}
#pattern2-16 {
  top: 246px;
  left: 228px;
  width: 126px;
  height: 126px;
  transform: rotate(5.15deg);
}
#pattern2-17 {
  top: 472px;
  left: 69px;
  width: 95px;
  height: 95px;
  transform: rotate(-33.78deg);
}
#pattern2-18 {
  top: 368px;
  left: 137px;
  width: 53px;
  height: 53px;
  transform: rotate(-33.78deg);
}
#pattern2-19 {
  top: 556px;
  left: -29px;
  width: 58px;
  height: 58px;
}
#pattern2-20 {
  top: 556px;
  left: 360px;
  width: 58px;
  height: 58px;
}
#pattern2-21 {
  top: 618px;
  left: 177px;
  width: 124px;
  height: 124px;
  transform: rotate(-16.4deg);
}

#pattern3-1 {
  top: -54px;
  left: -72px;
  width: 111.5px;
  height: 111.5px;
  transform: rotate(-15deg);
}
#pattern3-2 {
  top: -54px;
  left: 316px;
  width: 111.5px;
  height: 111.5px;
  transform: rotate(-15deg);
}
#pattern3-3 {
  top: 38px;
  left: 37px;
  width: 83px;
  height: 83px;
  transform: rotate(25.18deg);
}
#pattern3-4 {
  top: 230px;
  left: 229px;
  width: 114px;
  height: 114px;
}
#pattern3-5 {
  top: 344px;
  left: 9px;
  width: 128.7px;
  height: 128.7px;
  transform: rotate(-15deg);
}
#pattern3-6 {
  top: 620px;
  left: 89px;
  width: 152px;
  height: 152px;
}
#pattern3-7 {
  top: 787px;
  left: -72px;
  width: 111.5px;
  height: 111.5px;
}
#pattern3-8 {
  top: 787px;
  left: 316px;
  width: 111.5px;
  height: 111.5px;
}

#pattern3-9 {
  top: -66px;
  left: 110px;
  width: 108.75px;
  height: 109.75px;
  transform: rotate(-15deg);
}
#pattern3-10 {
  top: 46px;
  left: 196px;
  width: 92px;
  height: 93px;
  transform: rotate(15deg);
}
#pattern3-11 {
  top: 168px;
  left: -39px;
  width: 85px;
  height: 85px;
  transform: rotate(15deg);
}
#pattern3-12 {
  top: 168px;
  left: 350px;
  width: 85px;
  height: 85px;
  transform: rotate(15deg);
}
#pattern3-13 {
  top: 258px;
  left: 80px;
  width: 80px;
  height: 80px;
  transform: rotate(-16.65deg);
}
#pattern3-14 {
  top: 482px;
  left: 292px;
  width: 52px;
  height: 53px;
  transform: rotate(22.16deg);
}
#pattern3-15 {
  top: 512px;
  left: 161px;
  width: 95.5px;
  height: 96.5px;
  transform: rotate(-18.06deg);
}

#pattern3-16 {
  top: 655px;
  left: 271px;
  width: 80px;
  height: 80px;
  transform: rotate(8.34deg);
}
#pattern3-17 {
  top: 711px;
  left: -35px;
  width: 76px;
  height: 76px;
  transform: rotate(-21.65deg);
}
#pattern3-18 {
  top: 711px;
  left: 354px;
  width: 76px;
  height: 76px;
  transform: rotate(-21.65deg);
}

#pattern3-19 {
  top: 775px;
  left: 110px;
  width: 108.75px;
  height: 109.75px;
  transform: rotate(-15deg);
}
#pattern3-20 {
  top: 130px;
  left: 110px;
  width: 94px;
  height: 94px;
  transform: rotate(-10.26deg);
}

#pattern3-21 {
  top: 359px;
  left: 222px;
  width: 74px;
  height: 74px;
  transform: rotate(15deg);
}
#pattern3-22 {
  top: 527.5px;
  left: -39px;
  width: 114px;
  height: 114px;
  transform: rotate(15deg);
}

#pattern3-23 {
  top: 527.5px;
  left: 350px;
  width: 114px;
  height: 114px;
  transform: rotate(15deg);
}
</style>
