// src/stores/ui.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUiStore = defineStore('ui', () => {
  const isSidebarOpen = ref(false);
  const isAddLedgerModalOpen = ref(false);
  const isDateDetailModalOpen = ref(false);
  const toastMessage = ref('');
  const isGlobalLoading = ref(false);

  const hasToast = computed(() => !!toastMessage.value);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  const openAddLedgerModal = () => {
    isAddLedgerModalOpen.value = true;
  };

  const closeAddLedgerModal = () => {
    isAddLedgerModalOpen.value = false;
  };

  const openDateDetailModal = () => {
    isDateDetailModalOpen.value = true;
  };

  const closeDateDetailModal = () => {
    isDateDetailModalOpen.value = false;
  };

  const showToast = (message) => {
    toastMessage.value = message;
  };

  const clearToast = () => {
    toastMessage.value = '';
  };

  const setGlobalLoading = (value) => {
    isGlobalLoading.value = value;
  };

  return {
    isSidebarOpen,
    isAddLedgerModalOpen,
    isDateDetailModalOpen,
    toastMessage,
    isGlobalLoading,
    hasToast,
    toggleSidebar,
    openAddLedgerModal,
    closeAddLedgerModal,
    openDateDetailModal,
    closeDateDetailModal,
    showToast,
    clearToast,
    setGlobalLoading,
  };
});
