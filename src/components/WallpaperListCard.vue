<!-- eslint-disable vue/require-toggle-inside-transition -->
<template>
  <transition class="slower">
    <div class="wallpaperCard flex items-end justify-center">
      <img :src="value" style="width: 235px; padding-bottom: 10px" />
      <q-btn
        :outline="data.outline"
        :color="'primary'"
        label="create"
        class="createBtn"
        padding="none"
        size="28px"
        to="/create"
        :text-color="data.textColor"
        :disable="state !== true || index !== 1"
        @click="emitCatagory(category)"
        @mouseover="hoverdIn"
        @mouseleave="hoverOut"
      />
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  category: String,
  value: String,
  number: Number,
  index: Number,
  state: Boolean,
});
const emit = defineEmits(["setCategory"]);
const data = ref({ textColor: "primary", outline: true });
const emitCatagory = (value) => {
  emit("setCategory", value);
};

function hoverdIn() {
  data.value.textColor = "black";
  data.value.outline = false;
}

function hoverOut() {
  data.value.textColor = "primary";
  data.value.outline = true;
}
</script>

<style lang="scss" scoped>
.wallpaperCard {
  width: 222px;
  height: 380px;

  background: linear-gradient(
    180deg,
    rgba(89, 255, 230, 0.21) 21.01%,
    rgba(0, 0, 0, 0) 107.26%
  );
  border: 3px solid #59ffe6;
  border-radius: 24px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.createBtn {
  width: 138.4px;
  height: 30.4px;
  line-height: 1rem;
  margin-bottom: 17.6px;
  border: 2px;
  border-radius: 60px;
}
</style>
