<template>
  <div class="listIcon">
    <q-scroll-area
      style="height: 100%"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <div
        class="icons row justify-start q-col-gutter-sm"
        style="margin-left: 1rem"
      >
        <q-intersection
          v-for="(icon, index) in iconData.icons"
          :key="index"
          transition="scale"
          once
        >
          <img :src="icon" style="width: 92px; height: 92px" />
        </q-intersection>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
defineProps({
  iconData: Object,
});
const thumbStyle = {
  right: "10px",
  borderRadius: "15px",
  backgroundColor: "#59ffe6",
  width: "9px",
  height: "30px",
  opacity: 0.75,
};
</script>

<style lang="scss" scoped>
.listIcon {
  width: 480px;
  height: 353px;
  margin-top: 18px;
  border: 3px solid $primary;
  border-radius: 20px;
  background-color: azure;
}
</style>
