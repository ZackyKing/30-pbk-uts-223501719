<template>
  <main class="bg">
    <div class="container">
      <div class="todo-app">
        <h2>To-Do List <img src="./assets/icon.png"></h2>
        <div class="row">
          <input type="text" v-model="newTask" placeholder="Apa yang ingin anda kerjakan ?">
          <button @click="addTask">Tambah</button>
        </div>
        <div class="filters">
          <button @click="hideCompleted = !hideCompleted" class="button-74">
            {{ hideCompleted ? 'Tampilkan' : 'Sembunyikan' }}
          </button>
        </div>
        <ul>
          <li v-for="(task, index) in filteredTodos" :key="task.id" :class="{ checked: task.checked }" @click="toggleTask(task)">
            {{ task.text }}
            <span @click.stop="removeTask(task)">&#xd7;</span>
          </li>
        </ul>
        <div class="reminder">
          <h4>Pastikan anda mengingat tugas yang harus diselesaikan!</h4>
        </div>
      </div>
    </div>
    <audio autoplay loop>
      <source src="./assets/bgm.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const newTask = ref('');
  const tasks = ref([]);
  const hideCompleted = ref(false);
  const muted = ref(false);
  const volume = ref(1);
  
  const filteredTodos = computed(() => {
    return hideCompleted.value
      ? tasks.value.filter((task) => !task.checked)
      : tasks.value;
  });
  
  function addTask() {
    if (newTask.value.trim() === '') {
      alert("Kamu belum mengisi Kegiatan!");
    } else {
      tasks.value.unshift({ id: Date.now(), text: newTask.value, checked: false });
      newTask.value = '';
      saveData();
    }
  }

  function toggleTask(task) {
    task.checked = !task.checked; 
    saveData();
  }
  
  function removeTask(task) {
    const index = tasks.value.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
      saveData();
    }
  }
  
  function toggleMute() {
  muted.value = !muted.value;
  const audio = $refs.bgMusic;
  audio.muted = muted.value;
  }

  function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }
  
  function loadData() {
    const savedTasks = localStorage.getItem("tasks");
    tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
  }
  
  loadData();
  </script>
  
  
  <style scoped>
  .bg{
    background-image:url("./assets/background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .container {
    width: 100%;
    min-height: 100vh;
    padding: 10px;
    margin-top: -10px;
    margin-left: -10px;
    margin-bottom: -10px;
  }
  
  .todo-app {
    width: 100%;
    max-width: 540px;
    background: #b2c9fad5;
    margin: 100px auto 20px;
    padding: 40px 30px 70px;
    border-radius: 10px;
  }
  .todo-app h2{
    color: #000000;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
  .todo-app h2 img{
    width: 30px;
    margin-left: 10px;
  }
  
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff83;
    border-radius: 20px;
    padding-left: 20px;
  }
  
  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 10px;
    font-weight: 14px;
    color: #000000;
  }
  
  .row button {
    border: none;
    outline: none;
    padding: 16px 50px;
    background: #435a9d;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    border-radius: 20px;
  }
  
  ul li {
    list-style: none;
    font-size: 20px;
    padding: 10px 8px 12px 50px;
    user-select: none;
    cursor: pointer;
    position: relative;
    color: #141212;
  }
  
  ul li::before {
    content: '';
    position: absolute;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    background-image: url(./assets/unchecked.png);
    background-size: cover;
    background-position: center;
    top: 12px;
    left: 8px;
  }
  
  ul li.checked {
    color: #7e7e7e;
    text-decoration: line-through;
  }
  
  ul li.checked::before {
    background-image: url(assets/checked.png);
  }
  
  ul li span {
    position: absolute;
    right: 0;
    top: 5px;
    width: 40px;
    height: 40px;
    font-size: 22px;
    color: #ff0000;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
  }
  
  ul li span:hover {
    background: #0055ff44;
  }
  
  .filters{
    position: relative;
    padding-top: 3vh;
    left: 10rem;
    
  }
  
  .filters button{
    margin-left: 20px;
  }
  
  
  .button-74 {
    background-color: #435a9d;
    border: 2px solid #001d25;
    border-radius: 22px;
    box-shadow: #333333 4px 4px 0 0;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    font-size: 18px;
    padding: 0 18px;
    line-height: 50px;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  
  .button-74:hover {
    background-color: #6083eb;
  }
  
  .button-74:active {
    box-shadow: #002770 2px 2px 0 0;
    transform: translate(2px, 2px);
  }
  
  @media (min-width: 768px) {
    .button-74 {
      min-width: 120px;
      padding: 0 25px;
    }
  }
  
  .reminder h4{
    color: #1a1a1a;
    position: relative;
    width: 100%;
    padding-top: 50px;
    padding-left: 20px;
    align-items: center;
  }
  </style>