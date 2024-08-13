<script setup>
import FCanvas from './Canvas.vue'
</script>

<template>
  <FCanvas />
  <div class="size-20 bg-blue-500 fixed right-0 bottom-0" />
</template>

<style>
body,html,#app{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
