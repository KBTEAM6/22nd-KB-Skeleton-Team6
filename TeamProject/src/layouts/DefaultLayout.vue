<script setup>
import { ref } from 'vue';
import Sidebar from '@/components/common/Sidebar.vue';
import FloatingAddButton from '@/components/ledger/FloatingAddButton.vue';
import AddLedgerDialog from '@/components/ledger/AddLedgerDialog.vue';
import { useLedgerStore } from '@/stores/ledger';

const ledgerStore = useLedgerStore();
const isAddDialogOpen = ref(false);

/**
 * 가계부 추가 핸들러
 * @param {Object} data - 다이얼로그에서 검증되어 올라온 가계부 데이터
 */
const handleAddLedger = async (data) => {
  console.log('Received data from AddLedgerDialog:', data);
  try {
    // ledgerStore의 addTransaction 액션 실행
    await ledgerStore.addTransaction(data);
    
    // 성공 시 다이얼로그 닫기
    isAddDialogOpen.value = false;
    
    // 필요 시 사용자 알림 (Toast 등)
    console.log('Successfully added:', data);
  } catch (error) {
    console.error('Failed to add ledger:', error);
    alert(error.message || '저장 중 오류가 발생했습니다.');
  }
};
</script>

<template>
  <div class="w-100 vh-100 d-flex" style="background-color: #f5f5f7;">
    <Sidebar />

    <main class="flex-grow-1 overflow-auto p-4 p-md-5">
      <RouterView />
    </main>

    <FloatingAddButton @click="isAddDialogOpen = true" />

    <AddLedgerDialog
      :isOpen="isAddDialogOpen"
      @close="isAddDialogOpen = false"
      @add="handleAddLedger"
    />
  </div>
</template>

<style scoped>
/* 필요한 전역 레이아웃 스타일이 있다면 추가 */
</style>