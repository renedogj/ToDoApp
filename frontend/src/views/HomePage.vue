<template>
	<ion-split-pane when="md" content-id="main">
		<SideMenu />
		<ion-page id="main">
			<ion-header :translucent="true">
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-menu-button menu="main-menu"></ion-menu-button>
					</ion-buttons>
					<ion-title>Tus tareas</ion-title>
					<ion-button @click="toggleGridListView" slot="secondary" fill="clear" color="primary" class="right-10">
						<ion-icon slot="icon-only" :icon="isGridView ? list : grid"></ion-icon>
					</ion-button>
					<ion-button id="open-modal" @click="openModal" slot="primary" fill="solid" shape="round"
						color="primary" class="right-20">
						<ion-icon slot="icon-only" :icon="add"></ion-icon>
					</ion-button>
				</ion-toolbar>
			</ion-header>
			<ion-content :fullscreen="true">
				<ion-grid v-if="isGridView">
					<ion-row>
						<div v-for="task in tasks" :key="task._id">
							<TaskCard :task="task" @editTask="editTask" />
						</div>
					</ion-row>
				</ion-grid>

				<ion-list v-else>
					<div v-for="task in tasks" :key="task._id">
						<TaskCard :task="task" @editTask="editTask" />
					</div>
				</ion-list>
			</ion-content>
			<ion-footer>
				<ion-toolbar>
					<ion-title>Footer</ion-title>
				</ion-toolbar>
			</ion-footer>
		</ion-page>
		<!-- <ModalNewTask :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" @taskCreated="handleTaskCreated" /> -->
	</ion-split-pane>
</template>

<script lang="ts" setup>
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonFooter,
	IonButtons,
	IonButton,
	IonMenu,
	IonMenuButton,
	IonSplitPane,
	// IonItem,
	// IonLabel,
	IonGrid,
	IonRow,
	// IonCol,
	// IonModal,
	// IonInput,
	// IonTextarea,
	// IonFab, IonFabButton, IonFabList,
	IonIcon,
	IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/vue';
import { ref, triggerRef , markRaw, reactive, onMounted  } from "vue";
import SideMenu from "@/components/SideMenu.vue";
import TaskCard from "@/components/TaskCard.vue"
// import ModalNewTask from "@/components/ModalNewTasks.vue";
import { Task } from '@/models/Tasks';
import { add, list, grid } from "ionicons/icons";
import { onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";

import { getDatabase, ref as dbRef, onValue } from "firebase/database";

const tasks = ref<Task[]>([]);
console.log(tasks)
const db = getDatabase();
const tasksRef = dbRef(db, 'tasks/');

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

const toggleGridListView = () =>  {
	isGridView.value = !isGridView.value;
}

const editTask = (task: Task) => {
	console.log('Editar tarea:', task);
};

</script>

<style scoped>
.right-10 {
	margin-right: 10px;
}

.right-20 {
	margin-right: 20px;
}
</style>
