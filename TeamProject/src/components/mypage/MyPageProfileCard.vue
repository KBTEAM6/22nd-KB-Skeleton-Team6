<template>
  <!--
    마이페이지 왼쪽 카드 영역
    현재 로그인 사용자 요약 정보만 보여주는 순수 표시 컴포넌트다.
  -->
  <div
    class="d-flex flex-column align-items-center p-4 h-100 profile-card"
    style="border-radius: 2rem"
  >
    <div
      class="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center mb-4 profile-badge"
    >
      <span class="display-5 fw-bold text-secondary">{{ userInitial }}</span>
    </div>

    <div class="text-center">
      <h3 class="fs-3 fw-bold mb-1">{{ displayName }}</h3>
      <p class="small profile-subtext m-0">회원 ID: {{ user?.id ?? "N/A" }}</p>
    </div>

    <div class="mt-4 d-flex flex-wrap justify-content-center gap-2">
      <span class="member-badge px-3 py-1 small fw-bold rounded-pill">
        일반 회원
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 부모(MyPageContent)에서 현재 로그인 사용자 정보를 그대로 내려준다.
  user: {
    type: Object,
    default: () => ({}),
  },
});

// 이름이 없을 경우를 대비해 fallback을 둔다.
const displayName = computed(
  () => props.user?.name || props.user?.nickname || "사용자",
);

// 프로필 뱃지에 표시할 첫 글자
const userInitial = computed(() => displayName.value.charAt(0).toUpperCase());
</script>

<style scoped>
.profile-card {
  min-width: 220px;
}
.profile-badge {
  width: clamp(5.5rem, 11vw, 8rem);
  height: clamp(5.5rem, 11vw, 8rem);
}

.profile-action-links {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.9rem;
}

.profile-text-action {
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

.profile-text-action:hover {
  opacity: 0.75;
}

.profile-text-action-primary {
  color: #0d6efd;
}

.profile-text-action-danger {
  color: #dc3545;
}
.profile-card {
  min-width: 220px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.profile-subtext {
  color: var(--text-muted);
}

.member-badge {
  background: var(--sub-bg);
  color: var(--text-color);
  border: 1px solid var(--border-light);
}
</style>
