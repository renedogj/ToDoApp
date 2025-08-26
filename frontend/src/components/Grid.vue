<template>
	<!-- Vista en grid -->
	<div class="grid">
		<div v-for="item in items" :key="item._id" class="grid-item">
			<slot :item="item" :isLast="index === items.length - 1">
				{{ item }}
			</slot>
		</div>
		
    <slot v-if="!items.length"></slot>
	</div>
</template>

<script>

export default {
	name: "Grid",
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		minWidth: {
			type: Number,
			default: 0,
		},
	},

}
</script>


<style scoped>
/* Grid */
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 15px;
}

.grid-item {
	/* background: #fff; */
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 8px;
}
</style>
