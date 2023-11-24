<template>
  <q-dialog v-model="internalData" persistent>
    <q-card class="custom-card" style="background-color: transparent">
      <q-card-section class="q-pa-md">
        <div class="flex justify-center" style="padding-bottom: 4%">
          <q-spinner-clock size="3em" color="primary" />
        </div>
        <div>
          <span
            v-if="props.loadingData.message"
            class="q-ml-sm"
            :style="{
              color: '#59ffe6',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              fontSize: '1.5em',
            }"
          >
            Do not Refresh the website..</span
          >
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";

const props = defineProps(["loadingData"]);
const internalData = ref(props.loadingData.show);

watch(
  () => props.loadingData.show,
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
