<template>
  <div class="list-item" :class="{ 'no-border': isLast }">
    <span v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isLast?: boolean
}>()
</script>

<style scoped>
.list-item {
  padding: 1rem 0.8rem;
  display: flex;
  gap: 1rem;
  align-items: center;

}

.list-item.no-border {
  border-bottom: none;
}
</style>
