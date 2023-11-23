<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="internalConfirmData" persistent>
      <q-card style="background-color: black">
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm" :style="{ color: 'white', fontSize: 'large' }"
            >ARE YOU SURE TO MINT THE WALLPAPPER?.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="initPopupState"
          />
          <q-btn flat label="Confirm" color="primary" @click="mintNFT" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps(["isOpen"]);
const internalConfirmData = ref(props.isOpen);

watch(
  () => props.isOpen,
  (newVal) => {
    internalConfirmData.value = newVal;
  }
);

const emit = defineEmits(["confirmed", "cancelMint"]);

function mintNFT() {
  emit("confirmed");
}

function initPopupState() {
  emit("cancelMint");
}
</script>
