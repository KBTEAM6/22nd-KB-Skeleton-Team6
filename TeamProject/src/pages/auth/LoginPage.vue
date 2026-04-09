<template>
  <AuthPage title="로그인">
    <Login v-model:email="email" v-model:password="password" :store="store" @submit="submitLogin" />
  </AuthPage>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import AuthPage from '../../components/auth/AuthPage.vue';
import Login from '../../components/auth/Login.vue';

const store = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

const email = ref('minsu@test.com');
const password = ref('1234');

const submitLogin = async () => {
  const result = await store.login({
    email: email.value,
    password: password.value,
  });

  if (result.success) {
    uiStore.showToast('로그인에 성공했습니다.');
    router.push({ name: 'home' });
  }
};
</script>
