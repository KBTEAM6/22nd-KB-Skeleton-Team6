import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '../api/api';
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

export const useLedgerStore = defineStore('ledger', () => {
  const today = new Date();
  const authStore = useAuthStore();
  const currentYear = ref(today.getFullYear());
  const currentMonth = ref(today.getMonth() + 1);
  const selectedDate = ref(today.toISOString().slice(0, 10));
  const transactions = ref([]);
  const liveSyncTimer = ref(null);

  const monthKey = computed(
    () => `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}`,
  );

  const activeUserTransactions = computed(() =>
    transactions.value.filter(
      (item) => Number(item.userId ?? authStore.activeUserId) === Number(authStore.activeUserId),
    ),
  );

  const monthlyTransactions = computed(() =>
    activeUserTransactions.value.filter((item) => item.date.startsWith(monthKey.value)),
  );

  const selectedDateTransactions = computed(() =>
    activeUserTransactions.value.filter((item) => item.date === selectedDate.value),
  );

  const totalIncome = computed(() =>
    monthlyTransactions.value
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0),
  );

  const totalExpense = computed(() =>
    monthlyTransactions.value
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0),
  );

  const totalSaving = computed(() => totalIncome.value - totalExpense.value);

  async function fetchTransactions() {
    const txRes = await api.get('/transactions');
    transactions.value = txRes.data;
  }

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
