<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="internalConfirmData" persistent>
      <q-card class="confirm-card">
        <q-card-section class="items-center">
          <div class="flex justify-center" style="padding: 7%">
            <q-icon name="img:src/assets/dddd2.png" size="50px" />
          </div>
          <span
            class="q-ml-sm"
            :style="{
              color: 'white',
              fontSize: 'large',
              fontFamily: 'monospace',
            }"
            >ARE YOU SURE TO MINT THE WALLPAPPER?</span
          >
          <br />
          <span
            class="q-ml-sm"
            :style="{
              color: 'white',
              fontSize: 'small',
              fontFamily: 'monospace',
            }"
          >
            Wallet Address:
            <span style="font-weight: bold">
              {{ props.confirmData.currentAddress }}
            </span>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="initPopupState"
          />
          <q-btn flat label="Confirm" color="yellow" @click="mintNFT" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["confirmData"]);
const internalConfirmData = ref(props.confirmData.show);

watch(
  () => props.confirmData.show,
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

<style lang="scss" scoped>
.confirm-card {
  background-color: black;
  border: 3px solid $primary;
}
</style>
