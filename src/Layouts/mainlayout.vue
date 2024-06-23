<template>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="../assets/Logo2.png">
            </q-avatar>
            UAS PBK
          </q-toolbar-title>
          <div class="clock">{{ currentTime }}</div>
        </q-toolbar>
  
        <q-tabs align="center" class="tabs-color">
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/post" label="Post" />
          <q-route-tab to="/album" label="Album" />
        </q-tabs>
      </q-header>
  
      <q-page-container class="bg-image">
        <router-view />
      </q-page-container>
  
      <q-footer elevated class="footer-color">
        <q-toolbar>
          <q-toolbar-title>
            <div>Copyright © ZackyArgyaTarigan®. All rights reserved.</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
  
      <audio id="bgm" autoplay loop>
        <source src="../assets/bgm.mp3" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
    </q-layout>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: this.getCurrentTime()
      };
    },
    methods: {
      getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString();
      },
      updateClock() {
        this.currentTime = this.getCurrentTime();
      }
    },
    mounted() {
      this.clockInterval = setInterval(this.updateClock, 1000);
    },
    beforeDestroy() {
      clearInterval(this.clockInterval);
    }
  };
  </script>
  
  <style scoped>
  .bg-image {
    background-image: url("../assets/background.jpg");
    background-size: cover;
    background-position: center center;
    background-repeat: repeat-x;
  }
  
  .tabs-color {
    background-color: #3572EF;
  }
  
  .footer-color {
    background-color: #050C9C;
  }
  
  .q-header {
    background-color: #050C9C !important;
  }
  
  .q-toolbar-title, .q-tabs, .q-footer {
    background-color: #3572EF !important;
  }
  
  .clock {
    margin-left: auto;
    margin-right: 20px;
    font-size: 1.2em;
    color: white;
  }
  </style>
  