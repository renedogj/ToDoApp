<template>

  <div ref="scroller" class="scroller" @scroll="handleScroll">

    <!-- Cabecera con los días -->
    <div class="timeline-header" :style="{ width: contentWidth + 'px' }">
      <div v-for="d in days" :key="d.key" class="day" :class="{ today: isSameDay(d.date, today) }">
        <div>{{ d.labelTop }}</div>
        <div style="font-weight:700">{{ d.labelBottom }}</div>
      </div>
    </div>

    <!-- <aside class="sidebar">
      <h3>Carriles</h3>
      <div class="lane-item" v-for="task in tasks" :key="task._id">
        <div class="lane-dot" :style="{ background: task.color }"></div>
        <div>
          <div style="font-weight:600">{{ task.title }}</div>
        </div>
      </div>
    </aside> -->

    <!-- Capa con filas de grid -->
    <div class="grid" :style="{ width: contentWidth + 'px', height: tasks.length * taskH + 'px', marginTop: '0px' }">
      <div v-for="task in tasks" :key="task.id" class="grid-row"></div>

      <!-- Línea de hoy -->F
      <div class="today-line" :style="todayLineStyle"></div>

      <!-- Capa de tareas -->
      <div class="subTasks-layer" :style="{ height: tasks.length * taskH + 'px' }">
        <div v-for="(task, index) in tasks" :key="task.id">
          <!-- {{ task }} -->
          <div v-for="subTask in task.subTasks" :key="subTask._id" class="task" :data-color="(subTask.color || 1)"
            :class="{ dragging: dragging && dragging.id === subTask._id }" :style="subTaskStyle(subTask, index)"
            @pointerdown.prevent="startDrag(subTask, $event)">
            <div class="title">{{ subTask.title }}</div>
            <!-- <div class="dates">{{ shortDate(subTask.startDate) }} → {{ shortDate(subTask.endDate) }}</div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- leyenda -->
    <!-- <div class="legend">Arrastra una tarea para cambiar su fecha. Se ajusta por días.</div> -->
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'


const props = defineProps({
  tasks: { type: Array, required: true },
  // subTasks: { type: Array, required: true }
})
const emit = defineEmits(['update:subTasks'])


// Constantes de layout
const pxPerDay = 40 // debe coincidir con --px-day
const taskH = 48
const numDaysOnAnchor = 100
const scrollDebounceTime = 150;

// Estado de días "infinitos"
const days = ref([])
const today = new Date()
const startAnchor = ref(startOfDay(addDays(today, -numDaysOnAnchor)))
const endAnchor = ref(startOfDay(addDays(today, +numDaysOnAnchor)))

const scroller = ref(null)
const initialCentered = ref(false)
const scrollTimeout = ref(null);
const isScrolling = ref(false);

const centerDate = ref(today);

function makeDay(date) {
  const dateObject = new Date(date)
  const key = dateObject.toISOString().slice(0, 10)
  const day = dateObject.getDate().toString().padStart(2, '0')
  const month = dateObject.toLocaleString('es-ES', { month: 'short' })
  const labelTop = dateObject.toLocaleString('es-ES', { weekday: 'short' })
  const labelBottom = `${day} ${month}`
  return { date: dateObject, key, labelTop, labelBottom }
}

function rebuildDays() {
  const out = []
  let d = new Date(startAnchor.value)
  while (d <= endAnchor.value) {
    out.push(makeDay(d))
    d = addDays(d, 1)
  }
  days.value = out
}

rebuildDays()

const contentWidth = computed(() => days.value.length * pxPerDay)

// Línea de hoy
const todayLineStyle = computed(() => {
  const offsetDays = diffInDays(startAnchor.value, today)
  const left = offsetDays * pxPerDay
  return { left: left + 'px' }
})

// Helpers de fecha
function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x }
function diffInDays(a, b) {
  const ms = startOfDay(b) - startOfDay(a)
  return Math.round(ms / 86400000)
}
function isSameDay(a, b) { return startOfDay(a).getTime() === startOfDay(b).getTime() }
function shortDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
}

// Posicionamiento de tareas
function subTaskStyle(subTask, taskIndex) {
  // console.log(subTask)
  // const taskIndex = Math.max(0, props.tasks.findIndex(l => l.id === subTask.task))
  const baseOffset = diffInDays(startAnchor.value, new Date(subTask.startDate))
  const previewOffset = baseOffset + (subTask._dragOffsetDays || 0)
  const duration = Math.max(1, diffInDays(new Date(subTask.startDate), new Date(subTask.endDate)))
  console.log(duration)
  const left = previewOffset * pxPerDay
  const width = duration * pxPerDay
  const top = taskIndex * taskH
  console.log({ left: left + 'px', width: width + 'px', top: top + 'px' })
  return { left: left + 'px', width: width + 'px', top: top + 'px' }
}

// Drag & drop manual (pixel → días, con auto-extensión del calendario)
const dragging = ref(null) // { id, startX, originStart, originEnd }

function startDrag(subTask, event) {
  dragging.value = {
    id: subTask._id,
    startX: event.clientX,
    originStart: new Date(subTask.startDate),
    originEnd: new Date(subTask.endDate)
  }
  window.addEventListener('pointermove', onDrag)
  window.addEventListener('pointerup', onDrop)
}

function onDrag(event) {
  if (!dragging.value) return
  const dx = event.clientX - dragging.value.startX
  const deltaDays = Math.round(dx / pxPerDay)


  const subTask = props.tasks.map(task => task.subTasks.find(x => x.id === dragging.value.id))
  if (!subTask) return


  // Vista previa (clase .dragging) + expansión si nos salimos
  const previewStart = addDays(dragging.value.originStart, deltaDays)
  const previewEnd = addDays(dragging.value.originEnd, deltaDays)


  // Expandir calendario si el arrastre se aproxima a los límites
  if (previewStart < startAnchor.value) {
    startAnchor.value = addDays(startAnchor.value, -120)
    rebuildDays()
  }
  if (previewEnd > endAnchor.value) {
    endAnchor.value = addDays(endAnchor.value, +120)
    rebuildDays()
  }


  // Aplicamos estilo "dragging" mediante efectos reactivos
  subTask._dragOffsetDays = deltaDays
}

function onDrop() {
  if (!dragging.value) return
  const id = dragging.value.id
  const subTask = props.tasks.map(task => task.subTasks.find(x => x._id === id))
  if (subTask) {
    const delta = Math.round((subTask._dragOffsetDays || 0))
    const newStart = addDays(new Date(subTask.startDate), delta)
    const newEnd = addDays(new Date(subTask.endDate), delta)
    subTask.startDate = toISO(newStart)
    subTask.endDate = toISO(newEnd)
    delete subTask._dragOffsetDays


    // Emitir cambio a padre
    emit('update:subTasks', [...props.tasks.map(task => task.subTasks)])
  }
  dragging.value = null
  window.removeEventListener('pointermove', onDrag)
  window.removeEventListener('pointerup', onDrop)
}

function toISO(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  const iso = new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString()
  return iso.slice(0, 10)
}


// Forzar re-render de estilo durante drag (clase .dragging)
// watch(() => props.subTasks.map(subTask => subTask._dragOffsetDays), () => { }, { deep: true })
// watch(
//     () => props.tasks.map(task => task.subTasks.map(subTask => subTask._dragOffsetDays)),
//     () => {
//         // Aquí puedes actualizar posiciones o sincronizar UI cuando cambien los offsets
//     },
//     { deep: true }
// )

// Calcular día central basado en la posición del scroll
function calculateCenterDate() {
  const el = scroller.value;
  if (!el) return today;

  const centerPx = el.scrollLeft + (el.clientWidth / 2);
  const dayIndex = Math.floor(centerPx / pxPerDay);
  return addDays(startAnchor.value, dayIndex);
}

// Centrar el scroll en un día específico
function centerOnDay(targetDate, smooth = true) {
  const el = scroller.value;
  if (!el) return;

  const offsetDays = diffInDays(startAnchor.value, targetDate);
  const targetScroll = offsetDays * pxPerDay - (el.clientWidth / 2) + (pxPerDay / 2);

  if (smooth) {
    el.scrollTo({ left: targetScroll, behavior: 'smooth' });
  } else {
    el.scrollLeft = targetScroll;
  }

  centerDate.value = targetDate;
}

function centerTodayOnce() {
  const el = scroller.value;
  if (!el) return;

  const offsetDays = diffInDays(startAnchor.value, today);
  const targetScroll = offsetDays * pxPerDay - (el.clientWidth / 2) + (pxPerDay / 2);

  el.scrollLeft = targetScroll;

  centerDate.value = today;
}

// Manejo del scroll con debouncing
function handleScroll() {
  isScrolling.value = true;

  // Actualizar fecha central en tiempo real
  centerDate.value = calculateCenterDate();

  // Limpiar timeout anterior
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }

  // Establecer nuevo timeout para centrar al finalizar scroll
  scrollTimeout.value = setTimeout(() => {
    isScrolling.value = false;
    const currentCenter = calculateCenterDate();
    centerOnDay(currentCenter, true);

    adjustCalendarRange()
  }, scrollDebounceTime);
}

function adjustCalendarRange() {
  const el = scroller.value;
  if (!el) return;

  const scrollLeft = el.scrollLeft;
  const clientWidth = el.clientWidth;
  const scrollWidth = el.scrollWidth;
  const threshold = 500;

  // Si estamos cerca del borde izquierdo
  if (scrollLeft < threshold) {
    const daysToMove = Math.ceil((threshold - scrollLeft) / pxPerDay);

    startAnchor.value = addDays(startAnchor.value, -daysToMove);
    endAnchor.value = addDays(endAnchor.value, -daysToMove);
    rebuildDays();

    el.scrollLeft = scrollLeft + (daysToMove * pxPerDay);
  }

  // Si estamos cerca del borde derecho
  if (scrollWidth - (scrollLeft + clientWidth) < threshold) {
    const daysToMove = Math.ceil((threshold - (scrollWidth - (scrollLeft + clientWidth))) / pxPerDay);

    startAnchor.value = addDays(startAnchor.value, daysToMove);
    endAnchor.value = addDays(endAnchor.value, daysToMove);
    rebuildDays();

    el.scrollLeft = scrollLeft - (daysToMove * pxPerDay);
  }
}

function scrollToToday() {
  centerOnDay(today, true);
}

onBeforeUnmount(() => {
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
  window.removeEventListener('pointermove', onDrag);
  window.removeEventListener('pointerup', onDrop);
});

onMounted(() => {
  setTimeout(() => {
    centerTodayOnce();
    initialCentered.value = true;
  }, 0);
});

defineExpose({ scrollToToday })
</script>