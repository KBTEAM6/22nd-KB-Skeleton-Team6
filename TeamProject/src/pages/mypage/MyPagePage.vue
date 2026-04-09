<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import MyPageContent from '@/components/mypage/MyPageContent.vue';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  authStore.loadUserFromStorage();
  if (!authStore.user) {
    router.push({ name: 'login' });
  }
});

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};
</script>

<template>
  <MyPageContent :user="authStore.user" @logout="handleLogout" />
</template>
