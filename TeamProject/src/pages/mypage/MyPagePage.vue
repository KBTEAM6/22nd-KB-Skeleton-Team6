<template>
  <!--
    MyPageContent는 화면 표시만 담당한다.
    실제 상태(form, isEditing, 저장 함수)는 이 페이지가 소유한다.
  -->
  <MyPageContent
    :user="authStore.user"
    :form="form"
    :is-editing="isEditing"
    :is-saving="isSaving"
    :error-message="authStore.errorMessage"
    :is-password-modal-open="isPasswordModalOpen"
    :password-form="passwordForm"
    :password-error-message="passwordErrorMessage"
    :is-password-saving="isPasswordSaving"
    @update:form="form = $event"
    @edit-start="handleEditStart"
    @edit-cancel="handleEditCancel"
    @save="handleSave"
    @logout="handleLogout"
    @open-password-modal="openPasswordModal"
    @close-password-modal="closePasswordModal"
    @update:password-form="passwordForm = $event"
    @password-change="handlePasswordChange"
  />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import MyPageContent from '@/components/mypage/MyPageContent.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

/**
 * 마이페이지가 현재 수정 모드인지 여부
 *
 * false면 보기 모드, true면 input이 보이는 편집 모드다.
 */
const isEditing = ref(false);

/**
 * 마이페이지 수정용 로컬 폼 상태
 *
 * authStore.user를 직접 수정하지 않고,
 * 편집 중에는 별도의 form 객체에 복사해서 다룬다.
 * 그래야 사용자가 취소를 눌렀을 때 원본을 안전하게 유지할 수 있다.
 */
const form = ref({
  name: '',
  email: '',
  phone: '',
});

// PASSWORD 관련 STATE
const isPasswordModalOpen = ref(false);

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const passwordErrorMessage = ref('');

const isPasswordSaving = ref(false);

/**
 * 현재 로그인 사용자 정보를 form으로 복사한다.
 *
 * 사용 시점:
 * - 페이지 첫 진입
 * - 수정 시작 직전
 * - 수정 취소 직후
 * - 저장 성공 직후
 */
const syncForm = () => {
  form.value = {
    name: authStore.user?.name || '',
    email: authStore.user?.email || '',
    phone: authStore.user?.phone || '',
  };
};

/**
 * 페이지 진입 시 현재 세션 로그인 정보를 복원한다.
 *
 * 로그인 정보가 없으면 마이페이지에 머물 수 없으므로 login으로 이동시킨다.
 */
onMounted(() => {
  authStore.loadUserFromStorage();
  authStore.clearError();
  if (!authStore.user) {
    router.push({ name: 'login' });
    return;
  }

  syncForm();
});

/**
 * 로그아웃 버튼 처리
 *
 * 실제 세션 삭제는 authStore.logout이 담당하고,
 * 화면 이동은 페이지가 담당한다.
 */
const handleLogout = () => {
  authStore.logout();
  uiStore.showToast('로그아웃 했습니다.');
  router.push({ name: 'login' });
};

/**
 * 편집 시작 처리
 *
 * 최신 사용자 정보를 form에 다시 채우고,
 * 이전 에러 메시지를 지운 뒤 수정 모드로 전환한다.
 */
const handleEditStart = () => {
  syncForm();
  authStore.clearError();
  isEditing.value = true;
};

/**
 * 편집 취소 처리
 *
 * 서버 저장 없이 로컬 form만 원래 값으로 되돌리고,
 * 수정 모드를 종료한다.
 */
const handleEditCancel = () => {
  syncForm();
  authStore.clearError();
  isEditing.value = false;
};

/**
 * 저장 버튼 처리
 *
 * 흐름:
 * 1. 입력값 trim
 * 2. 이름/이메일/전화번호 기본 검증
 * 3. authStore.updateProfile 호출
 * 4. 성공하면 편집 모드 종료 + 토스트 표시
 */
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

/**
 * 저장 중 여부를 내려주는 계산값
 *
 * 실제 값은 authStore.isLoading을 그대로 사용하지만,
 * 템플릿에서는 마이페이지 관점의 이름(isSaving)으로 읽는 편이 이해하기 쉽다.
 */
const isSaving = computed(() => authStore.isLoading);

// 모달 여-닫기 함수
const openPasswordModal = () => {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  passwordErrorMessage.value = '';
  isPasswordModalOpen.value = true;
};

const closePasswordModal = () => {
  isPasswordModalOpen.value = false;
  passwordErrorMessage.value = '';
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
};

// 실제 검증 함수
const handlePasswordChange = async () => {
  passwordErrorMessage.value = '';
  isPasswordSaving.value = true;

  const result = await authStore.changePassword({
    currentPassword: passwordForm.value.currentPassword,
    newPassword: passwordForm.value.newPassword,
    confirmPassword: passwordForm.value.confirmPassword,
  });

  isPasswordSaving.value = false;

  if (!result.success) {
    passwordErrorMessage.value = result.message;
    return;
  }

  uiStore.showToast('비밀번호가 변경되었습니다.');
  closePasswordModal();
};
</script>
