<template>
  <router-view />
</template>

<script setup>
import { defineComponent } from "vue";
import mainLayOut from "src/layouts/MainLayout.vue";
defineComponent({
  name: "App",
});
</script>
