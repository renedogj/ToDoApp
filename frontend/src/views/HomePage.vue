<template>
	<ion-split-pane when="xs" content-id="main">
		<SideMenu />
		<ion-page id="main">
			<ion-header :translucent="true">
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-menu-button></ion-menu-button>
					</ion-buttons>
					<ion-title>Home Page</ion-title>
				</ion-toolbar>
			</ion-header>

			<ion-content :fullscreen="true">
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
	IonMenu,
	IonMenuButton,
	IonSplitPane,
	IonItem,
	IonLabel,
	IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/vue';

import SideMenu from "@/components/SideMenu.vue";

var tareas = [
	{
		"userId": "c1909495-4914-49d3-913d-130e378fcd93",
		"objectId": "66fc7b3373f4df2a79c87e4d",
		"creationDate": "Mon Jan 07 2013 21:38:35 GMT+0100 (hora estándar de Europa central)",
		"title": "Modern Bronze Chair",
		"description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
		"statusID": "1",
		"status": "done"
	},
	{
		"userId": "765a6a5d-7bd5-43a0-914a-d8669b0dc95c",
		"objectId": "66fc7b3373f4df2a79c87e4e",
		"creationDate": "Fri Jan 19 2007 23:03:47 GMT+0100 (hora estándar de Europa central)",
		"title": "Awesome Cotton Table",
		"description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
		"statusID": "4",
		"status": "done"
	},
	{
		"userId": "b2953807-57af-484d-9080-98c9db657f31",
		"objectId": "66fc7b3373f4df2a79c87e4f",
		"creationDate": "Thu Sep 28 1995 23:08:00 GMT+0100 (hora estándar de Europa central)",
		"title": "Small Wooden Computer",
		"description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
		"statusID": "4",
		"status": "blocked"
	},
	{
		"userId": "60ee26f1-fa64-47d3-b4ba-a9d9a7f8e80d",
		"objectId": "66fc7b3373f4df2a79c87e50",
		"creationDate": "Sat Dec 22 1984 06:09:53 GMT+0100 (hora estándar de Europa central)",
		"title": "Oriental Bronze Cheese",
		"description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
		"statusID": "3",
		"status": "inProgres"
	},
	{
		"userId": "bbd4849c-0a39-4f48-9879-c419bc767b31",
		"objectId": "66fc7b3373f4df2a79c87e51",
		"creationDate": "Sat Jun 17 1995 21:51:53 GMT+0200 (hora de verano de Europa central)",
		"title": "Recycled Bronze Ball",
		"description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
		"statusID": "2",
		"status": "blocked"
	},
	{
		"userId": "840c926b-f7a5-4cd8-b6b4-4bb1136aafc0",
		"objectId": "66fc7b3373f4df2a79c87e52",
		"creationDate": "Sat Sep 23 2000 20:42:22 GMT+0200 (hora de verano de Europa central)",
		"title": "Ergonomic Frozen Pizza",
		"description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
		"statusID": "1",
		"status": "done"
	},
	{
		"userId": "b97a19b9-9534-4b0e-b780-8227de149e73",
		"objectId": "66fc7b3373f4df2a79c87e53",
		"creationDate": "Sat May 12 1979 14:51:35 GMT+0200 (hora de verano de Europa central)",
		"title": "Intelligent Metal Bacon",
		"description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
		"statusID": "1",
		"status": "toDo"
	},
	{
		"userId": "35c87ecf-2b45-4500-81ef-3bcfa915f515",
		"objectId": "66fc7b3373f4df2a79c87e54",
		"creationDate": "Thu May 14 1992 14:53:55 GMT+0200 (hora de verano de Europa central)",
		"title": "Unbranded Fresh Tuna",
		"description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
		"statusID": "4",
		"status": "inProgres"
	}
];
</script>

<style scoped>
#container {
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
}
</style>
