<template>
    <div class="album-container">
        <q-page class="q-pa-md">
            <h1>Data Album</h1>
            <q-list class="album-list">
                <q-item v-for="album in albums" :key="album.id" clickable @click="viewAlbum(album.id)">
                    <q-card class="q-ma-sm album-card card-color" flat bordered>
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
                </q-item>
            </q-list>
        </q-page>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const albums = ref([])
const router = useRouter()

const fetchAlbums = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums')
        albums.value = response.data
    } catch (error) {
        console.error('Error fetching albums:', error)
    }
}

const viewAlbum = (id) => {
    router.push(`/album/${id}`)
}

onMounted(fetchAlbums)
</script>

<style scoped>
.album-container {
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
    font-weight: 100;
    text-align: center;
}

.album-list {
    padding: 20px;
}

.q-avatar {
    width: 50px;
    height: 50px;
}

.q-item-label.text-h6 {
    color: #3572EF;
}

.q-item-label.caption {
    color: grey;
}

.album-card {
    background-color: #3572EF;
    border: 1px solid #3ABEF9;
}

.back-button {
    background-color: #3ABEF9;
    color: #050C9C;
    margin-bottom: 20px;
}
</style>
