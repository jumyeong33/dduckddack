<template>
  <div class="listIcon" v-if="!$q.screen.lt.sm">
    <q-scroll-area style="height: 100%" :thumb-style="thumbStyle">
      <div
        class="icons row justify-start q-col-gutter-sm"
        style="margin-left: 1rem; margin-top: 1rem"
      >
        <q-intersection
          v-for="(icon, index) in iconData.icons"
          :key="index"
          transition="scale"
          once
        >
          <img :src="icon" style="width: 96px; height: 96px" />
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
  background-color: black;
}
</style>
