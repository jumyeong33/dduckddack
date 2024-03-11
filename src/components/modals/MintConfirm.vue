<template>
  <q-dialog v-model="internalConfirmData" persistent>
    <q-card class="confirm-card">
      <q-card-section class="items-center">
        <div class="flex justify-center" style="padding: 7%">
          <img src="dddd2.png" style="width: 50px; height: 50px" />
        </div>
        <q-card-section align="center">
          <span
            :style="{
              color: 'white',
              fontSize: 'large',
            }"
            >ARE YOU SURE <br />YOU WANT TO MINT ?</span
          >

          <div style="margin-top: 1%"></div>
          <span
            class="wallet-address"
            :style="{
              color: 'white',
              fontSize: 'small',
              fontFamily: 'monospace',
            }"
          >
            Wallet Address:
            <br />
            <span style="font-weight: bold">
              {{ props.confirmData.currentAddress }}
            </span>
          </span>
        </q-card-section>
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

.wallet-address {
  white-space: pre-wrap; /* Allow wrapping */
  word-break: break-all; /* Break long words */
}
</style>
