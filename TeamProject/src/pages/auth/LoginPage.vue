<template>
  <!--
    Login 컴포넌트는 입력 UI만 담당하고,
    실제 로그인 로직은 이 페이지의 submitLogin 함수가 담당한다.
  -->
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

// 인증 상태와 사용자 피드백(토스트)을 각각 store에서 관리한다.
const store = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

// 로그인 폼 입력값
const email = ref('minsu@test.com');
const password = ref('1234');

/**
 * 로그인 제출 처리
 *
 * 흐름:
 * 1. 화면 입력값을 auth store.login으로 전달
 * 2. store에서 서버 검증 + 세션 저장 수행
 * 3. 성공하면 토스트를 띄우고 home으로 이동
 */
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
