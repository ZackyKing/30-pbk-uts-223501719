<template>
  <div id="app">
    <router-view></router-view>
  </div>
  <audio autoplay loop ref="bgMusic">
    <source src="../assets/bgm.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue';

const bgMusic = ref(null);
const muted = ref(false);

function toggleMute() {
  muted.value = !muted.value;
  bgMusic.value.muted = muted.value;
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>