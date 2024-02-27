<template>
  <LoadingSpinner :loadingData="data.loadingModalData" />
  <q-page class="q-pa-xl flex-center column" v-if="!iconData.category">
    <div :class="$q.screen.xs ? 'textHeader q-pb-md' : 'textHeader q-pb-xl'">
      choose your concept !
    </div>
    <div
      :class="$q.screen.xs ? 'column items-center' : 'row no-wrap items-center'"
    >
      <q-btn
        :class="$q.screen.xs ? 'arrow-btn' : 'arrow-btn q-mr-xl'"
        icon="arrow_circle_left"
        color="primary"
        size="30px"
        flat
        dense
        round
        @click="carouselLeftLogic"
      />
      <template v-if="$q.screen.gt.xs">
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
      </template>
      <template v-else>
        <transition appear class="animated fadeIn slower">
          <div class="justify-center">
            <WallpaperListCard
              v-if="refWallpapperList.length > 1"
              :key="index"
              :class="{
                animated: data.animated,
                flipInY: data.animated,
              }"
              v-bind="{ ...refWallpapperList[1], index: 1 }"
              :style="{ animationDelay: `${index * 100}ms` }"
              @setCategory="handleCategory"
            />
          </div>
        </transition>
      </template>

      <q-btn
        :class="$q.screen.xs ? 'arrow-btn' : 'arrow-btn q-ml-xl'"
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
      :class="
        $q.screen.gt.sm
          ? 'create q-pa-xl flex-center row no-wrap'
          : 'create q-pa-xl items-center column no-wrap'
      "
      v-show="iconData.category"
      :style="iconData.category ? {} : { display: 'none' }"
    >
      <WallpaperCard v-bind="{ data }" @setMetadata="handleMetadata" />
      <div
        :class="$q.screen.gt.sm ? 'listSquare q-ml-xl' : 'listSquare q-mt-xl'"
      >
        <SelectedIcon v-bind="{ data }" />
        <ListIcon v-bind="{ iconData }" />
        <div
          :class="
            $q.screen.lt.sm
              ? 'btns_height column items-center justify-between'
              : 'btns justify-between row no-wrap'
          "
        >
          <q-btn
            icon="img:/src/assets/back.png"
            size="25px"
            padding="none"
            :disable="buttonDisabled"
            @click="initIconData"
          ></q-btn>
          <q-btn
            class="dduckBtn"
            outline
            text-color="primary"
            label="RANDOM"
            :disable="buttonDisabled"
            @click="createRandomWallpapper"
          />
          <q-btn
            class="dduckBtn"
            outline
            text-color="primary"
            label="CREATE"
            :disable="buttonDisabled"
            @click="openConfirmModal"
          />
          <ConfirmModal
            :confirmData="data.confirmModalData"
            @confirmed="mintNFTHandle"
            @cancelMint="confirmModalHandle"
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
import LoadingSpinner from "src/components/modals/LoadingSpinner.vue";
import ConfirmModal from "src/components/modals/MintConfirm.vue";
import s3Client from "@api/callS3";

import { Buffer } from "buffer";
import { ref } from "vue";
import { generateMetadata, generateUniqueKey } from "src/lib/generator";
import showNotify from "src/utils/notify";
import {
  getAddressFromSessionStorage,
  createWallpapperImage,
} from "src/lib/wallpapperHandler";

const data = ref({
  animated: false,
  selectedIcons: [],
  loadingModalData: {
    show: false,
    message: false,
  },
  confirmModalData: {
    show: false,
    currentAddress: "",
  },
});
const iconData = ref({
  category: "",
  icons: [],
});

const buttonDisabled = ref(false);

const metadata = ref({});
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

const handleMetadata = (emitValue) => {
  metadata.value = emitValue;
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
  metadata.value = {};
};

const createRandomWallpapper = () => {
  data.value.loadingModalData.show = true;
  buttonDisabled.value = true;
  //initialize selectedIcons
  data.value.selectedIcons = [];
  const generateTemp = () => {
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
    }
    data.value.selectedIcons = tempArray;
  };
  setTimeout(generateTemp, 1000);
  setTimeout(() => {
    buttonDisabled.value = false;
    data.value.loadingModalData.show = false;
  }, 1500);
};

const sendNftMetadata = async () => {
  // Create NFT metadata to IPFS using Lambda function
  try {
    data.value.loadingModalData.show = true;
    data.value.loadingModalData.message = true;
    const sender = getAddressFromSessionStorage();
    const base64 = await createWallpapperImage();
    const imageBuffer = Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const uniqueKey = generateUniqueKey(
      data.value.selectedIcons,
      metadata.value.backgroundNum,
      metadata.value.pattern
    );
    const tempMetadata = generateMetadata(
      data.value.selectedIcons,
      metadata.value.backgroundNum,
      metadata.value.pattern,
      uniqueKey
    );
    const dataToSend = {
      image: imageBuffer.toString("base64"),
      data: { metadata: tempMetadata, sender },
    };
    // Send reqeust to AWS lambda function
    const response = await fetch(
      "https://mv19zvsl5i.execute-api.ap-northeast-2.amazonaws.com/default/MyTestFunction",
      {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    if (response.ok) {
      //response success
      const lambdaResponse = await response.json();
      const link = document.createElement("a");
      link.href = base64;
      link.download = uniqueKey + ".png";
      link.click();
      return lambdaResponse;
    } else {
      //response fail
      const result = await response.json();
      throw result.message.includes("taken")
        ? new Error("duplicateUniqueKey")
        : new Error("error");
    }
  } catch (e) {
    showNotify(e.message);
  } finally {
    data.value.loadingModalData.show = false;
    data.value.loadingModalData.message = false;
  }

  // Download Wallppaper image
};

const mintNFTHandle = async () => {
  const result = await sendNftMetadata();
  data.value.confirmModalData.show = false;
  data.value.confirmModalData.currentAddress = "";
  if (result.ok) showNotify("success");
};

const confirmModalHandle = () => {
  data.value.confirmModalData.show = false;
  data.value.confirmModalData.currentAddress = "";
};

const openConfirmModal = async () => {
  try {
    const sender = getAddressFromSessionStorage();
    if (data.value.selectedIcons.length < 1)
      throw new Error("wallpapperNotFound");

    data.value.confirmModalData.show = true;
    data.value.confirmModalData.currentAddress = sender;
  } catch (e) {
    showNotify(e.message);
  }
};
</script>

<style lang="scss" scoped>
.textHeader {
  color: $primary;
  font-weight: 400;
  font-size: 36px;
  line-height: 60px;
  text-align: center;
}
.cardList {
  width: 800px;
}
.arrow-btn {
  width: 30px;
  height: 30px;
}
// .listSquare {
//   width: 480px;
// }
.create {
  margin-left: 8%;
  margin-right: 8%;
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
.btns_height {
  padding-top: 20px;
  height: 200px;
}

.modify-bg {
  border-style: none;
  border-radius: 0;
  height: 844px;
}
</style>
