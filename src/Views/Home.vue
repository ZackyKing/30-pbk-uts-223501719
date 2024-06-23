<template>
  <div class="todo-container">
    <div class="todo-app" id="todo-app">
      <h1>To-Do List <img src="../assets/icon.png"></h1>
      <div class="row">
        <input type="text" v-model="newTask" placeholder="Apa yang ingin anda kerjakan ?">
        <q-btn label="Tambah" @click="addTask" color="primary" class="custom-btn" />
      </div>
      <div class="filters">
        <q-btn @click="hideCompleted = !hideCompleted" class="button-74" color="primary">
          {{ hideCompleted ? 'Tampilkan' : 'Sembunyikan' }}
        </q-btn>
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
import { ref, computed, onMounted } from 'vue'
import { Quasar, Notify } from 'quasar'
import 'quasar/dist/quasar.css'

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
    Notify.create("Harus ada isi!");
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

onMounted(() => {
  loadData();
})
</script>

<style scoped>
.todo-container {
  width: 100%;
  max-width: 900px;
  margin: 55px auto 20px;
  background: rgba(5, 12, 156, 0.5);
  border-radius: 10px;
  padding: 20px;
}

.todo-app {
  background: transparent;
}

.todo-app h1 {
  font-family: 'Arial Black';
  color: #A7E6FF;
  font-size: 50px;
  font-weight: 100;
  text-align: center;
  margin-bottom: 40px;
}

.todo-app h1 img {
  width: 50px;
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
  font-size: 20px;
  color: #000000;
}

.custom-btn {
  border: none;
  padding: 16px 50px;
  background: #435a9d;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
}

.custom-btn:hover {
  background: #6083eb;
}

.lists {
  padding-left: 0;
}

.lists li {
  list-style: none;
  font-size: 20px;
  padding: 10px 100px 12px 50px;
  user-select: none;
  cursor: pointer;
  position: relative;
  color: #141212;
}

.lists li::before {
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

.lists li.checked {
  color: rgb(221, 221, 221);
  text-decoration: line-through;
}

.lists li.checked::before {
  background-image: url(../assets/checked.png);
}

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

.editbutton {
  position: absolute;
  right: 45px; 
  top: 5px;
  width: 40px;
  height: 40px;
  font-size: 16px;
  color: #1aff00;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
}

.editbutton:hover {
  background: #81aaf18d;
}

.filters {
  display: flex;
  justify-content: center;
  padding-top: 3vh;
}

.reminder h4 {
  display: flex;
  justify-content: center;
  color: #A7E6FF;
  position: relative;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
  align-items: center;
}

@media (max-width: 768px) {
  .todo-app h1 {
    font-size: 2rem;
  }

  input {
    font-size: 0.875rem;
  }

  .custom-btn {
    padding: 10px 30px;
    font-size: 0.875rem;
  }

  .lists li {
    font-size: 1rem;
  }

  .lists li::before {
    height: 20px;
    width: 20px;
  }

  .removebutton, .editbutton {
    width: 30px;
    height: 30px;
    font-size: 1rem;
    line-height: 30px;
  }
}
</style>