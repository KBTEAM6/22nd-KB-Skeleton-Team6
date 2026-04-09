<template>
  <section class="auth-card card-box">
    <h2 class="page-title">회원가입</h2>

    <form class="auth-form" @submit.prevent="submitSignup">
      <label>
        이름
        <input v-model="name" type="text" required />
      </label>

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
        {{ store.isLoading ? '가입 중...' : '회원가입' }}
      </button>

      <RouterLink class="btn btn-outline-dark" :to="{ name: 'login' }">
        로그인으로
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

const name = ref('');
const email = ref('');
const password = ref('');

const submitSignup = async () => {
  const result = await store.signup({
    name: name.value,
    email: email.value,
    password: password.value,
  });

  if (result.success) {
    router.push({ name: 'home' });
  }
};
</script>
