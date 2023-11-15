<template>
  <div
    v-if="data.selectedIcons.length > 0"
    class="selectedIconBox row justify-between no-wrap"
  >
    <q-intersection
      class="selectedIcon flex flex-center"
      v-for="(icon, index) in data.selectedIcons"
      :key="index"
      transition="rotate"
      transition-duration="300"
    >
      <img :src="icon" style="width: 92px; height: 92px" />
    </q-intersection>
  </div>
  <div v-else class="selectedIconBox row justify-between no-wrap">
    <div class="selectedIcon" v-for="n in 3" :key="n" />
  </div>
</template>

<script setup>
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped>
.selectedIconBox {
  height: 134px;
  border-radius: 20px;
}

.selectedIcon {
  width: 134px;
  height: 134px;
  border: 3px solid $primary;
  border-radius: 20px;
  background-color: black;
}
</style>
