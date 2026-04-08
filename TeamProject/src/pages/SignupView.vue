<template>
  <section class="auth-card card-box">
    <h2 class="page-title">회원가입</h2>
    <form class="auth-form" @submit.prevent="submitSignup">
      <label>이름 <input v-model="name" required /></label>
      <label>이메일 <input v-model="email" type="email" required /></label>
      <label>비밀번호 <input v-model="password" type="password" required minlength="4" /></label>
      <small v-if="errorMessage" class="expense">{{ errorMessage }}</small>
      <button class="btn btn-dark">회원가입</button>
      <RouterLink class="btn btn-outline-dark" :to="{ name: 'login' }">로그인으로</RouterLink>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const store = useAuthStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const submitSignup = async () => {
  errorMessage.value = '';
  try {
    await store.signup({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    router.push({ name: 'home' });
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
  }
};
</script>
