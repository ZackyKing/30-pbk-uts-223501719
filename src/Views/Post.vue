<template>
  <div class="posts-container">
    <div class="posts" id="post">
      <h1>Postingan User</h1>
      <h2>{{ selectedUserName }}</h2>
      <select v-model="selectedUser" class="selectModel" @change="onUserChange">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>

      <div v-if="isLoadingPosts">
        <span class="loading-message">Loading posts...</span>
      </div>

      <ul v-if="!isLoadingPosts">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <div class="post-container">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import { usePostStore } from '../stores/usePostStore';

const userStore = useUserStore();
const postStore = usePostStore();

const selectedUser = ref(null);
const selectedUserName = ref('');

const { users, isLoading: isLoadingUsers, fetchUsers } = userStore;
const { posts, isLoading: isLoadingPosts, fetchPosts } = postStore;

const onUserChange = () => {
  if (selectedUser.value) {
    fetchPosts(selectedUser.value);
    const selectedUserObject = users.find(user => user.id === selectedUser.value);
    selectedUserName.value = selectedUserObject ? selectedUserObject.name : '';
  } else {
    selectedUserName.value = '';
  }
};

watch(selectedUser, () => {
  if (selectedUser.value) {
    fetchPosts(selectedUser.value);
  }
});

fetchUsers();
</script>

<style scoped>
.posts-container {
  width: 100%;
  max-width: 900px;
  margin: 55px auto 300px;
  background: rgba(5, 12, 156, 0.5); /* Adjust the background as needed */
  border-radius: 10px;
  padding: 20px;
}

.posts {
  background: transparent;
}

h1 {
  font-family: 'Arial Black';
  color: #A7E6FF;
  font-size: 50px;
  font-weight: 100;
  text-align: center;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #241d1d;
}

.selectModel {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  text-align: left;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #c0191900;
  cursor: pointer;
}

.selectModel:focus {
  outline: none;
  border-color: #00aaff;
}

.loading-message {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 20px;
}

.post-container {
  background-color: #3572EF;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #3ABEF9;
}

h3 {
  margin: 0 0 10px;
  color: #000000;
  font-size: 1.5rem;
}

p {
  margin: 0;
  color: #4d4d4d;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .posts {
    padding: 10px;
  }

  h1 {
    font-size: 2rem;
  }

  .selectModel {
    font-size: 0.875rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.875rem;
  }
}
</style>
