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
      <div class="aboutContent text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <br />Voluptas, eaadipisci! Quo consequatur ullam deleniti nulla porro
        accusantium?
        <br />
        Excepturi voluptatibus itaque quod. <br />Delectus eveniet illo nulla,
        asperiores commodi repudiandae consequatur? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. <br />Voluptas, eaadipisci! Quo
        consequatur ullam deleniti nulla porro accusantium?
        <br />
        <br />
        Excepturi voluptatibus itaque quod.Delectus eveniet illo nulla,
        asperiores commodi repudiandae consequatur? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. <br />Voluptas, eaadipisci! Quo
        consequatur ullam deleniti nulla porro accusantium?
        <br />
        Excepturi voluptatibus itaque quod. <br />Delectus eveniet illo nulla,
        asperiores commodi repudiandae consequatur? Lorem ipsum dolor sit amet
        consectetur adipisicing elit.Voluptas, eaadipisci! Quo consequatur ullam
        deleniti nulla porro accusantium?
        <br />
        Excepturi voluptatibus itaque quod. <br />Delectus eveniet illo nulla,
        asperiores commodi repudiandae consequatur? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. <br />Voluptas, eaadipisci! Quo
        consequatur ullam deleniti nulla porro accusantium?
        <br />
        <br />
        Excepturi voluptatibus itaque quod. <br />Delectus eveniet illo nulla,
        asperiores commodi repudiandae consequatur?
      </div>
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
  font-family: "Impacted";
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
  font-family: "Impacted";
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
}
</style>
