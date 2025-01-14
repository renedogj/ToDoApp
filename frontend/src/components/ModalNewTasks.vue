<template>
	<ion-modal :is-open="isOpen" @did-dismiss="closeModal" class="modalCrearTask" :fullscreen="false"
		:class="modalClass">
		<ion-content class="ion-padding">
			<ion-input v-model="task.title" placeholder="Título de la tarea"></ion-input>

			<ion-textarea v-if="isDescriptionVisible" v-model="task.description" :rows=2
				placeholder="Describe la tarea"></ion-textarea>
			<!-- <ion-list> -->
			<!-- <ion-item>
					<ion-label position="stacked">Título</ion-label>
					<ion-input v-model="task.title" placeholder="Título de la tarea"></ion-input>
				</ion-item> -->

			<!-- <ion-item>
					<ion-label position="stacked">Descripción</ion-label>
					<ion-textarea v-model="task.description" placeholder="Describe la tarea"></ion-textarea>
				</ion-item> -->

			<!-- <ion-item>
					<ion-label position="stacked">Prioridad</ion-label>
					<ion-select v-model="task.priority" placeholder="Selecciona una prioridad">
						<ion-select-option value="low">Baja</ion-select-option>
						<ion-select-option value="medium">Media</ion-select-option>
						<ion-select-option value="high">Alta</ion-select-option>
					</ion-select>
				</ion-item> -->

			<!-- <ion-item>
					<ion-label position="stacked">Fecha de Entrega</ion-label>
					<ion-datetime v-model="task.dueDate" display-format="YYYY-MM-DD"></ion-datetime>
				</ion-item> -->

			<!-- <ion-item>
					<ion-label position="stacked">Categoría</ion-label>
					<ion-input v-model="task.categoryId" placeholder="ID de Categoría"></ion-input>
				</ion-item> -->

			<!-- <ion-item>
					<ion-label position="stacked">Compartir con (IDs separados por coma)</ion-label>
					<ion-input v-model="sharedWithInput" placeholder="123, 456, 789"></ion-input>
				</ion-item> -->
			<!-- </ion-list> -->
		</ion-content>
		<ion-footer>
			<ion-toolbar class="modalFooterToolBar">
				<ion-buttons slot="start">
					<ion-button @click="openDescription" color="primary">
						<ion-icon slot="icon-only" :icon="documentText"></ion-icon>
					</ion-button>
					<ion-button @click="openDescription" color="primary">
						<ion-icon slot="icon-only" :icon="bookmarks"></ion-icon>
					</ion-button>
					<ion-button @click="openDescription" color="primary">
						<ion-icon slot="icon-only" :icon="calendarClear"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-buttons slot="end">
					<ion-button @click="closeModal">Cancelar</ion-button>
					<ion-button :strong="true" @click="createTask">Crear</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-footer>
	</ion-modal>
</template>

<script lang="ts" setup>
import {
	IonButtons,
	IonButton,
	IonModal,
	IonHeader,
	IonContent,
	IonToolbar,
	IonTitle,
	IonItem,
	IonInput,
	IonFooter,
	IonList,
	IonLabel,
	IonTextarea,
	IonSelect,
	IonSelectOption,
	IonDatetime,
	IonIcon,
	IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/vue';
import { ref, defineProps, defineEmits, computed } from 'vue';
import { Task } from '@/models/Tasks';
import axios from 'axios';
import { documentText, bookmarks, calendarClear  } from "ionicons/icons";

const props = defineProps({
	isOpen: Boolean,
});

const emit = defineEmits(['update:isOpen', 'taskCreated']);

const task = ref<Partial<Task>>({
	title: '',
	description: '',
	labels: [],
	dueDate: '',
});

const isDescriptionVisible = ref(false);

const openDescription = () => {
	isDescriptionVisible.value = !isDescriptionVisible.value;
};

const modalClass = computed(() => ({
	"descriptionIsOpen": isDescriptionVisible.value,
}));

const createTask = async () => {
	try {
		const response = await axios.post('http://localhost:3000/tasks', task.value);
		console.log('Tarea creada:', response.data);

		emit('taskCreated', response.data);

		closeModal();
	} catch (error) {
		console.error('Error al crear la tarea:', error);
	}
};

const closeModal = () => {
	task.value = {
		title: '',
		description: '',
		dueDate: '',
	};
	emit('update:isOpen', false);
};


</script>

<style>
.modalCrearTask{
	--height: 15%;
	--width: 60%;
	--backdrop-opacity: 0.7;
	--border-radius: 15px;
	--box-shadow: none;
}

.descriptionIsOpen{
	--height: 23%;
}

.modalFooterToolBar{
	padding: 0 1%;
}
</style>