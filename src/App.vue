<template>
  <div id="app">
    <router-view></router-view>
  </div>
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
