<template>
  <section class="auth-card card-box">
    <h2 class="page-title">로그인</h2>

    <form class="auth-form" @submit.prevent="submitLogin">
      <label>
        이메일
        <input v-model="email" type="email" required />
      </label>

      <label>
        비밀번호
        <input v-model="password" type="password" required />
      </label>

      <small v-if="store.errorMessage" class="expense">
        {{ store.errorMessage }}
      </small>

      <button class="btn btn-dark" :disabled="store.isLoading">
        {{ store.isLoading ? '로그인 중...' : '로그인' }}
      </button>

      <RouterLink class="btn btn-outline-dark" :to="{ name: 'signup' }">
        회원가입
      </RouterLink>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const store = useAuthStore();
const router = useRouter();

const email = ref('seungyeon@example.com');
const password = ref('1234');

const submitLogin = async () => {
  const result = await store.login({
    email: email.value,
    password: password.value,
  });

  if (result.success) {
    router.push({ name: 'home' });
  }
};
</script>
