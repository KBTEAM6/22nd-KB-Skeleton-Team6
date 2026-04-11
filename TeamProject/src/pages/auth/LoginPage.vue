<template>
  <AuthPage
    title="로그인"
    :aside-image="currentAsideImage"
    :aside-alt="currentAsideAlt"
    :aside-text="currentAsideText"
  >
    <template #header>
      <div class="login-brand">
        <div class="logo-box">
          <img :src="logoImage" alt="KB 가계부 로고" class="sidebar-logo" />
        </div>
      </div>
    </template>

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
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import AuthPage from '../../components/auth/AuthPage.vue';
import Login from '../../components/auth/Login.vue';
import happyCharacter from '@/assets/happy-character.png';
import errorCharacter from '@/assets/error-character.png';
import logoImage from '@/assets/Logo.png';

const REMEMBERED_EMAIL_KEY = 'rememberedEmail';
const DEFAULT_ASIDE_TEXT = '가계쀼와 함께 오늘도 가볍게 시작해요';

const authStore = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const rememberEmail = ref(false);

const currentAsideImage = computed(() =>
  authStore.errorMessage ? errorCharacter : happyCharacter,
);

const currentAsideAlt = computed(() =>
  authStore.errorMessage ? 'Login error character' : 'Happy character',
);

const currentAsideText = computed(() => authStore.errorMessage || DEFAULT_ASIDE_TEXT);

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

const submitLogin = async () => {
  const result = await authStore.login({
    email: email.value,
    password: password.value,
  });

  if (result.success) {
    syncRememberEmail();
    uiStore.showToast('로그인에 성공했습니다.');
    router.push({ name: 'home' });
    return;
  }

  uiStore.showToast(result.message || '로그인에 실패했습니다.', 'error');
};

onMounted(() => {
  authStore.clearError();
});
</script>

<style scoped>
.login-brand {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 204, 80, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar-logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
}
</style>
