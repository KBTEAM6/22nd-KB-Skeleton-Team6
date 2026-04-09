<template>
  <div
    class="d-flex flex-column align-items-center bg-white p-4 p-lg-5 shadow-sm border h-100"
    style="border-radius: 2rem"
  >
    <div
      class="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center mb-4 profile-badge"
    >
      <span class="display-5 fw-bold text-secondary">{{ userInitial }}</span>
    </div>

    <div class="text-center">
      <h3 class="fs-4 fw-bold mb-1">{{ displayName }}</h3>
      <p class="small text-muted m-0">회원 ID: {{ user?.id ?? 'N/A' }}</p>
    </div>

    <div class="mt-4 d-flex flex-wrap justify-content-center gap-2">
      <span class="px-3 py-1 bg-secondary bg-opacity-10 text-secondary small fw-bold rounded-pill">
        일반 회원
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

const displayName = computed(() => props.user?.name || props.user?.nickname || '사용자');
const userInitial = computed(() => displayName.value.charAt(0).toUpperCase());
</script>

<style scoped>
.profile-badge {
  width: 10rem;
  height: 10rem;
}
</style>
