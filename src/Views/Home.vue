<template>
    <div class="container">
      <header class="header">
        <nav class="navbar">
            <router-link to="/" class="active">Home</router-link>
            <router-link to="/post">Posts</router-link>
        </nav>
      </header>
      <div class="todo-app" id="todo-app">
        <h1>To-Do List <img src="../assets/icon.png"></h1>
        <div class="row">
          <input type="text" v-model="newTask" placeholder="Apa yang ingin anda kerjakan ?">
          <button @click="addTask">Tambah</button>
        </div>
        <div class="filters">
          <button @click="hideCompleted = !hideCompleted" class="button-74">
            {{ hideCompleted ? 'Tampilkan' : 'Sembunyikan' }}
          </button>
        </div>
        <ul class="lists">
          <li
            v-for="(task, index) in filteredTodos" :key="task.id"
            :class="{ checked: task.checked, editing: task.editing }"
            @click="toggleTask(task)">
            <template v-if="!task.editing">
              {{ task.text }}
              <span @click.stop="removeTask(task)" class="removebutton">&#xd7;</span>
              <span @click.stop="editTask(task)" class="editbutton">&#x270E;</span>
            </template>
            <template v-else>
              <input type="text" v-model="task.text" @keyup.enter="updateTask(task)">
              <span @click.stop="cancelEdit(task)" class="editbutton">&#x2716;</span>
            </template>
          </li>
        </ul>
        <div class="reminder">
          <h4>Pastikan anda mengingat tugas yang harus diselesaikan!</h4>
        </div>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  let id = 0
  
  const newTask = ref('')
  const hideCompleted = ref(false)
  const tasks = ref([
    { id: id++, text: 'Learn HTML', checked: true, editing: false },
    { id: id++, text: 'Learn JavaScript', checked: true, editing: false },
    { id: id++, text: 'Learn Vue', checked: false, editing: false }
  ])
  
  function toggleTask(task) {
    if (!task.editing) {
      task.checked = !task.checked;
      saveData();
    }
  }
  
  const filteredTodos = computed(() => {
    return hideCompleted.value
      ? tasks.value.filter((task) => !task.checked)
      : tasks.value
  })
  
  function addTask() {
    if (newTask.value.trim() === '') {
      alert("Agenda tidak boleh kosong!");
    } else {
      tasks.value.unshift({ id: id++, text: newTask.value, checked: false, editing: false });
      newTask.value = '';
      saveData();
    }
  }
  
  function removeTask(task) {
    tasks.value = tasks.value.filter((t) => t !== task)
  }
  
  function editTask(task) {
    task.editing = true;
    task.checked = false; 
  }
  
  function updateTask(task) {
    if (task.text.trim() === '') {
      alert("Harus ada isi!");
    } else {
      task.editing = false;
      saveData();
    }
  }
  
  function cancelEdit(task) {
    task.editing = false;
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
  /* Global styles */
  @media (prefers-color-scheme: dark) {
    .todo-app h2 ul li {
      color: #000; /* Adjust text color for dark mode */
    }
  }
  
  /* Section styles */
  section {
    min-height: 100vh;
    padding: 10rem 9% 2rem; /* Adjust padding for different screen sizes */
  }
  
  /* Navbar styles */
  
  .navbar {
    display: flex;
    justify-content: right; 
    align-items: right; 
    width: 100%; 
  }
  
  .navbar a {
    font-size: 1.4rem;
    color: white;
    margin: 0 2cap; 
    font-weight: 700;
    text-decoration: none; 
  }
  
  /* Header styles */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 2cap 0%;
    z-index: 1000; 
    background-color: #475dafd3;
    background-position: center;
    background-repeat: repeat-x;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  
  /* Container styles */
  .container {
    width: 100%;
    min-height: 100vh;
    padding: 10px;
    margin-top: -10px;
    margin-left: -10px;
    margin-bottom: -10px;
  }
  
  /* Todo app styles */
  .todo-app {
    width: 100%;
    max-width: 900px;
    background-image: linear-gradient(to bottom, rgba(138, 125, 255, 0.61), rgb(0, 132, 255), rgba(0, 0, 255, 0));
    margin: 50px auto 20px;
    padding: 40px 40px 70px;
    border-radius: 5px;
  }
  
  /* Todo app header styles */
  .todo-app h1{
    text-align: center;
    color: #000000;
    align-items: center;
    margin-bottom: 40px;
  }

  .todo-app h1 img{
    width: 50px;
    margin-left: 10px;
  }
  
  /* Row styles */
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff83;
    border-radius: 20px;
    padding-left: 20px;
  }
  
  /* Input styles */
  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 10px;
    font-size: 20px;
    font-weight: 14px;
    color: #000000;
  }
  
  /* Button styles */
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
  .row button:hover{
    background: #6083eb;
  }
  
  /* List styles */
  ul li {
    list-style: none;
    font-size: 20px;
    padding: 10px 100px 12px 50px;
    user-select: none;
    cursor: pointer;
    position: relative;
    color: #141212;
  }
  
  /* List item styles */
  ul li::before {
    content: '';
    position: absolute;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    background-image: url(../assets/unchecked.png);
    background-size: cover;
    background-position: center;
    top: 12px;
    left: 8px;
  }
  
  /* Checked list item styles */
  ul li.checked {
    color: rgb(221, 221, 221);
    text-decoration: line-through;
  }
  
  /* Checked list item icon styles */
  ul li.checked::before {
    background-image: url(../assets/checked.png);
  }
  
  /* Remove button styles */
  .removebutton {
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
  
  .removebutton:hover {
    background: #81aaf18d;
  }
  
  /* Edit button styles */
  .editbutton {
    position: absolute;
    right: 45px; 
    top: 5px;
    width: 40px;
    height: 40px;
    font-size: 16px;
    color: #ff0000;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
  }
  
  .editbutton:hover {
    background: #81aaf18d;
  }
  /* Filter styles */
  .filters{
    display: flex;
    justify-content: center;
    padding-top: 3vh; 
  }
  
  /* Filter button styles */
  .filters button{
    align-items: center;
    justify-content: center;
  }
  
  /* Button-74 styles */
  .button-74 {
    background-color: #435a9d;
    border: 2px solid #001d25;
    border-radius: 22px;
    box-shadow: #333333 4px 4px 0 0;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-weight: 200;
    font-size: 14px;
    padding: 0 18px;
    line-height: 30px;
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

  .reminder h4{
    display: flex;
    justify-content: center;
    color: #1a1a1a;
    position: relative;
    width: 100%;
    padding-top: 50px;
    padding-left: 20px;
    align-items: center;
  }
  
  /* Media queries */
  @media (min-width: 768px) {
    .button-74 {
      min-width: 120px;
      padding: 0 25px;
    }
  }
  
  @media (max-width: 768px) {
    /* Adjustments for smaller screens */
    .header {
      left: 0;
    }
  }
  </style>
  