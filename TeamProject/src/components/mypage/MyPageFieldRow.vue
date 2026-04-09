<template>
  <div
    class="d-flex align-items-center justify-content-between pb-3"
    :class="{ 'border-bottom': bordered }"
  >
    <div class="d-flex align-items-center gap-3 flex-grow-1">
      <div
        class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted detail-icon"
      >
        <span class="material-symbols-outlined">{{ icon }}</span>
      </div>
      <div class="flex-grow-1">
        <p class="small text-muted mb-1 d-block">{{ label }}</p>
        <slot name="value" />
      </div>
    </div>

    <slot name="badge" />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.detail-icon {
  width: 40px;
  height: 40px;
}
</style>
