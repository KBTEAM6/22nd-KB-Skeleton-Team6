<template>
  <form @submit.prevent="$emit('submit')">
    <div class="mb-4">
      <label class="form-label fw-semibold">이메일</label>
      <input
        class="form-control form-control-lg auth-input"
        type="email"
        :value="email"
        @input="$emit('update:email', $event.target.value)"
        placeholder="이메일을 입력하세요"
        required
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold">비밀번호</label>
      <input
        class="form-control form-control-lg auth-input"
        type="password"
        :value="password"
        @input="$emit('update:password', $event.target.value)"
        placeholder="비밀번호를 입력하세요"
        required
      />
    </div>

    <div v-if="store.errorMessage" class="text-danger small mb-4">
      {{ store.errorMessage }}
    </div>

    <div class="d-grid gap-3 mt-4">
      <button type="submit" class="btn btn-lg auth-btn" :disabled="store.isLoading">
        {{ store.isLoading ? '로그인 중...' : '로그인' }}
      </button>

      <RouterLink class="btn btn-lg btn-outline-secondary auth-link-btn" :to="{ name: 'signup' }">
        회원가입
      </RouterLink>
    </div>
  </form>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  email: String,
  password: String,
  store: Object,
});

defineEmits(['update:email', 'update:password', 'submit']);
</script>

<style scoped>
.auth-input {
  border-radius: 0.9rem;
  border: 1px solid #dee2e6;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.auth-input:focus {
  border-color: var(--kb-yellow);
  box-shadow: 0 0 0 0.2rem rgba(255, 188, 0, 0.2);
}

.auth-btn {
  background-color: var(--kb-yellow);
  color: var(--kb-gray);
  font-weight: 700;
  border: none;
  border-radius: 0.9rem;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.auth-btn:hover {
  background-color: var(--kb-yellow-hover);
  color: var(--kb-gray);
}

.auth-btn:disabled {
  background-color: #e9d9a0;
  color: #6c757d;
}

.auth-link-btn {
  border-radius: 0.9rem;
  font-weight: 600;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.auth-link-btn:hover {
  background-color: var(--kb-gray);
  border-color: var(--kb-gray);
  color: #fff;
}
</style>
