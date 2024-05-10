<template>
  <div id="app">
    <router-view></router-view>
  </div>
  <audio id="bgm" autoplay loop>
      <source src="./assets/bgm.mp3" type="audio/mp3">
      Your browser does not support the audio element.
  </audio>
</template>
  
<script setup>
  import { RouterView } from 'vue-router'
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
