<template>
  <div class="login-page d-flex align-items-center min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <!-- col-lg-6으로 변경하여 큰 화면에서 너비를 유연하게 확장 -->
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card border-0 shadow login-card">
            <div class="card-body p-4 p-md-5">
              <h2 class="text-center fw-bold mb-5 login-title">로그인</h2>

              <form @submit.prevent="$emit('submit')">
                <div class="mb-4">
                  <label class="form-label fw-semibold">이메일</label>
                  <input
                    class="form-control form-control-lg login-input"
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
                    class="form-control form-control-lg login-input"
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
                  <button
                    type="submit"
                    class="btn btn-lg login-btn"
                    :disabled="store.isLoading"
                  >
                    {{ store.isLoading ? '로그인 중...' : '로그인' }}
                  </button>

                  <RouterLink
                    class="btn btn-lg btn-outline-secondary signup-btn"
                    :to="{ name: 'signup' }"
                  >
                    회원가입
                  </RouterLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
.login-page {
  background: linear-gradient(135deg, #e0f2f7 0%, #f7e0e7 100%);
}

/* login-card-wrapper 클래스는 이제 필요 없습니다. */
/* .login-card-wrapper {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
} */

.login-card {
  border-radius: 1.25rem;
  background-color: #ffffff;
}

.login-title {
  color: var(--kb-gray);
}

.login-input {
  border-radius: 0.9rem;
  border: 1px solid #dee2e6;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.login-input:focus {
  border-color: var(--kb-yellow);
  box-shadow: 0 0 0 0.2rem rgba(255, 188, 0, 0.2);
}

.login-btn {
  background-color: var(--kb-yellow);
  color: var(--kb-gray);
  font-weight: 700;
  border: none;
  border-radius: 0.9rem;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.login-btn:hover {
  background-color: var(--kb-yellow-hover);
  color: var(--kb-gray);
}

.login-btn:disabled {
  background-color: #e9d9a0;
  color: #6c757d;
}

.signup-btn {
  border-radius: 0.9rem;
  font-weight: 600;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.signup-btn:hover {
  background-color: var(--kb-gray);
  border-color: var(--kb-gray);
  color: #fff;
}
</style>
