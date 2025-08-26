<template>
	<div class="card">
		<div class="card-header">
			<h3 class="card-title">{{ task.title }}</h3>
			<button class="edit-button" @click="onEdit(task)" title="Editar">
				✎
			</button>
		</div>
		<div class="card-content">
			<p>{{ task.description }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
// import {
// 	IonButton,
// 	IonIcon,
// 	IonCard,
// 	IonCardContent,
// 	IonCardHeader,
// 	IonCardTitle
// } from '@ionic/vue';
// import { createOutline } from 'ionicons/icons';
import { defineProps, defineEmits } from 'vue';
import { Task } from '@/models/Tasks';

// type Props = {
// 	task: Task
// }

// const props = defineProps<Props>();
// const task = props.task;
const props = defineProps<{ task: Task }>();

// Evento para enviar al padre la task actualizada
const emit = defineEmits<{
	(e: "editTask", updatedTask: Task): void;
}>();

// const emit = defineEmits(['editTask']);
// const onEdit = (task: Task) => {
// 	emit('editTask', task);
// };

</script>

<style scoped>
.card {
	/* background: #fff; */
	border-radius: 10px;
	border: 1px solid #ddd;
	padding: 12px 15px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
	transition: transform 0.2s;
}

.card:hover {
	transform: translateY(-2px);
}

.card-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: relative;
}

.card-title {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 600;
	/* color: #333; */
}

.edit-button {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.1rem;
	color: #007bff;
	padding: 4px 6px;
	border-radius: 50%;
	transition: background 0.2s;
}

.edit-button:hover {
	background: rgba(0, 123, 255, 0.1);
}

.card-content {
	margin-top: 10px;
	font-size: 0.95rem;
	/* color: #555; */
}
</style>