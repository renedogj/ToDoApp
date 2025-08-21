<template>
  <ion-app>
	<ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import { defineComponent } from 'vue';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7V74y3IV3BVNw7YU5w01f5PI2flAM1uI",
  authDomain: "todoapp-701ac.firebaseapp.com",
  databaseURL: "https://todoapp-701ac-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoapp-701ac",
  storageBucket: "todoapp-701ac.firebasestorage.app",
  messagingSenderId: "489140752200",
  appId: "1:489140752200:web:55becf805b440a2b9f6d7d",
  measurementId: "G-E2CZ7J3V17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default defineComponent({
  name: 'App',
  components: { IonApp, IonRouterOutlet },
});

</script>
