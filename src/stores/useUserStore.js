import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const users = ref([]);
  const isLoading = ref(false);

  const fetchUsers = async () => {
    isLoading.value = true;
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      users.value = data;
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return { users, isLoading, fetchUsers };
});
