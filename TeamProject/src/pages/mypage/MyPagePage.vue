<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import MyPageContent from '@/components/mypage/MyPageContent.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

const isEditing = ref(false);
const form = ref({
  name: '',
  email: '',
  phone: '',
});

const syncForm = () => {
  form.value = {
    name: authStore.user?.name || '',
    email: authStore.user?.email || '',
    phone: authStore.user?.phone || '',
  };
};

onMounted(() => {
  authStore.loadUserFromStorage();

  if (!authStore.user) {
    router.push({ name: 'login' });
    return;
  }

  syncForm();
});

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};

const handleEditStart = () => {
  syncForm();
  authStore.clearError();
  isEditing.value = true;
};

const handleEditCancel = () => {
  syncForm();
  authStore.clearError();
  isEditing.value = false;
};

const handleSave = async () => {
  const trimmedName = form.value.name.trim();
  const trimmedEmail = form.value.email.trim();
  const trimmedPhone = form.value.phone.trim();

  authStore.clearError();

  if (!trimmedName) {
    authStore.errorMessage = '이름을 입력해주세요.';
    return;
  }

  if (!trimmedEmail) {
    authStore.errorMessage = '이메일을 입력해주세요.';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    authStore.errorMessage = '올바른 이메일 형식을 입력해주세요.';
    return;
  }

  if (!trimmedPhone) {
    authStore.errorMessage = '전화번호를 입력해주세요.';
    return;
  }

  const result = await authStore.updateProfile({
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone,
  });

  if (result.success) {
    isEditing.value = false;
    syncForm();
    uiStore.showToast('프로필 정보가 저장되었습니다.');
  }
};

const isSaving = computed(() => authStore.isLoading);
</script>

<template>
  <MyPageContent
    :user="authStore.user"
    :form="form"
    :is-editing="isEditing"
    :is-saving="isSaving"
    :error-message="authStore.errorMessage"
    @update:form="form = $event"
    @edit-start="handleEditStart"
    @edit-cancel="handleEditCancel"
    @save="handleSave"
    @logout="handleLogout"
  />
</template>
