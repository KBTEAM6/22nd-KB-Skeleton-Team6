<script setup>
import { ref } from 'vue';
import Sidebar from '@/components/common/Sidebar.vue';
import FloatingAddButton from '@/components/ledger/FloatingAddButton.vue';
import AddLedgerDialog from '@/components/ledger/AddLedgerDialog.vue';

const isAddDialogOpen = ref(false);

const handleAddLedger = (data) => {
  console.log('Added ledger entry:', data);
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
