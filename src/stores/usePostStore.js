import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePostStore = defineStore('postStore', () => {
  const posts = ref([]);
  const isLoading = ref(false);

  const fetchPosts = async (userId) => {
    isLoading.value = true;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const data = await response.json();
      posts.value = data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return { posts, isLoading, fetchPosts };
});
