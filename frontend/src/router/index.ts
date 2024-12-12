import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import TabBar from '../components/TabBar.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/homePage'
	},
	{
		path: '/homePage',
		name: 'HomePage',
		component: HomePage
	},
	{
		path: '/',
		component: TabBar,
		children: [
		{
			path: '',
			redirect: '/home',
		},
		{
			path: 'home',
			component: () => import('../views/HomePage.vue'),
		},
		{
			path: 'radio',
			component: () => import('../views/RadioPage.vue'),
		},
		{
			path: 'library',
			component: () => import('../views/HomePage.vue'),
		},
		{
			path: 'search',
			component: () => import('../views/HomePage.vue'),
		},
		],
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router;
