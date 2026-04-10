<template>
  <div
    v-if="uiStore.hasToast"
    class="toast-container position-fixed top-0 end-0 p-3"
  >
    <!--
      토스트를 배열로 순회해서 스택형으로 렌더링
      visible 값에 따라 보여짐 / 사라짐 상태를 나눔
    -->
    <div
      v-for="toast in uiStore.toasts"
      :key="toast.id"
      class="toast-box"
      :class="toast.visible ? 'toast-show' : 'toast-hide'"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();
</script>

<style scoped>
/* 토스트 전체 컨테이너 */
.toast-container {
  z-index: 9999;
  width: min(22rem, calc(100vw - 1.5rem));
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

/* 토스트 하나의 기본 스타일 */
.toast-box {
  padding: 0.9rem 1rem;
  background-color: var(--kb-yellow);
  color: var(--kb-gray);
  border-radius: 0.9rem;
  box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.14);
  font-weight: 600;
  line-height: 1.4;
  word-break: keep-all;
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

/* 화면에 보이는 상태 */
.toast-show {
  opacity: 1;
  transform: translateY(0);
}

/* 사라지는 상태
   바로 제거하지 않고 자기 자리에서 서서히 사라지게 함 */
.toast-hide {
  opacity: 0;
  transform: translateY(-6px);
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .toast-container {
    width: min(20rem, calc(100vw - 1rem));
    padding: 0.75rem;
  }

  .toast-box {
    padding: 0.8rem 0.9rem;
    font-size: 0.92rem;
  }
}
</style>
