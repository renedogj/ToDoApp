<template>
	<ion-menu type="overlay" menu-id="main-menu" content-id="main">
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu Content</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :inset="true">
			<ion-list>
				<ion-item>
					<ion-label>Pokémon Yellow</ion-label>
				</ion-item>
				<ion-item>
					<ion-label>Mega Man X</ion-label>
				</ion-item>
				<ion-item>
					<ion-label>The Legend of Zelda</ion-label>
				</ion-item>
				<ion-item>
					<ion-label>Pac-Man a</ion-label>
				</ion-item>
				<ion-item>
					<ion-label>Super Mario World</ion-label>
				</ion-item>
			</ion-list>
		</ion-content>
		<ion-footer>
			<ion-toolbar>
				<ion-title>Menu-Footer</ion-title>
			</ion-toolbar>
		</ion-footer>
	</ion-menu>
</template>

<script lang="ts" setup>
import {
	IonHeader,
	IonContent,
	IonTitle,
	IonToolbar,
	IonFooter,
	IonMenu,
	IonButtons,
	IonButton,
	IonIcon,
	IonMenuButton,
	IonItem,
	IonLabel,
	IonList
} from '@ionic/vue';
import { menu } from 'ionicons/icons';

// type Props = {
// 	isOpen: boolean;
// }

// const props = defineProps<Props>();

</script>