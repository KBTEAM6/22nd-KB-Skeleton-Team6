/**
 * @fileoverview 가계부 거래 상태 관리 스토어
 * @description 거래 내역 CRUD, 통계 계산, 실시간 동기화 기능 제공
 */

import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../api/api.js';
import { useAuthStore } from './auth';

// 카테고리 팔레트 (차트 색상)
const categoryPalette = {
  '식비': '#f28b8b',
  '주거/통신': '#c89bff',
  '교통/차량': '#f5e27f',
  '쇼핑/생활': '#8ec5ff',
  '의료/건강': '#92e9dc',
  '문화/여가': '#809dff',
  '기타': '#d8b86a',
  '월급': '#9fd39d',
  '부수입': '#9ad7a9',
  '교통': '#f5e27f',
  '취미': '#809dff',
};

// 수입/지출 카테고리 정의
export const incomeCategories = ['월급', '부수입'];

export const expenseCategories = [
  '식비',
  '주거/통신',
  '교통/차량',
  '쇼핑/생활',
  '의료/건강',
  '문화/여가',
  '기타',
];

// 타입별 카테고리 매핑
const categoryByType = {
  income: incomeCategories,
  expense: expenseCategories,
};

/**
 * 가계부 거래 상태 관리 스토어
 * 거래 내역 관리, 통계 계산, 캘린더 연동, 실시간 동기화 기능 제공
 */
export const useLedgerStore = defineStore('ledger', () => {
  // 현재 시점의 날짜 객체
  const today = new Date();
  // 인증 스토어 가져오기
  const authStore = useAuthStore();

  // ===== STATE (상태) =====
  /** 현재 선택된 연도 */
  const currentYear = ref(today.getFullYear());

  /** 현재 선택된 월 */
  const currentMonth = ref(today.getMonth() + 1);

  /** 선택된 날짜 (YYYY-MM-DD 형식) */
  const selectedDate = ref(today.toISOString().slice(0, 10));

  /** 모든 거래 내역 배열 */
  const transactions = ref([]);

  /** 실시간 동기화 타이머 ID */
  const liveSyncTimer = ref(null);

  // ===== GETTERS (계산된 값) =====

  /**
   * 현재 월 키 (YYYY-MM 형식)
   * @example '2024-01'
   */
  const monthKey = computed(
    () => `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}`,
  );

  /**
   * 현재 사용자의 모든 거래 내역
   * @returns {Array} 필터링된 거래 내역
   */
  const activeUserTransactions = computed(() =>
    transactions.value.filter(
      // (item) => Number(item.userId) === Number(authStore.activeUserId),
      (item) => Number(item.userId) === Number(1),
    ),
  );

  /**
   * 현재 월의 거래 내역
   * @returns {Array} 해당 월의 거래들
   */
  const monthlyTransactions = computed(() =>
    activeUserTransactions.value.filter((item) => item.date.startsWith(monthKey.value)),
  );

  /**
   * 선택된 날짜의 거래 내역
   * @returns {Array} 해당 날짜의 거래들
   */
  const selectedDateTransactions = computed(() =>
    activeUserTransactions.value.filter((item) => item.date === selectedDate.value),
  );

  // 현재 선택된 연/월에 해당하는 거래 내역 중에서
  // 수입 유형의 거래 내역만 필터링하여 금액 합산
  /**
   * 월 총 수입
   * @returns {number} 수입 합계
   */
  const totalIncome = computed(() =>
    monthlyTransactions.value
      .filter((item) => item.type === 'INCOME')
      .reduce((sum, item) => sum + item.amount, 0),
  );

  // 현재 선택된 연/월에 해당하는 거래 내역 중에서
  // 지출 유형의 거래 내역만 필터링하여 금액 합산
  /**
   * 월 총 지출
   * @returns {number} 지출 합계
   */
  const totalExpense = computed(() =>
    monthlyTransactions.value
      .filter((item) => item.type === 'EXPENSE')
      .reduce((sum, item) => sum + item.amount, 0),
  );

  /**
   * 월 순수입 (수입 - 지출)
   * @returns {number} 순수입
   */
  const totalSaving = computed(() => totalIncome.value - totalExpense.value);

  // 카테고리별 지출 합산 계산
  const categoryExpenseChartData = computed(() => {
    const result = {};

    monthlyTransactions.value
      .filter((item) => item.type === 'EXPENSE')
      .forEach((item) => {
        if (!result[item.category]) {
          result[item.category] = 0;
        }
        result[item.category] += item.amount;
      });

    return Object.entries(result).map(([category, value]) => ({
      category,
      value,
      color: categoryPalette[category] ?? '#cdd5df',
    }));
  });

  // 달력에 표시할 날짜별 수입/지출 합산 계산
  const calendarData = computed(() => {
    const calendarMap = {};

    monthlyTransactions.value.forEach((item) => {
      const day = parseInt(item.date.split('-')[2], 10);

      if (!calendarMap[day]) {
        calendarMap[day] = { income: 0, expense: 0 };
      }

      if (item.type === 'INCOME') {
        calendarMap[day].income += item.amount;
      } else if (item.type === 'EXPENSE') {
        calendarMap[day].expense += item.amount;
      }
    });

    return calendarMap;
  });

  // 서버에서 가계부 전체 데이터를 가져와 상태에 저장하는 함수
  // ===== ACTIONS (액션들) =====

  /**
   * 모든 거래 내역 조회
   * API에서 거래 데이터를 가져와 상태에 저장
   * @returns {Promise<void>}
   */
  async function fetchTransactions() {
    // 쿼리 파라미터로 현재 로그인한 사용자의 ID를 전달
    // 해당 사용자의 거래 내역만 조회
    const res = await api.get('/transactions', {
      params: {
        userId: 1,
        // userId: authStore.activeUserId
      },
    });
    // 응답 데이터를 거래 내역 상태에 저장
    transactions.value = res.data;
  }

  /**
   * 거래 내역 새로고침
   * @returns {Promise<void>}
   */
  async function refreshTransactions() {
    await fetchTransactions();
  }

  /**
   * 새 거래 추가
   * @param {Object} payload - 거래 데이터
   * @param {string} payload.type - 거래 유형 ('income' | 'expense')
   * @param {string} payload.category - 카테고리
   * @param {number} payload.amount - 금액
   * @param {string} payload.date - 거래일
   * @param {string} payload.memo - 메모
   * @returns {Promise<void>}
   * @throws {Error} 카테고리 검증 실패 시
   */
  async function addTransaction(payload) {
    const allowedCategories = categoryByType[payload.type] ?? [];
    if (!allowedCategories.includes(payload.category)) {
      throw new Error(`${payload.type} 유형에 맞는 카테고리를 선택해주세요.`);
    }

    const response = await api.post('/transactions', {
      ...payload,
      userId: authStore.activeUserId,
    });
    transactions.value.push(response.data);
    await refreshTransactions();
  }

  /**
   * 거래 정보 수정
   * @param {number} id - 거래 ID
   * @param {Object} payload - 수정할 데이터
   * @returns {Promise<void>}
   * @throws {Error} 권한 없음 또는 카테고리 검증 실패 시
   */
  async function updateTransaction(id, payload) {
    const target = transactions.value.find((item) => item.id === id);
    if (
      target &&
      Number(target.userId ?? authStore.activeUserId) !== Number(authStore.activeUserId)
    ) {
      throw new Error('현재 사용자 거래내역만 수정할 수 있습니다.');
    }

    const allowedCategories = categoryByType[payload.type] ?? [];
    if (!allowedCategories.includes(payload.category)) {
      throw new Error(`${payload.type} 유형에 맞는 카테고리를 선택해주세요.`);
    }

    await api.patch(`/transactions/${id}`, payload);
    await refreshTransactions();
  }

  /**
   * 거래 삭제
   * @param {number} id - 삭제할 거래 ID
   * @returns {Promise<void>}
   * @throws {Error} 권한 없음 시
   */
  async function deleteTransaction(id) {
    const target = transactions.value.find((item) => item.id === id);
    if (
      target &&
      Number(target.userId ?? authStore.activeUserId) !== Number(authStore.activeUserId)
    ) {
      throw new Error('현재 사용자 거래내역만 삭제할 수 있습니다.');
    }

    await api.delete(`/transactions/${id}`);
    await refreshTransactions();
  }

  /**
   * 실시간 동기화 시작
   * 주기적으로 거래 데이터를 새로고침
   * @param {number} intervalMs - 동기화 간격 (기본: 3000ms)
   */
  function startLiveSync(intervalMs = 3000) {
    if (liveSyncTimer.value) {
      return;
    }

    refreshTransactions();

    liveSyncTimer.value = window.setInterval(() => {
      refreshTransactions();
    }, intervalMs);
  }

  /**
   * 실시간 동기화 중지
   */
  function stopLiveSync() {
    if (!liveSyncTimer.value) {
      return;
    }

    window.clearInterval(liveSyncTimer.value);
    liveSyncTimer.value = null;
  }

  /**
   * 카테고리 색상 반환
   * @param {string} category - 카테고리 이름
   * @returns {string} 색상 코드 (HEX)
   */
  function getCategoryColor(category) {
    return categoryPalette[category] ?? '#cdd5df';
  }

  // ===== STORE 반환 =====
  return {
    // State
    currentYear,
    currentMonth,
    selectedDate,
    transactions,
    liveSyncTimer,

    // Getters
    monthKey,
    activeUserTransactions,
    monthlyTransactions,
    selectedDateTransactions,
    totalIncome,
    totalExpense,
    totalSaving,
    categoryExpenseChartData,
    calendarData,
    fetchTransactions,
    refreshTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    startLiveSync,
    stopLiveSync,
    getCategoryColor,
  };
});
