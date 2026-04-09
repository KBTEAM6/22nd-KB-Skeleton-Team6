/**
 * @fileoverview UI 상태 관리 스토어
 * @description 전역 UI 상태(모달, 사이드바, 토스트 등)를 중앙 집중 관리
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * UI 상태 관리 스토어
 * 모달, 사이드바, 토스트 메시지 등의 UI 상태를 관리
 */
export const useUiStore = defineStore('ui', () => {
  // ===== STATE (상태) =====
  /** 사이드바 열림/닫힘 상태 */
  const isSidebarOpen = ref(false);

  /** 가계부 추가 모달 열림 상태 */
  const isAddLedgerModalOpen = ref(false);

  /** 날짜 상세 모달 열림 상태 */
  const isDateDetailModalOpen = ref(false);

  /** 토스트 메시지 내용 (빈 문자열이면 표시하지 않음) */
  const toastMessage = ref('');

  /** 전역 로딩 상태 (전체 앱에 걸친 로딩 표시) */
  const isGlobalLoading = ref(false);

  // ===== GETTERS (계산된 값) =====
  /** 토스트 메시지가 있는지 여부 */
  const hasToast = computed(() => !!toastMessage.value);

  // ===== ACTIONS (액션들) =====

  /**
   * 사이드바 토글 (열림 ↔ 닫힘)
   */
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  /**
   * 가계부 추가 모달 열기
   */
  const openAddLedgerModal = () => {
    isAddLedgerModalOpen.value = true;
  };

  /**
   * 가계부 추가 모달 닫기
   */
  const closeAddLedgerModal = () => {
    isAddLedgerModalOpen.value = false;
  };

  /**
   * 날짜 상세 모달 열기
   */
  const openDateDetailModal = () => {
    isDateDetailModalOpen.value = true;
  };

  /**
   * 날짜 상세 모달 닫기
   */
  const closeDateDetailModal = () => {
    isDateDetailModalOpen.value = false;
  };

  /**
   * 토스트 메시지 표시
   * @param {string} message - 표시할 메시지
   */
  const showToast = (message) => {
    toastMessage.value = message;
  };

  /**
   * 토스트 메시지 제거
   */
  const clearToast = () => {
    toastMessage.value = '';
  };

  /**
   * 전역 로딩 상태 설정
   * @param {boolean} value - 로딩 상태 (true: 로딩 중, false: 로딩 완료)
   */
  const setGlobalLoading = (value) => {
    isGlobalLoading.value = value;
  };

  // ===== STORE 반환 =====
  return {
    // State
    isSidebarOpen,
    isAddLedgerModalOpen,
    isDateDetailModalOpen,
    toastMessage,
    isGlobalLoading,

    // Getters
    hasToast,

    // Actions
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
