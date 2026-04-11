<template>
  <AuthPage
    title="회원가입"
    :aside-image="currentAsideImage"
    :aside-alt="currentAsideAlt"
    :aside-text="currentAsideText"
  >
    <template #header>
      <div class="signup-brand">
        <div class="logo-box">
          <img :src="logoImage" alt="KB 가계부 로고" class="sidebar-logo" />
        </div>
      </div>
    </template>

    <DelayModal
      :is-open="store.isLoading"
      type="loading"
      message="회원가입을 준비 중이에요..."
      :size="1000"
    />

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
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import AuthPage from '../../components/auth/AuthPage.vue';
import Signup from '../../components/auth/Signup.vue';
import DelayModal from '../../components/common/DelayModal.vue';
import happyCharacter from '@/assets/happy-character.png';
import errorCharacter from '@/assets/error-character.png';
import logoImage from '@/assets/Logo.png';

const DEFAULT_ASIDE_TEXT = '가계쀼와 함께 새 가계부를 시작해요';

const store = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');

const currentAsideImage = computed(() =>
  store.errorMessage ? errorCharacter : happyCharacter,
);

const currentAsideAlt = computed(() =>
  store.errorMessage ? 'Signup error character' : 'Happy character',
);

const currentAsideText = computed(() => store.errorMessage || DEFAULT_ASIDE_TEXT);

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
  store.clearError();
});
</script>

<style scoped>
.signup-brand {
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
