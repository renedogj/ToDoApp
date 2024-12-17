<template>
	<ion-split-pane when="md" content-id="main">
		<SideMenu />
		<ion-page id="main">
			<ion-header :translucent="true">
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-menu-button menu="main-menu"></ion-menu-button>
					</ion-buttons>
					<ion-title>Home Page</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-content :fullscreen="true">
				<ion-fab slot="fixed" vertical="top" horizontal="end" :edge="true">
					<ion-fab-button id="open-modal" expand="block" @click="openModal">
						<ion-icon :icon=" add"></ion-icon>
					</ion-fab-button>
				</ion-fab>
				<ion-card v-for="tarea in tareas">
					<ion-card-header>
						<ion-card-title>{{ tarea.title }}</ion-card-title>
						<ion-card-subtitle>{{ tarea.description }}</ion-card-subtitle>
					</ion-card-header>

					<ion-card-content>
						{{ tarea.creationDate }}
						<p>Status: {{ tarea.status }}</p>
					</ion-card-content>
				</ion-card>
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
	IonFab, IonFabButton, IonFabList, IonIcon,
	IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/vue';
import { ref } from "vue";
import SideMenu from "@/components/SideMenu.vue";
import ModalNewTask from "@/components/ModalNewTasks.vue";
import { getAllTasks } from "@/models/Tasks";
import { add } from 'ionicons/icons';

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
</script>

<style scoped>
ion-fab {
	right: 20px;
}
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
