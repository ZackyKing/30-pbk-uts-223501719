<template>
    <div class="album-open-container">
      <q-page class="q-pa-md">
        <q-btn flat label="Back" @click="goBack" icon="arrow_back" class="back-button" />
        <h1>Album Details</h1>
        <div v-if="album">
          <q-card flat bordered class="album-details card-color">
            <q-card-section>
              <div class="row no-wrap items-center">
                <q-avatar>
                  <img :src="`https://i.pravatar.cc/150?img=${album.id}`" />
                </q-avatar>
                <div class="q-pl-md">
                  <q-item-label class="text-h6">{{ album.title }}</q-item-label>
                  <q-item-label caption>Album ID: {{ album.id }}</q-item-label>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="photo-grid">
          <div v-for="photo in photos" :key="photo.id" class="photo-item card-color" @click="openImage(photo)">
            <img :src="photo.thumbnailUrl" :alt="photo.title" />
            <div class="photo-title">{{ photo.title }}</div>
          </div>
        </div>
      </q-page>
  
      <q-dialog v-model="showDialog" persistent>
        <q-card class="q-pa-md">
          <q-img :src="selectedImageUrl" :alt="selectedImageTitle" />
          <q-card-section>
            <div class="text-h6">{{ selectedImageTitle }}</div>
          </q-card-section>
          <q-space />
          <q-btn flat label="Close" @click="showDialog = false" />
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  
  const album = ref(null)
  const photos = ref([])
  const route = useRoute()
  const router = useRouter()
  const showDialog = ref(false)
  const selectedImageUrl = ref('')
  const selectedImageTitle = ref('')
  
  const fetchAlbumDetails = async () => {
    try {
      const albumId = route.params.id
      const albumResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
      album.value = albumResponse.data
  
      const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      photos.value = photosResponse.data
    } catch (error) {
      console.error('Error fetching album details:', error)
    }
  }
  
  const openImage = (photo) => {
    selectedImageUrl.value = photo.url
    selectedImageTitle.value = photo.title
    showDialog.value = true
  }
  
  const goBack = () => {
    router.back()
  }
  
  onMounted(fetchAlbumDetails)
  </script>
  
  <style scoped>
  .album-open-container {
    width: 100%;
    max-width: 900px;
    margin: 55px auto 300px;
    background: rgba(5, 12, 156, 0.5); /* Adjust the background as needed */
    border-radius: 10px;
    padding: 20px;
  }
  
  .q-page {
    background: transparent;
  }
  
  h1 {
    font-family: 'Arial Black';
    color: #A7E6FF;
    font-size: 50px;
    font-weight: 100px;
    text-align: center;
  }
  
  .album-details {
    margin-bottom: 20px;
  }
  
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
  
  .photo-item {
    background: white;
    border-radius: 5px;
    overflow: hidden;
    text-align: center;
    padding: 10px;
    cursor: pointer;
  }
  
  .photo-item img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .photo-title {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  
  .q-avatar {
    width: 50px;
    height: 50px;
  }
  
  .q-item-label.caption {
    color: grey;
  }
  
  .card-color {
    background-color: #3572EF;
    border: 1px solid #3ABEF9;
  }
  
  .back-button {
    background-color: #3ABEF9;
    color: #050C9C;
    margin-bottom: 20px;
  }
  </style>
  