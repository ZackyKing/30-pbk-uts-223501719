import { createRouter, createWebHistory } from 'vue-router';
import mainlayout from '../Layouts/mainlayout.vue';
import Home from '../Views/Home.vue';
import Post from '../Views/Post.vue';
import Album from "../Views/Album.vue";
import AlbumOpen from '../Views/AlbumOpen.vue';
const routes = [
  {
    path: '/',
    component: mainlayout,
    name: 'mainlayout',
    children: [
        {
          path: '/',
          component: Home,
          name: 'Home'
        },
        {
          path: '/post',
          component: Post,
          name: 'Post'
        },
        {
          path: '/album',
          component: Album,
          name: 'Album'
        },
        {
          path: '/album/:id',
          component: AlbumOpen,
          name: 'AlbumOpen'
        },
      ]
      },
    ]
;

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
