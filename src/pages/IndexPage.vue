<template>
  <q-page
    class="q-pa-xl flex flex-center column no-wrap"
    style="padding-top: 153px"
    ><div class="responsive-container">
      <img src="dddd-back.png" class="responsive-img" />
    </div>
    <p class="main-text-1">DDUCKDDACK</p>
    <p class="main-text-2 text-white">PHONE WALLPAPER</p>

    <div class="flex-center flex" style="margin-top: 300px">
      <div
        class="row items-center"
        style="white-space: nowrap; display: inline-block"
      >
        <img
          src="dddd.png"
          style="
            width: 66px;
            height: 71px px;
            position: relative;
            top: -8px;
            margin-right: 11px;
            vertical-align: middle;
          "
        />
        <p class="about">ABOUT</p>
      </div>
    </div>
    <div class="aboutContent text-center">
      <br />
      TEST VERSION ON MUMBAI
    </div>
  </q-page>
</template>

<script setup></script>

<style lang="scss" scoped>
.responsive-container {
  max-width: 906px;
  width: 100%;
  margin: 0 auto;
}
.responsive-text-container {
  max-width: 906px;
  width: 100%;
  margin: 0 auto;
}
@media screen and (max-width: 906px) {
  .responsive-container {
    max-width: 100%;
  }
}
.responsive-img {
  width: 100%;
  height: auto;
}
.main-text-1 {
  font-family: "Impact";
  font-style: normal;
  font-weight: 400;
  font-size: 10vw;
  margin-bottom: 0px;
  color: $primary;
}
.main-text-2 {
  font-size: 6.3vw;
  line-height: 0px;
  white-space: nowrap;
}

.about {
  font-family: "Impact";
  font-style: normal;
  font-weight: 400;
  font-size: 80px;
  line-height: 98px;
  color: $primary;
  display: inline-block;
  vertical-align: middle;
}
.aboutContent {
  font-family: "Courier New", Courier, monospace;
  font-weight: 400;
  font-size: 24px;
  line-height: 31px;
  color: white;
  display: inline;
}
</style>
