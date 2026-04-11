<template>
  <!--
    Login 컴포넌트는 입력 UI만 담당하고,
    실제 로그인 로직은 이 페이지의 submitLogin 함수가 담당한다.
  -->
  <AuthPage title="로그인">
    <Login
      v-model:email="email"
      v-model:password="password"
      v-model:rememberEmail="rememberEmail"
      :store="authStore"
      @submit="submitLogin"
    />
  </AuthPage>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import AuthPage from '../../components/auth/AuthPage.vue';
import Login from '../../components/auth/Login.vue';

const REMEMBERED_EMAIL_KEY = 'rememberedEmail';

// 인증 상태와 사용자 피드백(토스트)을 각각 store에서 관리한다.
const authStore = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

// 로그인 폼 입력값
const email = ref('');
const password = ref('');
<<<<<<< HEAD
const rememberEmail = ref(false);

// onMounted에서 localStorage에 저장된 이메일이 있으면 불러와서 입력값과 rememberEmail 상태를 초기화한다.
onMounted(() => {
  const savedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
  if (savedEmail) {
    email.value = savedEmail;
    rememberEmail.value = true;
  }
});

const syncRememberEmail = () => {
  if (rememberEmail.value) {
    localStorage.setItem(REMEMBERED_EMAIL_KEY, email.value);
    return;
  }

  localStorage.removeItem(REMEMBERED_EMAIL_KEY);
};
=======
>>>>>>> 74e89f2 (fix: 회원가입이후 라우팅 오류 + 개발을위한 mock Data 삭제 + errorMessage 관련 이슈 수정)

/**
 * 로그인 제출 처리
 *
 * 흐름:
 * 1. 화면 입력값을 authStore.login으로 전달
 * 2. store에서 서버 검증 + 세션 저장 수행
 * 3. 성공하면 토스트를 띄우고 home으로 이동
 */
const submitLogin = async () => {
  const result = await authStore.login({
    email: email.value,
    password: password.value,
  });

  if (result.success) {
    syncRememberEmail();
    uiStore.showToast('로그인에 성공했습니다.');
    router.push({ name: 'home' });
  } else {
    uiStore.showToast(result.message || '로그인에 실패했습니다.', 'error');
  }
};

onMounted(() => {
  // 로그인 페이지 진입 시 기존 에러 메시지 초기화
  store.clearError();
});
</script>
