<template>
  <Login
    v-model:email="email"
    v-model:password="password"
    :store="store"
    @submit="submitLogin"
  />
</template>

<script setup>
// 반응형 데이터를 위해 ref 다운로드
import { ref } from 'vue';
// router 기능을 위해
import { useRouter } from 'vue-router';
// 로컬 저장소에서 authStore에 들어있는 데이터 가져오기위해
import { useAuthStore } from '@/stores/auth';
// UI 컴포넌트 가져오려고
import Login from '../../components/auth/Login.vue';

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
