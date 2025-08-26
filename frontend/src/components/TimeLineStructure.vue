<template>
	<div class="timeline-wrap">
		<aside class="sidebar">
			<h3>Carriles</h3>
			<div class="lane-item" v-for="lane in lanes" :key="lane.id">
				<div class="lane-dot" :style="{ background: lane.color }"></div>
				<div>
					<div style="font-weight:600">{{ lane.name }}</div>
					<div style="font-size:12px; color:var(--muted)">{{ lane.description }}</div>
				</div>
			</div>
		</aside>

		<InfiniteTimeline ref="timelineRef" :lanes="lanes" v-model:tasks="tasks" />
	</div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import InfiniteTimeline from '@/components/Timeline.vue'
// import seed from './data/tasks.json'

const seed = {
	"lanes": [
		{ "id": 1, "name": "Backend", "description": "API, DB, servicios", "color": "#22c55e" },
		{ "id": 2, "name": "Frontend", "description": "UI, componentes", "color": "#3b82f6" },
		{ "id": 3, "name": "QA", "description": "Pruebas & QA", "color": "#eab308" }
	],
	"tasks": [
		{ "id": "T-101", "title": "Diseño de esquema", "lane": 1, "start": "2025-08-10", "end": "2025-08-14", "color": 1 },
		{ "id": "T-102", "title": "Endpoints v1", "lane": 1, "start": "2025-08-15", "end": "2025-08-20", "color": 1 },
		{ "id": "T-201", "title": "Maquetación home", "lane": 2, "start": "2025-08-12", "end": "2025-08-18", "color": 2 },
		{ "id": "T-202", "title": "Componentes base", "lane": 2, "start": "2025-08-19", "end": "2025-08-25", "color": 2 },
		{ "id": "T-301", "title": "Plan de pruebas", "lane": 3, "start": "2025-08-21", "end": "2025-08-24", "color": 3 }
	]
}

const tasks = ref(seed.tasks)
const lanes = seed.lanes
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