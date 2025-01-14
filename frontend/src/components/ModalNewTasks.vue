<template>
	<ion-modal :is-open="isOpen" @did-dismiss="closeModal" class="modalCrearTask" :fullscreen="false">
		<ion-content class="ion-padding">
			<div class="modal-content">
				<!-- Contenido -->
				<ion-input v-model="task.title" placeholder="Título de la tarea"></ion-input>
			</div>

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
			<ion-toolbar class="modalFooteToolBar">
				<!-- <ion-buttons slot="start">
					<ion-button @click="closeModal">Cancelar</ion-button>
					<ion-button :strong="true" @click="submitTask">Crear</ion-button>
				</ion-buttons> -->
				<ion-buttons slot="end">
					<ion-button @click="closeModal">Cancelar</ion-button>
					<ion-button :strong="true" @click="submitTask">Crear</ion-button>
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
	IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/vue';
// import { OverlayEventDetail } from '@ionic/core/components';
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
	isOpen: Boolean, // Prop para controlar si el modal está abierto
});

const emit = defineEmits(['update:isOpen', 'taskCreated']);

// Modelo de datos inicial de la tarea
const task = ref({
	title: '',
	description: '',
	// priority: 'medium',
	dueDate: '',
	categoryId: [],
	// sharedWith: [],
});

const sharedWithInput = ref('');

const closeModal = () => {
	emit('update:isOpen', false);
};

const submitTask = async () => {
	try {
		const response = await axios.post('http://localhost:3000/tasks', task.value);
		console.log('Tarea creada:', response.data);

		emit('taskCreated', response.data);

		closeModal();
	} catch (error) {
		console.error('Error al crear la tarea:', error);
	}
};
</script>

<style>
.modalCrearTask{
	--height: 15%;
	--width: 60%;
	--backdrop-opacity: 0.7;
	--border-radius: 15px
}

.modalFooteToolBar{
	padding: 0 1%;
}
</style>