<template>
  <!--
    MyPageContent???붾㈃ ?쒖떆留??대떦?쒕떎.
    ?ㅼ젣 ?곹깭(form, isEditing, ????⑥닔)?????섏씠吏媛 ?뚯쑀?쒕떎.
  -->
  <DelayModal
    :is-open="isProfileSaving"
    type="loading"
    message="?꾨줈?꾩쓣 ??ν븯怨??덉뼱??.."
    :size="1000"
  />
  <DelayModal
    :is-open="isDeletingAccount"
    type="withdraw"
    message="?뚯썝?덊눜瑜?泥섎━?섍퀬 ?덉뼱??.."
    :size="1000"
  />
  <DelayModal
    :is-open="isLoggingOut"
    type="goodbye"
    message="금방 돌아오실거죠?"
    :size="1000"
  />
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
    :is-logout-modal-open="isLogoutModalOpen"
    :is-delete-modal-open="isDeleteModalOpen"
    :is-deleting-account="isDeletingAccount"
    @update:form="form = $event"
    @edit-start="handleEditStart"
    @edit-cancel="handleEditCancel"
    @save="handleSave"
    @logout="openLogoutModal"
    @confirm-logout="handleLogout"
    @close-logout-modal="closeLogoutModal"
    @open-password-modal="openPasswordModal"
    @close-password-modal="closePasswordModal"
    @update:password-form="passwordForm = $event"
    @password-change="handlePasswordChange"
    @delete-account="handleDeleteAccount"
    @open-delete-modal="openDeleteModal"
    @close-delete-modal="closeDeleteModal"
    @confirm-delete-account="handleDeleteAccount"
  />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';
import MyPageContent from '@/components/mypage/MyPageContent.vue';
import DelayModal from '@/components/common/DelayModal.vue';
import { mockDelay } from '@/service/mockDelay';

import { withdrawUser } from '@/service/withdrawUser';

const authStore = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

/**
 * 留덉씠?섏씠吏媛 ?꾩옱 ?섏젙 紐⑤뱶?몄? ?щ?
 *
 * false硫?蹂닿린 紐⑤뱶, true硫?input??蹂댁씠???몄쭛 紐⑤뱶??
 */
const isEditing = ref(false);

/**
 * 留덉씠?섏씠吏 ?섏젙??濡쒖뺄 ???곹깭
 *
 * authStore.user瑜?吏곸젒 ?섏젙?섏? ?딄퀬,
 * ?몄쭛 以묒뿉??蹂꾨룄??form 媛앹껜??蹂듭궗?댁꽌 ?ㅻ，??
 * 洹몃옒???ъ슜?먭? 痍⑥냼瑜??뚮??????먮낯???덉쟾?섍쾶 ?좎??????덈떎.
 */
const form = ref({
  name: '',
  email: '',
  phone: '',
});

// PASSWORD 愿??STATE
const isPasswordModalOpen = ref(false);

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const passwordErrorMessage = ref('');

const isPasswordSaving = ref(false);
const isProfileSaving = ref(false);
const isLogoutModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isDeletingAccount = ref(false);
const isLoggingOut = ref(false);

/**
 * ?꾩옱 濡쒓렇???ъ슜???뺣낫瑜?form?쇰줈 蹂듭궗?쒕떎.
 *
 * ?ъ슜 ?쒖젏:
 * - ?섏씠吏 泥?吏꾩엯
 * - ?섏젙 ?쒖옉 吏곸쟾
 * - ?섏젙 痍⑥냼 吏곹썑
 * - ????깃났 吏곹썑
 */
const syncForm = () => {
  form.value = {
    name: authStore.user?.name || '',
    email: authStore.user?.email || '',
    phone: authStore.user?.phone || '',
  };
};

/**
 * ?섏씠吏 吏꾩엯 ???꾩옱 ?몄뀡 濡쒓렇???뺣낫瑜?蹂듭썝?쒕떎.
 *
 * 濡쒓렇???뺣낫媛 ?놁쑝硫?留덉씠?섏씠吏??癒몃Ъ ???놁쑝誘濡?login?쇰줈 ?대룞?쒗궓??
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
 * 濡쒓렇?꾩썐 踰꾪듉 泥섎━
 *
 * ?ㅼ젣 ?몄뀡 ??젣??authStore.logout???대떦?섍퀬,
 * ?붾㈃ ?대룞? ?섏씠吏媛 ?대떦?쒕떎.
 */
const handleLogout = async () => {
  closeLogoutModal();
  isLoggingOut.value = true;
  await mockDelay();
  authStore.logout();
  uiStore.showToast('로그아웃 했습니다.');
  isLoggingOut.value = false;
  router.push({ name: 'login' });
};

const openLogoutModal = () => {
  isLogoutModalOpen.value = true;
};

const closeLogoutModal = () => {
  isLogoutModalOpen.value = false;
};

/**
 * ?몄쭛 ?쒖옉 泥섎━
 *
 * 理쒖떊 ?ъ슜???뺣낫瑜?form???ㅼ떆 梨꾩슦怨?
 * ?댁쟾 ?먮윭 硫붿떆吏瑜?吏?????섏젙 紐⑤뱶濡??꾪솚?쒕떎.
 */
const handleEditStart = () => {
  syncForm();
  authStore.clearError();
  isEditing.value = true;
};

/**
 * ?몄쭛 痍⑥냼 泥섎━
 *
 * ?쒕쾭 ????놁씠 濡쒖뺄 form留??먮옒 媛믪쑝濡??섎룎由ш퀬,
 * ?섏젙 紐⑤뱶瑜?醫낅즺?쒕떎.
 */
const handleEditCancel = () => {
  syncForm();
  authStore.clearError();
  isEditing.value = false;
};

/**
 * ???踰꾪듉 泥섎━
 *
 * ?먮쫫:
 * 1. ?낅젰媛?trim
 * 2. ?대쫫/?대찓???꾪솕踰덊샇 湲곕낯 寃利?
 * 3. authStore.updateProfile ?몄텧
 * 4. ?깃났?섎㈃ ?몄쭛 紐⑤뱶 醫낅즺 + ?좎뒪???쒖떆
 */
const handleSave = async () => {
  const trimmedName = form.value.name.trim();
  const trimmedEmail = form.value.email.trim();
  const trimmedPhone = form.value.phone.trim();

  authStore.clearError();

  if (!trimmedName) {
    authStore.errorMessage = '?대쫫???낅젰?댁＜?몄슂.';
    return;
  }

  if (!trimmedEmail) {
    authStore.errorMessage = '?대찓?쇱쓣 ?낅젰?댁＜?몄슂.';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    authStore.errorMessage = '?щ컮瑜??대찓???뺤떇???낅젰?댁＜?몄슂.';
    return;
  }

  if (!trimmedPhone) {
    authStore.errorMessage = '?꾪솕踰덊샇瑜??낅젰?댁＜?몄슂.';
    return;
  }

  isProfileSaving.value = true;
  const result = await authStore.updateProfile({
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone,
  });
  isProfileSaving.value = false;

  if (result.success) {
    isEditing.value = false;
    syncForm();
    uiStore.showToast('?꾨줈???뺣낫媛 ??λ릺?덉뒿?덈떎.');
  }
};

/**
 * ???以??щ?瑜??대젮二쇰뒗 怨꾩궛媛?
 *
 * ?ㅼ젣 媛믪? authStore.isLoading??洹몃?濡??ъ슜?섏?留?
 * ?쒗뵆由우뿉?쒕뒗 留덉씠?섏씠吏 愿?먯쓽 ?대쫫(isSaving)?쇰줈 ?쎈뒗 ?몄씠 ?댄빐?섍린 ?쎈떎.
 */
const isSaving = computed(() => authStore.isLoading);

// 紐⑤떖 ???リ린 ?⑥닔
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

const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

// ?ㅼ젣 寃利??⑥닔
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

  uiStore.showToast('鍮꾨?踰덊샇媛 蹂寃쎈릺?덉뒿?덈떎.');
  closePasswordModal();
};

// 怨꾩젙 ??젣 泥섎━
const handleDeleteAccount = async () => {
  if (isDeletingAccount.value) return;

  closeDeleteModal();
  isDeletingAccount.value = true;

  try {
    await withdrawUser(authStore.user.id);
    authStore.logout();
    uiStore.showToast('怨꾩젙????젣?섏뿀?듬땲??');
    router.push({ name: 'login' });
  } catch (error) {
    console.error('?뚯썝?덊눜 ?ㅽ뙣:', error);
    uiStore.showToast('怨꾩젙 ??젣???ㅽ뙣?덉뒿?덈떎.', 'error');
  } finally {
    isDeletingAccount.value = false;
  }
};
</script>

