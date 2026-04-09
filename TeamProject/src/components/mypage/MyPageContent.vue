<template>
  <div class="bg-light min-vh-100 p-4 p-md-5">
    <div class="container-fluid px-0 mx-auto d-flex flex-column gap-4" style="max-width: 80rem">
      <div class="d-flex align-items-center justify-content-between gap-3">
        <div class="text-start">
          <h2 class="fs-4 fw-bold mb-1">마이페이지</h2>
          <p class="text-muted fw-medium m-0">개인 정보와 계정 상태를 확인할 수 있어요.</p>
        </div>
        <button @click="$emit('logout')" class="btn btn-outline-secondary">로그아웃</button>
      </div>

      <div class="row g-4 align-items-start">
        <div class="col-12 col-md-4">
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
        </div>

        <div class="col-12 col-md-8">
          <div class="bg-white p-4 p-lg-5 shadow-sm border h-100" style="border-radius: 2rem">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h4 class="fs-5 fw-bold m-0">상세 정보</h4>
            </div>

            <div class="d-flex flex-column gap-4">
              <div class="d-flex align-items-center justify-content-between pb-3 border-bottom">
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted detail-icon"
                  >
                    <span class="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p class="small text-muted mb-1 d-block">이메일 주소</p>
                    <p class="fw-bold m-0">{{ user?.email || '등록된 이메일이 없습니다.' }}</p>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between pb-3 border-bottom">
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted detail-icon"
                  >
                    <span class="material-symbols-outlined">smartphone</span>
                  </div>
                  <div>
                    <p class="small text-muted mb-1 d-block">전화번호</p>
                    <p class="fw-bold m-0">{{ user?.phone || '등록된 전화번호가 없습니다.' }}</p>
                  </div>
                </div>
                <span
                  class="border rounded px-2 py-1 fw-bold"
                  :class="user?.phone ? 'text-success bg-success bg-opacity-10' : 'text-muted'"
                  style="font-size: 10px"
                >
                  {{ user?.phone ? '확인 완료' : '미등록' }}
                </span>
              </div>

              <div class="d-flex align-items-center justify-content-between pb-3">
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted detail-icon"
                  >
                    <span class="material-symbols-outlined">calendar_month</span>
                  </div>
                  <div>
                    <p class="small text-muted mb-1 d-block">가입일</p>
                    <p class="fw-bold m-0">{{ formattedJoinDate }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-top">
              <div class="btn btn-light w-100 d-flex align-items-center justify-content-between px-4 py-3 rounded-4 border text-start">
                <div class="d-flex align-items-center gap-3 text-dark">
                  <span class="material-symbols-outlined text-secondary">account_circle</span>
                  <span class="small fw-bold m-0">로그인한 계정 정보를 확인 중입니다.</span>
                </div>
                <span class="material-symbols-outlined text-secondary">check_circle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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

const formattedJoinDate = computed(() => {
  if (!props.user?.createdAt) {
    return '가입일 정보가 없습니다.';
  }

  const date = new Date(props.user.createdAt);

  if (Number.isNaN(date.getTime())) {
    return '가입일 정보가 없습니다.';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
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

.profile-badge {
  width: 10rem;
  height: 10rem;
}

.detail-icon {
  width: 40px;
  height: 40px;
}
</style>
