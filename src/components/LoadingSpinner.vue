<template>
  <q-dialog v-model="internalData" persistent>
    <q-card class="custom-card" style="background-color: transparent">
      <q-card-section class="q-pa-md">
        <q-spinner-clock :size="size" color="primary" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";

const props = defineProps(["loading", "size"]);
const internalData = ref(props.loading);

watch(
  () => props.loading,
  (newVal) => {
    internalData.value = newVal;
  }
);
</script>

<style scoped>
.custom-card {
  box-shadow: none !important;
}
</style>
