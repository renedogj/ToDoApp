<template>
	<ion-card :key="task._id">
		<div class="card-header">
			<ion-card-header>
				<ion-card-title>{{ task.title }}</ion-card-title>
			</ion-card-header>
			<ion-button @click="onEdit(task)" class="edit-button" fill="clear">
				<ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
			</ion-button>
		</div>
		<ion-card-content>
			<p>{{ task.description }}</p>
		</ion-card-content>
	</ion-card>
</template>

<script lang="ts" setup>
import {
	IonButton,
	IonIcon,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle
} from '@ionic/vue';
import { createOutline } from 'ionicons/icons';
import { defineProps, defineEmits } from 'vue';
import { Task } from '@/models/Tasks';

type Props = {
	task: Task
}

const props = defineProps<Props>();
const task = props.task;


const emit = defineEmits(['editTask']);
const onEdit = (task: Task) => {
	emit('editTask', task);
};

</script>

<style scoped>
.card-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: relative;
}
</style>