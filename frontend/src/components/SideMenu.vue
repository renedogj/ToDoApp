<template>
	<aside class="sidemenu" :class="{ open: isOpen}">
		<!-- Header -->
		<header class="sidemenu-header">
			<button v-if="!isDesktop" class="icon-button" @click="closeMenu">
				☰
			</button>
			<h2>Menu Content</h2>
		</header>

		<!-- Content -->
		<nav class="sidemenu-content">
			<ul>
				<li v-for="(item, index) in menuItems" :key="index">
					<button class="menu-item">{{ item }}</button>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits<{ (e: 'closeMenu'): void }>();

function closeMenu() {
  emit("closeMenu");
}

const props = defineProps<{
	isOpen?: boolean;
}>();

const menuItems = [
	"Pokémon Yellow",
	"Mega Man X",
	"The Legend of Zelda",
	"Pac-Man",
	"Super Mario World",
];
</script>

<style scoped>
/* Contenedor del menú */
.sidemenu {
	position: fixed;
	top: 0;
	/* left: -260px; */
	left: -240px;
	/* oculto por defecto */
	width: 240px;
	height: 100%;
	/* background: #fff; */
	border-right: 1px solid #ddd;
	/* display: flex; */
	/* flex-direction: column; */
	transition: left 0.3s ease;
	/* z-index: 1000; */
}

/* Cuando está abierto */
.sidemenu.open {
	position: relative;
	left: 0;
}

/* Header */
.sidemenu-header {
	display: flex;
	justify-content: left;
	align-items: center;
	gap: 10px;
	padding: 15px;
	border-bottom: 1px solid #ddd;
	/* background: #f9f9f9; */
}

.sidemenu-header h2 {
	font-size: 1.1rem;
	font-weight: bold;
	margin: 0;
}

.icon-button {
	background: none;
	border: 1px solid #ccc;
	border-radius: 50%;
	padding: 6px 10px;
	cursor: pointer;
	font-size: 1.1rem;
}

.icon-button:hover {
	background: #f0f0f0;
}

/* Content */
.sidemenu-content {
	flex: 1;
	overflow-y: auto;
	padding: 10px;
}

.sidemenu-content ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.menu-item {
	display: block;
	width: 100%;
	text-align: left;
	padding: 10px 12px;
	border: none;
	background: none;
	cursor: pointer;
	font-size: 0.95rem;
	border-radius: 6px;
	transition: background 0.2s;
}

.menu-item:hover {
	background: #f0f0f0;
}

/* Footer */
.sidemenu-footer {
	padding: 12px;
	border-top: 1px solid #ddd;
	text-align: center;
	font-size: 0.9rem;
	color: #666;
	background: #fafafa;
}
</style>