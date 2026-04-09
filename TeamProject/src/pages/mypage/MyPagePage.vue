<script setup>
import { useAuthStore } from '@/stores/auth';
import MyPageContent from '@/components/mypage/MyPageContent.vue';

const authStore = useAuthStore();
</script>

<template>
  <MyPageContent :user="authStore.currentUser" />
</template>
