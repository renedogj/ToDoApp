<template>
  <div
    class="list"
    :style="{ 'flex-direction': flexDirection }">
    <ListItem 
      v-for="item in items"
      :key="item._id"
      class="list-item"
    >
      <slot :item="item" :isLast="index === items.length - 1">
        {{ item }}
      </slot>
    </ListItem>
    <slot v-if="!items.length"></slot>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue';

export default {
  name: "List",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    minWidth: {
      type: Number,
      default: 0,
    },
    flexDirection: {
      type: String,
      default: "column",
      validator: (value) => ["column", "row"].includes(value),
    },
  },
  // computed: {
  //   minWidthInRem() {
  //     return this.minWidth ? `${this.minWidth / 16}rem` : null
  //   },
  // },
}
</script>


<style scoped>
/* Lista */
.list {
  gap: 10px;
}

.list-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
}
</style>
