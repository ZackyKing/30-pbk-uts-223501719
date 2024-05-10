import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Views/Home.vue';
import Post from '../Views/Post.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Post',
      name: 'Post',
      component: Post
    }
  ]
})

export default router