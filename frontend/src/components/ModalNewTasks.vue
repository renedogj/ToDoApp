<template>
	<ion-modal :is-open="isOpen" @did-dismiss="closeModal" class="modalCrearTask" :fullscreen="false"
		:class="modalClass">
		<ion-content class="ion-padding modalIonContent">
			<ion-input v-model="task.title" placeholder="Título de la tarea" class="newTaskFormElement"></ion-input>

			<ion-textarea v-if="isDescriptionVisible" v-model="task.description" :rows=2 class="newTaskFormElement"
				placeholder="Describe la tarea"></ion-textarea>

			<div v-if="isCalendarVisible" class="divDateTime">
				<div class="dateTimeContainer">
					<ion-datetime v-model="task.dueDate" :first-day-of-week="1" :prefer-wheel="true" presentation="date"
						class="date" max="2199-12-31T23:59:59">
						<label slot="title">{{ formatDate(task.dueDate, ddMM24) }}</label>
					</ion-datetime>

					<ion-datetime v-model="task.dueDate" hourCycle="h24" :prefer-wheel="true" presentation="time"
						class="time">
						<label slot="title">{{ formatDate(task.dueDate, HHmm24) }}</label>
					</ion-datetime>
				</div>
			</div>

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
		</ion-content>
		<ion-footer>
			<ion-toolbar class="modalFooterToolBar">
				<ion-buttons slot="start">
					<ion-button @click="openDescription" color="primary">
						<ion-icon slot="icon-only" :icon="documentText"></ion-icon>
					</ion-button>
					<ion-button @click="openCalendar" color="primary">
						<ion-icon slot="icon-only" :icon="calendarClear"></ion-icon>
					</ion-button>
					<ion-button @click="openMarks" color="primary">
						<ion-icon slot="icon-only" :icon="bookmarks"></ion-icon>
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
	IonDatetimeButton,
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
	title: "",
	description: "",
	labels: [],
	dueDate: "",
});

const isDescriptionVisible = ref(false);
const isCalendarVisible = ref(false);
const isMarksVisible = ref(false);

const openDescription = () => {
	isDescriptionVisible.value = !isDescriptionVisible.value;
	if (!isCalendarVisible.value) {
		task.value.description = "";
	}
};
const openCalendar = () => {
	isCalendarVisible.value = !isCalendarVisible.value;
	if(!isCalendarVisible.value) {
		task.value.dueDate = "";
	}
};
const openMarks = () => {
	isMarksVisible.value = !isMarksVisible.value;
};

const modalClass = computed(() => {
	var valueClass = 0; 
	valueClass += isDescriptionVisible.value ? 1 : 0;
	valueClass += isCalendarVisible.value ? 2 : 0;
	valueClass += isMarksVisible.value ? 4 : 0;

	return {
		"descriptionIsOpen": valueClass == 1,
		"calendarIsOpen": valueClass == 2,
		"descriptionCalendarAreOpen": valueClass == 3,
		"marksIsOpen": valueClass == 4,
		"descriptionMarksAreOpen": valueClass == 5,
		"marksCalendarAreOpen": valueClass == 6,
		"descriptionMarksCalendarAreOpen": valueClass == 7,
	}
});

const ddMMHHmm24: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: 'long',
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23',
};

const ddMM24: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: 'long',
	hourCycle: 'h23',
};

const HHmm24: Intl.DateTimeFormatOptions = {
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23',
};

const formatDate = (date: any, formatOptions?: Intl.DateTimeFormatOptions) => {
	if(date != null && date != ""){
		return new Intl.DateTimeFormat('es-ES', formatOptions).format(new Date(date));
	}else{
		return new Intl.DateTimeFormat('es-ES', formatOptions).format(new Date());
	}
};

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

<style scoped>
.modalCrearTask{
	--height: 16%;
	--width: 60%;
	--backdrop-opacity: 0.7;
	--border-radius: 15px;
	--box-shadow: none;
}

.descriptionIsOpen{
	--height: 25%;
}
.descriptionCalendarAreOpen{
	--height: 53%;
}
.calendarIsOpen {
	--height: 45%;
}
.marksIsOpen {

}
.descriptionMarksAreOpen {

}
.marksCalendarAreOpen {

}
.descriptionMarksCalendarAreOpen {

}

.newTaskFormElement{
	margin: 0 0 1.5% 0;
}

.divDateTime {
	box-shadow: 0px 0px 5px 1.5px black;
	border-radius: 15px;
	width: 56.5%;
}

.dateTimeContainer {
	/* background-color: red; */
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
}

ion-dateTime.date {
	border-radius: 15px 0 0 15px;
}

ion-dateTime.time {
	border-radius: 0 15px 15px 0;
}

ion-dateTime label {
	text-align: center;
	font-size: 16px;
	font-family: Roboto, "Helvetica Neue", sans-serif;
	padding: 1% 0;
}

.modalFooterToolBar{
	padding: 0 1%;
}
</style>