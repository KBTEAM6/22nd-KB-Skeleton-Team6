<script setup>
import { computed, onMounted, ref } from 'vue';
import { usecouplesStore } from '@/stores/couples.js';
import { useAuthStore } from '@/stores/auth.js';
import CoupleLedger from '@/components/couple/CoupleLedger.vue';
import CoupleDetail from '@/components/couple/CoupleDetail.vue';
const coupleStore = usecouplesStore();
const authStore = useAuthStore();
const isReady = ref(false);

const isCoupled = computed(() => {
  const userId = authStore.user?.id;
  if (!userId) return false;

  return (coupleStore.allcouples || []).some(
    (c) => c.user1Id === userId || c.user2Id === userId,
  );
});
onMounted(async () => {
  const userId = authStore.user?.id;
  if (!userId) {
    isReady.value = true;
    return;
  }
  await coupleStore.fetchAllcouples();
  if (!isCoupled.value) {
    await coupleStore.fetchReceivedRequests(userId);
    await coupleStore.fetchSentRequests(userId);
  }
  isReady.value = true;
});
</script>
<template>
  <div v-if="isReady">
    <CoupleDetail v-if="isCoupled" />
    <CoupleLedger v-else />
  </div>
</template>
