<template>
  <q-page class="q-pa-xl flex-center column" v-if="!iconData.category">
    <div class="textHeader q-pb-xl">choose your concept !</div>
    <div class="row items-center">
      <q-btn
        class="arrow-btn q-mr-xl"
        icon="arrow_circle_left"
        color="primary"
        size="30px"
        flat
        dense
        round
        @click="carouselLeftLogic"
      />
      <transition appear class="animated fadeIn slower">
        <div class="cardList row justify-between">
          <WallpaperListCard
            v-for="(wallpapper, index) in refWallpapperList"
            :key="index"
            :class="{
              disabled: index !== 1,
              animated: data.animated,
              flipInY: data.animated,
            }"
            v-bind="{ ...wallpapper, index }"
            :style="{ animationDelay: `${index * 100}ms` }"
            @setCategory="handleCategory"
          />
        </div>
      </transition>
      <q-btn
        class="arrow-btn q-ml-xl"
        icon="arrow_circle_right"
        color="primary"
        size="30px"
        flat
        dense
        round
        @click="carouselRightLogic"
      />
    </div>
  </q-page>
  <transition appear class="animated fadeIn slower">
    <q-page
      class="create q-pa-xl flex-center row no-wrap"
      v-show="iconData.category"
      :style="{ display: iconData.category ? 'block' : 'none' }"
    >
      <WallpaperCard v-bind="{ data }" />

      <div class="listSqaure q-ml-xl">
        <SelectedIcon v-bind="{ data }" />
        <ListIcon v-bind="{ iconData }" />
        <div class="btns row justify-between no-wrap">
          <q-btn
            icon="img:/src/assets/back.png"
            size="25px"
            padding="none"
            @click="initIconData"
          ></q-btn>
          <q-btn
            class="dduckBtn"
            outline
            text-color="primary"
            label="RANDOM"
            @click="createRandomWallpapper"
          />
          <q-btn
            class="dduckBtn"
            outline
            text-color="primary"
            label="CREATE"
            @click="downloadImage"
          />
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script setup>
import WallpaperListCard from "src/components/WallpaperListCard.vue";
import WallpaperCard from "src/components/WallpapperCard.vue";
import ListIcon from "src/components/ListIcon.vue";
import SelectedIcon from "src/components/SelectedIcon.vue";
import s3Client from "@api/callS3";
import html2canvas from "html2canvas";

import { ref } from "vue";

const data = ref({
  animated: false,
  selectedIcons: [],
});
const iconData = ref({
  category: "",
  icons: [],
});

const emit = defineEmits(["setCategoryRouterView"]);

const animateElement = () => {
  data.value.animated = true;

  // Reset the animation after a certain duration
  setTimeout(() => {
    data.value.animated = false;
  }, 1000); // Adjust the duration as needed
};

const wallpapperList = [
  { category: "face", value: "/src/assets/loading.png", number: 0 },
  { category: "man", value: "/src/assets/wall_back.png", number: 1 },
  { category: "icons-1", value: "/src/assets/wall_back.png", number: 2 },
  { category: "wpp4", value: "/src/assets/loading.png", number: 3 },
];

const dataWallpaperList = () => {
  const data = [...wallpapperList];
  data.splice(3);
  return data;
};

const refWallpapperList = ref(dataWallpaperList());

const carouselRightLogic = () => {
  if (data.value.animated === true) return;
  const refLastValueNumber = refWallpapperList.value[2].number;
  if (wallpapperList[refLastValueNumber + 1]) {
    refWallpapperList.value.push(wallpapperList[refLastValueNumber + 1]);
    refWallpapperList.value.splice(0, 1);
  } else {
    refWallpapperList.value.splice(0, 1);
    refWallpapperList.value.push(wallpapperList[0]);
  }
  animateElement();
};

const carouselLeftLogic = () => {
  if (data.value.animated === true) return;
  const refFirstValueNumber = refWallpapperList.value[0].number;
  if (refFirstValueNumber === 0) {
    refWallpapperList.value.unshift(wallpapperList[wallpapperList.length - 1]);
    refWallpapperList.value.splice(3);
  } else {
    refWallpapperList.value.unshift(wallpapperList[refFirstValueNumber - 1]);
    refWallpapperList.value.splice(3);
  }
  animateElement();
};

const handleCategory = async (emitValue) => {
  iconData.value.category = emitValue;
  await showListA(emitValue);
};

const showListA = async (category) => {
  const icons = await s3Client.getListOfBucket(category);

  for (let i = 1; i < icons.length; i++) {
    iconData.value.icons.push(
      `https://dduckddack-test.s3.ap-northeast-2.amazonaws.com/${icons[i].Key}`
    );
  }
  iconData.value.selected = true;
};

const initIconData = () => {
  iconData.value.category = "";
  iconData.value.icons = [];
  data.value.selectedIcons = [];
};

const createRandomWallpapper = () => {
  const randomNumbers = [];
  const tempArray = [];
  // Generate 3 random numbers
  while (randomNumbers.length < 3) {
    const randomIndex =
      Math.floor(Math.random() * (iconData.value.icons.length - 1)) + 1;

    // Check if the random number is already in the array
    if (!randomNumbers.includes(randomIndex)) {
      randomNumbers.push(randomIndex);
      tempArray.push(iconData.value.icons[randomIndex]);
    }
    data.value.selectedIcons = tempArray;
  }
  animateElement();
};

const getBase64FromUrl = async (url) => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = `${url}?__v=${Date.now()}`;
  return new Promise((resolve) => {
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const base64String = canvas.toDataURL("image/png");
      resolve(base64String);
    };
  });
};

const downloadImage = async () => {
  const html = document.querySelector(".square");
  const container = document.createElement("div");

  // Copy the attributes and styles from html to container
  const computedStyles = getComputedStyle(html);
  for (const prop of computedStyles) {
    container.style[prop] = computedStyles[prop];
  }
  container.style.position = "fixed";
  container.style.top = "-9999px";
  container.style.left = "-9999px";
  container.innerHTML = html.innerHTML;
  container.className = html.className;
  container.id = html.id;
  container.style.height = "844px";
  container.style.borderRadius = 0;
  container.style.borderStyle = "none";
  document.body.appendChild(container);

  const canvas = await html2canvas(container, {
    onclone: async (_, html) => {
      const images = html.querySelectorAll("img");
      for await (const img of images) {
        if (img.src.includes("data:image")) continue;
        img.src = await getBase64FromUrl(img.src);
      }
    },
  });

  const base64 = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = base64;
  link.download = "square.png";
  link.click();
};
</script>

<style lang="scss" scoped>
.textHeader {
  color: $primary;
  font-weight: 400;
  font-size: 36px;
  line-height: 60px;
}
.cardList {
  width: 800px;
}
.arrow-btn {
  width: 30px;
  height: 30px;
}

.create {
  margin-left: 8%;
  margin-right: 8%;
}

.listSqaure {
  width: 480px;
}

.dduckBtn {
  width: 210px;
  height: 60px;
  font-size: 24px;
  border: 3px solid #59ffe6;
  border-radius: 40px;
}
.btns {
  padding-top: 44px;
}

.modify-bg {
  border-style: none;
  border-radius: 0;
  height: 844px;
}
</style>
