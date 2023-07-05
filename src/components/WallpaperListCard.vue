<template>
  <transition class="slower">
    <div class="wallpaperCard flex items-end justify-center">
      <div class="text-h3 text-white text-center">
        {{ value }}
      </div>
      <q-btn
        :outline="index !== 1"
        :color="index !== 1 ? 'black' : 'primary'"
        label="create"
        class="createBtn"
        padding="none"
        size="28px"
        to="/create"
        :disable="index !== 1"
        @click="emitCatagory(category)"
      />
    </div>
  </transition>
</template>

<script setup>
defineProps({
  category: String,
  value: String,
  number: Number,
  index: Number,
});
const emit = defineEmits(["setCategory"]);

const emitCatagory = (value) => {
  emit("setCategory", value);
};
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
}
.createBtn {
  width: 138.4px;
  height: 30.4px;
  line-height: 1rem;
  margin-bottom: 17.6px;
  border: 2px solid;
  border-radius: 60px;
}

::v-deep .q-btn__content {
  padding-bottom: 8px;
}
</style>
