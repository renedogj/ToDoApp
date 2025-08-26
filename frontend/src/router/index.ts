// import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import TimeLinePage from '../components/TimeLineStructure.vue'
// import TabBar from '../components/TabBar.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/:board?',
		name: 'HomePage',
		component: HomePage
	},
	// {
	// 	path: '/HomePage',
	// 	name: 'HomePage',
	// 	component: HomePage
	// },
	// {
	// 	path: '/timeLinePage',
	// 	name: 'TimeLinePage',
	// 	component: TimeLinePage
	// },
	// {
	// 	path: '/:board',
	// 	component: TabBar,
	// 	children: [
	// 	{
	// 		path: '',
	// 		name: 'HomePage',
	// 		component: HomePage
	// 	},
	// 	{
	// 		path: 'home',
	// 		component: () => import('../views/HomePage.vue'),
	// 	},
	// 	{
	// 		path: 'radio',
	// 		component: () => import('../views/TimeLinePage.vue'),
	// 	},
	// 	{
	// 		path: 'library',
	// 		component: () => import('../views/HomePage.vue'),
	// 	},
	// 	{
	// 		path: 'search',
	// 		component: () => import('../views/HomePage.vue'),
	// 	},
	// 	],
	// },
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router;
