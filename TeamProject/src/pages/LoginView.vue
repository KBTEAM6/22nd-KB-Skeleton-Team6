<template>
  <section class="auth-card card-box">
    <h2 class="page-title">로그인</h2>
    <form class="auth-form" @submit.prevent="submitLogin">
      <label>이메일 <input v-model="email" type="email" required /></label>
      <label>비밀번호 <input v-model="password" type="password" required /></label>
      <small v-if="errorMessage" class="expense">{{ errorMessage }}</small>
      <button class="btn btn-dark">로그인</button>
      <RouterLink class="btn btn-outline-dark" :to="{ name: 'signup' }">회원가입</RouterLink>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const store = useAuthStore();
const router = useRouter();
const email = ref('seungyeon@example.com');
const password = ref('1234');
const errorMessage = ref('');

const submitLogin = async () => {
  errorMessage.value = '';
  try {
    await store.login(email.value, password.value);
    router.push({ name: 'home' });
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '로그인에 실패했습니다.';
  }
};
</script>
