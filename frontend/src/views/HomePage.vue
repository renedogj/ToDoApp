<template>
	<div class="app">
		<!-- Side Menu -->
		<SideMenu :isOpen="isMenuOpen" @closeMenu="isMenuOpen = false" :boardList="boardList" :actualBoard="boardName"
			:boardViews="boardViews" :actualView="actualView" @updateBoard="boardName = $event"
			@updateView="actualView = $event" />

		<!-- Main Content -->
		<div class="main" :class="{ 'main-shift': isMenuOpen }" id="main">

			<!-- Header -->
			<header class="header">
				<div class="header-left">
					<!-- Botón menú lateral -->
					<button v-if="!isMenuOpen" class="icon-button" @click="toggleMenu">
						☰
					</button>
					<h1 class="title">{{ boardName }} {{ actualView }}</h1>
				</div>

				<div class="header-right">

					<button v-if="actualView == 3" @click="goToday">Hoy</button>

					<!-- Botón Grid/List -->
					<!-- <button v-if="[1, 2].includes(actualView)" class="icon-button" @click="toggleGridListView">
						<span v-if="actualView == 1">▦</span>
						<span v-if="actualView == 2">≡</span>
					</button> -->

					<!-- Botón añadir -->
					<button class="add-button" @click="openModal">
						＋
					</button>
				</div>
			</header>

			<!-- Content -->
			<main class="content">
				<Grid v-if="actualView == 1">
					<TaskCard v-for="task in tasks" :task="task" @editTask="editTask" />
				</Grid>

				<List v-if="actualView == 2">
					<TaskCard v-for="task in tasks" :task="task" @editTask="editTask" />
				</List>

				<TimeLineStructure v-if="actualView == 3" :tasks="tasks" ref="timelineStructureRef" />
			</main>
		</div>

	</div>
</template>

<!-- <ModalNewTask :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" @taskCreated="handleTaskCreated" /> -->

<script lang="ts" setup>
import { ref, triggerRef, markRaw, reactive, onMounted, onUnmounted } from "vue";
import { useRoute } from 'vue-router'
import SideMenu from "@/components/SideMenu.vue";
import TaskCard from "@/components/TaskCard.vue"
import Grid from "@/components/Grid.vue"
import List from "@/components/List.vue"
import TimeLineStructure from "@/components/TimeLineStructure.vue"
// import ModalNewTask from "@/components/ModalNewTasks.vue";
import { Task } from '@/models/Tasks';
import viewListJson from '@/models/db/viewList.json';

import { onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import { getDatabase, ref as dbRef, onValue, push, set } from "firebase/database";
// import ListItem from "@/components/ListItem.vue";

// Estado del menú lateral
const isMenuOpen = ref(false);

function toggleMenu() {
	isMenuOpen.value = !isMenuOpen.value;
}
const route = useRoute()

const boardList = ref();
const boardName = ref("")
boardName.value = (route.params.board as string) || "Notas"
const tasks = ref<Task[]>([]);

const boardViews = ref<any>({})
const actualView = ref(1)

const db = getDatabase();
const boardListRef = dbRef(db, "boardList/")
const boardRef = dbRef(db, "boards/" + boardName.value)
const tasksRef = dbRef(db, "boards/" + boardName.value + "/tasks/");

const timelineStructureRef = ref(null)

onValue(boardRef, (snapshot) => {
	const data = snapshot.val();
	console.log(data)
	tasks.value = data.tasks
		? Object.entries(data.tasks).map(([id, value]) => ({ _id: id, ...(value as Omit<Task, "_id">) }))
		: [];
	actualView.value = data.defaultView || 1;

	const viewList: any = viewListJson as any;
	Array.from(data.views.toString(), Number).forEach(id => {
		if (viewList[id]) {
			boardViews.value[id] = viewList[id]
		}
	})
}, {
	onlyOnce: true
});

onValue(boardListRef, (snapshot) => {
	const data = snapshot.val();
	boardList.value = data
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

// const isModalOpen = ref(false);
// const openModal = () => {
// 	isModalOpen.value = true;
// };

// const handleTaskCreated = (newTask: Task) => {
// 	// tasks.value.unshift(newTask);
// };

// const toggleGridListView = () => {
// 	actualView.value = (actualView.value == 1) ? 2 : 1
// }

// const editTask = (task: Task) => {
// 	console.log('Editar tarea:', task);
// };


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

function goToday() {
	timelineStructureRef.value?.scrollToToday()
}


const insertTasks = () => {
  let currentDate = new Date();

  for (let i = 1; i <= 45; i++) {
    // Generar IDs únicos
    const taskRef = push(dbRef(db, "boards/Oposición/tasks"));
    const taskId = taskRef.key as string;

    // Subtask fechas
    const startDate = new Date(currentDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3);

    // Subtask
    const subTaskRef = push(dbRef(db, `boards/Oposición/tasks/Tema ${i}/subTasks`));
    const subTaskId = subTaskRef.key as string;

    const taskData = {
      _id: taskId,
      title: `Tema ${i}`,
      subTasks: {
        [subTaskId]: {
          _id: subTaskId,
          title: `Subrayado tema ${i}`,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0]
        }
      }
    };

    // Insertar en Firebase (sin async/await)
    set(taskRef, taskData).then(() => {
      console.log(`✅ Tema ${i} insertado`);
    }).catch((error) => {
      console.error("❌ Error al insertar:", error);
    });

    // Actualizar fecha para la siguiente subtarea
    currentDate = new Date(endDate);
    currentDate.setDate(currentDate.getDate());
  }

  // alert("🚀 Inserción de 45 tareas en progreso. Revisa tu Firebase.");
};
// insertTasks();
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
	width: 100%;
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
	/* padding: 15px; */
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
