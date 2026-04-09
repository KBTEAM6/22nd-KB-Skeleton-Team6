import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../api/api.js';
import { useAuthStore } from './auth';

const categoryPalette = {
  식비: '#f28b8b',
  주거통신: '#c89bff',
  교통차량: '#f5e27f',
  쇼핑생활: '#8ec5ff',
  의료건강: '#92e9dc',
  문화여가: '#809dff',
  기타: '#d8b86a',
  월급: '#9fd39d',
  부수입: '#9ad7a9',
  교통: '#f5e27f',
  취미: '#809dff',
};

export const incomeCategories = ['월급', '부수입'];

export const expenseCategories = [
  '식비',
  '주거통신',
  '교통차량',
  '쇼핑생활',
  '의료건강',
  '문화여가',
  '기타',
];

const categoryByType = {
  income: incomeCategories,
  expense: expenseCategories,
};

// 거래내역 관리 스토어
export const useLedgerStore = defineStore('ledger', () => {
  // 현재 시점의 날짜 객체
  const today = new Date();
  // 인증 스토어 가져오기
  const authStore = useAuthStore();
  // 현재 연도 상태 
  const currentYear = ref(today.getFullYear());
  // 현재 월 상태
  const currentMonth = ref(today.getMonth() + 1);
  // 선택된 날짜 상태: 'YYYY-MM-DD' 형식 문자열
  const selectedDate = ref(today.toISOString().slice(0, 10));
  // 서버에서 가져온 전체 거래 내역 상태
  const transactions = ref([]);
  // 실시간 동기화 타이머
  const liveSyncTimer = ref(null);

  // 현재 선택된 연/월 값: 'YYYY-MM' 형식 문자열
  const monthKey = computed(
    () => `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}`,
  );

  // 현재 로그인한 사용자의 거래 내역 필터링
  const activeUserTransactions = computed(() =>
    transactions.value.filter(
      // (item) => Number(item.userId) === Number(authStore.activeUserId),
      (item) => Number(item.userId) === Number(1),
    ),
  );

  // 현재 로그인한 사용자의 거래 내역 중에서
  // 현재 선택된 연/월에 해당하는 거래 내역 필터링
  const monthlyTransactions = computed(() =>
    activeUserTransactions
      .value
      .filter((item) => item.date.startsWith(monthKey.value)),
  );

  // 현재 로그인한 사용자의 거래 내역 중에서
  // 선택된 날짜에 해당하는 거래 내역 필터링
  const selectedDateTransactions = computed(() =>
    activeUserTransactions
      .value
      .filter((item) => item.date === selectedDate.value),
  );

  // 현재 선택된 연/월에 해당하는 거래 내역 중에서
  // 수입 유형의 거래 내역만 필터링하여 금액 합산
  const totalIncome = computed(() =>
    monthlyTransactions
      .value
      .filter((item) => item.type === 'INCOME')
      .reduce((sum, item) => sum + item.amount, 0),
  );

  console.log('############ Total Income:', totalIncome.value);

  // 현재 선택된 연/월에 해당하는 거래 내역 중에서
  // 지출 유형의 거래 내역만 필터링하여 금액 합산
  const totalExpense = computed(() =>
    monthlyTransactions
      .value
      .filter((item) => item.type === 'EXPENSE')
      .reduce((sum, item) => sum + item.amount, 0),
  );

  // 순수익 계산: 총 수입에서 총 지출을 뺀 값
  const totalSaving = computed(() => totalIncome.value - totalExpense.value);

  // 서버에서 가계부 전체 데이터를 가져와 상태에 저장하는 함수
  async function fetchTransactions() {
    // 쿼리 파라미터로 현재 로그인한 사용자의 ID를 전달
    // 해당 사용자의 거래 내역만 조회
    const res = await api.get('/transactions', {
      params: {
        userId: 1
        // userId: authStore.activeUserId
      }
    });
    // 응답 데이터를 거래 내역 상태에 저장
    transactions.value = res.data;
  }

  // 가계부 내역을 새로고침하는 함수
  async function refreshTransactions() {
    await fetchTransactions();
  }

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

  function startLiveSync(intervalMs = 3000) {
    if (liveSyncTimer.value) {
      return;
    }

    refreshTransactions();

    liveSyncTimer.value = window.setInterval(() => {
      refreshTransactions();
    }, intervalMs);
  }

  function stopLiveSync() {
    if (!liveSyncTimer.value) {
      return;
    }

    window.clearInterval(liveSyncTimer.value);
    liveSyncTimer.value = null;
  }

  function getCategoryColor(category) {
    return categoryPalette[category] ?? '#cdd5df';
  }

  return {
    currentYear,
    currentMonth,
    selectedDate,
    transactions,
    monthlyTransactions,
    selectedDateTransactions,
    totalIncome,
    totalExpense,
    totalSaving,
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
