<template>
  <transition name="toast-fade">
    <div
      v-if="uiStore.hasToast"
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 9999"
    >
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body">
          {{ uiStore.toastMessage }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useUiStore } from '@/stores/ui';
import { watch } from 'vue';

const uiStore = useUiStore();

// 토스트가 표시되면 3초 후 자동으로 사라지게 함
watch(
  () => uiStore.hasToast,
  (hasToast) => {
    if (hasToast) {
      setTimeout(() => {
        uiStore.clearToast();
      }, 3000); // 3초 후 사라짐
    }
  },
);
</script>

<style scoped>
.toast-container {
  max-width: 350px;
}

.toast {
  background-color: var(--kb-yellow);
  color: var(--kb-gray);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.toast-body {
  font-weight: 500;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

.toast-fade-enter-to,
.toast-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
