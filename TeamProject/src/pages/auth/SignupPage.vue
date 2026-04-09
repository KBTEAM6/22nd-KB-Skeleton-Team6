<template>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import AuthPage from '../../components/auth/AuthPage.vue';
import Signup from '../../components/auth/Signup.vue';

const store = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');

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
    uiStore.showToast('회원가입이 완료되었습니다.');
    router.push({ name: 'mypage' });
  }
};
</script>
