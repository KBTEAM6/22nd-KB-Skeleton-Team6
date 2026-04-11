<template>
  <!--
    Signup 컴포넌트는 입력 UI만 담당하고,
    실제 회원가입/검증/이동 흐름은 이 페이지에서 제어한다.
  -->
  <AuthPage title="회원가입">
    <Signup
      v-model:name="name"
      v-model:phone="phone"
      v-model:email="email"
      v-model:password="password"
      v-model:confirmPassword="confirmPassword"
      :store="store"
      @submit="submitSignup"
    />
  </AuthPage>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import AuthPage from '../../components/auth/AuthPage.vue';
import Signup from '../../components/auth/Signup.vue';

const store = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

// 회원가입 폼 입력값
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');

/**
 * 회원가입 제출 처리
 *
 * 페이지 단계에서 먼저 기본 검증을 처리한다.
 * - 비밀번호 일치 여부
 * - 최소 길이
 *
 * 검증 통과 후 store.signup을 호출하면,
 * 실제 서버 저장과 로그인 상태 반영은 store가 담당한다.
 */
const submitSignup = async () => {
  store.clearError();

  if (password.value !== confirmPassword.value) {
    store.errorMessage = '비밀번호가 일치하지 않습니다.';
    return;
  }

  if (password.value.length < 4) {
    store.errorMessage = '비밀번호는 최소 4자 이상이어야 합니다.';
    return;
  }

  const result = await store.signup({
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    password: password.value,
  });

  if (result.success) {
    uiStore.showToast('회원가입이 완료되었습니다. 로그인해주세요.');
    router.push({ name: 'login' });
  }
};

onMounted(() => {
  // 회원가입 페이지 진입 시 기존 에러 메시지 초기화
  store.clearError();
});
</script>
