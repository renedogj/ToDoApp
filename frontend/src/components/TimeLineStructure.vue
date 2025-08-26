<template>
	<div class="timeline-wrap">
		<aside class="sidebar">
			<h3>Carriles</h3>
			<div class="lane-item" v-for="lane in tasks" :key="lane.id">
				<div class="lane-dot" :style="{ background: lane.color }"></div>
				<div>
					<div style="font-weight:600">{{ lane.title }}</div>
					<!-- <div style="font-size:12px; color:var(--muted)">{{ lane.description }}</div> -->
				</div>
			</div>
		</aside>

		<InfiniteTimeline ref="timelineRef" :lanes="tasks" />
	</div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import InfiniteTimeline from '@/components/Timeline.vue'
// import seed from './data/tasks.json'

// const seed = {
// 	"lanes": [
// 		{
// 			"id": "lane-1",
// 			"name": "Lane 1",
// 			"tasks": [
// 				{ "id": "task-1", "title": "Tarea 1", "startDate": "2025-08-20", "endDate": "2025-08-23" },
// 				{ "id": "task-2", "title": "Tarea 2", "startDate": "2025-08-25", "endDate": "2025-08-28" },
// 			]
// 		},
// 		{
// 			"id": "lane-2",
// 			"name": "Lane 2",
// 			"tasks": [
// 				{ "id": "task-3", "title": "Tarea 3", "startDate": "2025-08-21", "endDate": "2025-08-24" },
// 				{ "id": "task-4", "title": "Tarea 2", "startDate": "2025-08-16", "endDate": "2025-08-20" }
// 			]
// 		}
// 	]
// }

const props = defineProps({
    // lanes: { type: Array, required: true },
    tasks: { type: Array, required: true }
})

// const lanes = seed.lanes
const timelineRef = ref(null)

onMounted(() => {
	// Posicionar al día de hoy al iniciar
	// setTimeout(scrollToToday, 0)
	timelineRef.value?.scrollToToday()

	// startAnchor.value = startOfDay(addDays(today, -180));
	// console.log(startAnchor)
	// endAnchor.value = startOfDay(addDays(today, +180));
})

function scrollToToday() {
	timelineRef.value?.scrollToToday()
}

defineExpose({ scrollToToday })
</script>