<template>
	<div class="app">
		<!-- Side Menu -->
		<SideMenu :isOpen="isMenuOpen" @closeMenu="isMenuOpen = false" />

		<!-- Main Content -->
		<div class="main" :class="{ 'main-shift': isMenuOpen}" id="main">

			<!-- Header -->
			<header class="header">
				<div class="header-left">
					<!-- Botón menú lateral -->
					<button v-if="!isMenuOpen" class="icon-button" @click="toggleMenu">
						☰
					</button>
					<h1 class="title">Tus tareas</h1>
				</div>

				<div class="header-right">
					<!-- Botón Grid/List -->
					<button class="icon-button" @click="toggleGridListView">
						<span v-if="isGridView">≡</span>
						<span v-else>▦</span>
					</button>

					<!-- Botón añadir -->
					<button class="add-button" @click="openModal">
						＋
					</button>
				</div>
			</header>

			<!-- Content -->
			<main class="content">
				<!-- Vista en grid -->
				<div v-if="isGridView" class="grid">
					<div v-for="task in tasks" :key="task._id" class="grid-item">
						<TaskCard :task="task" @editTask="editTask" />
					</div>
				</div>

				<!-- Vista en lista -->
				<div v-else class="list">
					<div v-for="task in tasks" :key="task._id" class="list-item">
						<TaskCard :task="task" @editTask="editTask" />
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<!-- <ModalNewTask :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" @taskCreated="handleTaskCreated" /> -->
<script lang="ts" setup>
import { ref, triggerRef, markRaw, reactive, onMounted, onUnmounted } from "vue";
import SideMenu from "@/components/SideMenu.vue";
import TaskCard from "@/components/TaskCard.vue"
// import ModalNewTask from "@/components/ModalNewTasks.vue";
import { Task } from '@/models/Tasks';

import { onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";

// Estado del menú lateral
const isMenuOpen = ref(false);

function toggleMenu() {
	isMenuOpen.value = !isMenuOpen.value;
}

const tasks = ref<Task[]>([]);
// console.log(tasks)
const db = getDatabase();
const boardName = ref("Notas")
const boardRef = dbRef(db, "boards/" + boardName.value)
const tasksRef = dbRef(db, 'tasks/');

onValue(boardRef, (snapshot) => {
	const data = snapshot.val();
	console.log(data)
	// tasks.value = data
	//   ? Object.entries(data).map(([id, value]) => ({ _id: id, ...(value as Omit<Task, "_id">) }))
	//   : [];
}, {
	onlyOnce: true
});

onValue(tasksRef, (snapshot) => {
	const data = snapshot.val();

	tasks.value = data
		? Object.entries(data).map(([id, value]) => ({ _id: id, ...(value as Omit<Task, "_id">) }))
		: [];
}, {
	onlyOnce: true
});

onChildChanged(tasksRef, (data) => {
	const changedTask = data.val() as Task;
	const id = data.key;

	const index = tasks.value.findIndex((task) => task._id === id);
	if (index !== -1) {
		tasks.value[index] = { ...changedTask };
	}
});

// onMounted(() => {
// //   const tasksRef = dbRef(db, "tasks");
//   onValue(tasksRef, (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//       // Convierte objeto en array con id
//       tasks.value = data
//     } else {
//       tasks.value = [];
//     }
//   });
// });

const isModalOpen = ref(false);
const openModal = () => {
	isModalOpen.value = true;
};

const handleTaskCreated = (newTask: Task) => {
	// tasks.value.unshift(newTask);
};

const isGridView = ref(false);

const toggleGridListView = () => {
	isGridView.value = !isGridView.value;
}

const editTask = (task: Task) => {
	console.log('Editar tarea:', task);
};


// function handleResize() {
//   isDesktop.value = window.innerWidth >= 768; // md breakpoint
//   if (isDesktop.value) {
//     isMenuOpen.value = true; // en desktop siempre abierto
//   }
// }

onMounted(() => {
	// handleResize();
	// window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
	// window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* .right-10 {
	margin-right: 10px;
}

.right-20 {
	margin-right: 20px;
} */

/* Layout general */
.app {
	display: flex;
	height: 100vh;
}

/* Main content */
.main {
	display: flex;
	flex-direction: column;
	flex: 1;
}

/* Header */
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* background: white; */
	border-bottom: 1px solid #ddd;
	padding: 8px 15px;
}

.header-left {
	display: flex;
	align-items: center;
}

.title {
	font-size: 1.2rem;
	font-weight: bold;
	margin-left: 10px;
}

.header-right {
	display: flex;
	gap: 10px;
}

/* Botones */
.icon-button {
	background: none;
	border: 1px solid #ccc;
	border-radius: 50%;
	padding: 6px 10px;
	cursor: pointer;
	font-size: 1.1rem;
}

.icon-button:hover {
	background: #f0f0f0;
}

.add-button {
	background: #007bff;
	border: none;
	color: white;
	border-radius: 50%;
	font-size: 1.2rem;
	padding: 8px 12px;
	cursor: pointer;
}

.add-button:hover {
	background: #0056b3;
}

/* Contenido */
.content {
	flex: 1;
	overflow-y: auto;
	padding: 15px;
}

/* Grid */
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 15px;
}

.grid-item {
	/* background: #fff; */
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 8px;
}

/* Lista */
.list {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.list-item {
	/* background: #fff; */
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 8px;
}
</style>
