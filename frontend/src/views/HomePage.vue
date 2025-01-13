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
					<ion-button @click="toggleView" slot="secondary" fill="clear" color="primary" class="right-10">
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
						<!-- <ion-col v-for="tarea in tareas" :key="tarea._id" size="4"> -->
						<ion-card v-for="tarea in tareas" :key="tarea._id">
							<div class="card-header">
								<ion-card-header>
									<ion-card-title>{{ tarea.title }}</ion-card-title>
								</ion-card-header>
								<ion-button @click="editTask(tarea)" class="edit-button" fill="clear">
									<ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
								</ion-button>
							</div>
							<ion-card-content>
								<p>{{ tarea.description }}</p>
							</ion-card-content>
						</ion-card>
						<!-- </ion-col> -->
					</ion-row>
				</ion-grid>

				<ion-list v-else>
					<ion-card v-for="tarea in tareas" :key="tarea._id">
						<div class="card-header">
							<ion-card-header>
								<ion-card-title>{{ tarea.title }}</ion-card-title>
							</ion-card-header>
							<ion-button @click="editTask(tarea)" class="edit-button" fill="clear">
								<ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
							</ion-button>
						</div>
						<ion-card-content>
							<p>{{ tarea.description }}</p>
						</ion-card-content>
					</ion-card>
				</ion-list>
			</ion-content>
			<ion-footer>
				<ion-toolbar>
					<ion-title>Footer</ion-title>
				</ion-toolbar>
			</ion-footer>
		</ion-page>
		<ModalNewTask :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" @taskCreated="handleTaskCreated" />
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
	IonItem,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
	IonModal,
	IonInput,
	IonTextarea,
	IonFab, IonFabButton, IonFabList, IonIcon,
	IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/vue';
import { ref } from "vue";
import SideMenu from "@/components/SideMenu.vue";
import ModalNewTask from "@/components/ModalNewTasks.vue";
import { getAllTasks } from "@/models/Tasks";
import { add, list, grid, create, createOutline } from 'ionicons/icons';

const isModalOpen = ref(false);

const openModal = () => {
	isModalOpen.value = true;
};

const handleTaskCreated = (newTask: any) => {
	console.log('Nueva tarea creada:', newTask);
	// Aquí puedes actualizar una lista de tareas si la tienes.
};

const tareas = ref([]);
// const loading = ref(true);
// const error = ref("");

(async () => {
	try {
		const datos = await getAllTasks(); // Llamada a la función
		console.log(datos);
		tareas.value = datos; // Asignar los datos a la variable reactiva
	} catch (error) {
		console.error("Error al cargar tareas:", error);
	} finally {
		// loading.value = false; // Marcar como cargado
	}
})();

const isGridView = ref(false);

const toggleView = () =>  {
	isGridView.value = !isGridView.value;
}

const editTask = (newTask: any) => {
	// isGridView.value = !isGridView.value;
}

</script>

<style scoped>
.right-10 {
	margin-right: 10px;
}

.right-20 {
	margin-right: 20px;
}

.card-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	/* position: relative; */
}

/* .edit-button {
	position: absolute;
	top: 6px;
	right: 6px;
	z-index: 1;
} */
/* #container {
	text-align: center;

	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}

#container strong {
	font-size: 20px;
	line-height: 26px;
}

#container p {
	font-size: 16px;
	line-height: 22px;

	color: #8c8c8c;

	margin: 0;
}

#container a {
	text-decoration: none;
} */
</style>
