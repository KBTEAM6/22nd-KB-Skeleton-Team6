<template>
  <section>
    <h2 class="page-title">메인 페이지</h2>

    <div class="home-grid">
      <article class="card-box calendar-card">
        <div class="month-switch">
          <button class="btn btn-outline-secondary btn-sm" @click="changeMonth(-1)">◀</button>
          <h3 class="mb-0">{{ store.currentYear }}년 {{ store.currentMonth }}월</h3>
          <button class="btn btn-outline-secondary btn-sm" @click="changeMonth(1)">▶</button>
        </div>
        <div class="calendar-grid">
          <button
            v-for="day in monthDays"
            :key="day.date"
            class="day-btn"
            :class="{ active: day.date === store.selectedDate, today: day.isToday }"
            @click="openDayDetails(day.date)"
          >
            <span>{{ day.day }}</span>
            <small>{{ day.count > 0 ? `${day.count}건` : '' }}</small>
          </button>
        </div>
      </article>

      <article class="card-box chart-card">
        <h3>지출차트</h3>
        <div class="donut-wrap">
          <div class="donut-chart" :style="donutStyle">
            <div class="donut-inner">
              <strong>{{ expenseRatio }}%</strong>
              <small>지출 비율</small>
            </div>
          </div>
        </div>

        <div class="chart-summary">
          <span>총수입 {{ money(store.totalIncome) }}</span>
          <span>총지출 {{ money(store.totalExpense) }}</span>
        </div>

        <div class="chart-cover" v-if="showDayPopup">
          <div class="popup-head">
            <strong>{{ selectedLabel }} 거래</strong>
            <button class="close-btn" @click="showDayPopup = false">✕</button>
          </div>
          <ul class="scroll-list">
            <li v-for="tx in store.selectedDateTransactions" :key="tx.id">
              <span>{{ tx.type === 'income' ? '+' : '-' }} {{ tx.category }}</span>
              <strong class="tx-amount" :class="tx.type">{{ money(tx.amount) }}</strong>
            </li>
            <li v-if="store.selectedDateTransactions.length === 0" class="list-empty">등록된 거래가 없습니다.</li>
          </ul>
        </div>
      </article>
    </div>

    <div class="stats-row">
      <article class="card-box stat">총수입 {{ money(store.totalIncome) }}</article>
      <article class="card-box stat">총지출 {{ money(store.totalExpense) }}</article>
      <article class="card-box stat">순수익 {{ money(store.totalSaving) }}</article>
    </div>

  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useLedgerStore } from '../stores/ledger';

const store = useLedgerStore();
const showDayPopup = ref(false);

const money = (value) => `${Number(value || 0).toLocaleString()}원`;
const selectedLabel = computed(() => store.selectedDate.replaceAll('-', '.'));

const expenseRatio = computed(() => {
  const total = store.totalIncome + store.totalExpense;
  if (!total) {
    return 0;
  }
  return Math.round((store.totalExpense / total) * 100);
});

const donutStyle = computed(() => {
  const expense = store.totalExpense;
  const income = store.totalIncome;
  const total = income + expense;
  const expenseDegree = total === 0 ? 0 : (expense / total) * 360;

  return {
    background: `conic-gradient(#f28b8b 0deg ${expenseDegree}deg, #9fd39d ${expenseDegree}deg 360deg)`,
  };
});

const monthDays = computed(() => {
  const daysInMonth = new Date(store.currentYear, store.currentMonth, 0).getDate();
  const todayStr = new Date().toISOString().slice(0, 10);

  return Array.from({ length: daysInMonth }, (_, idx) => {
    const day = idx + 1;
    const date = `${store.currentYear}-${String(store.currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return {
      day,
      date,
      isToday: date === todayStr,
      count: store.monthlyTransactions.filter((tx) => tx.date === date).length,
    };
  });
});

const openDayDetails = (date) => {
  store.selectedDate = date;
  showDayPopup.value = true;
};

const changeMonth = (direction) => {
  if (direction < 0 && store.currentMonth === 1) {
    store.currentYear -= 1;
    store.currentMonth = 12;
    return;
  }

  if (direction > 0 && store.currentMonth === 12) {
    store.currentYear += 1;
    store.currentMonth = 1;
    return;
  }

  store.currentMonth += direction;
};

</script>
