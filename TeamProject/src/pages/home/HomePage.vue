<template>
  <div class="home-page">
    <div class="home-inner d-flex flex-column gap-4">
      <SummaryCards
        :totalIncome="ledgerStore.totalIncome"
        :totalExpense="ledgerStore.totalExpense"
      />

      <div class="row g-4">
        <div class="col-12 col-lg-8">
          <LedgerCalendar @dateClick="handleClick" />
        </div>

        <div class="col-12 col-lg-4 d-flex flex-column gap-4">
          <ExpensePieChart :data="ledgerStore.categoryExpenseChartData" />
        </div>
      </div>

      <DayDetailModal
        :is-open="isModalOpen"
        :date="selectedDateData.date"
        :income="selectedDateData.income"
        :expense="selectedDateData.expense"
        :details="selectedDateData.details"
        @close="isModalOpen = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useLedgerStore } from "@/stores/ledger";
import SummaryCards from "@/components/home/SummaryCards.vue";
import LedgerCalendar from "@/components/ledger/LedgerCalendar.vue";
import ExpensePieChart from "@/components/home/ExpensePieChart.vue";
import DayDetailModal from "@/components/ledger/DateDetailDialog.vue";

const ledgerStore = useLedgerStore();

// --- 모달 상태 관리 ---
const isModalOpen = ref(false);

const selectedDateData = ref({
  date: 0,
  income: 0,
  expense: 0,
  details: [],
});

// 달력 클릭 핸들러
const handleClick = (dateString, payload) => {
  if (!payload) return;

  selectedDateData.value = {
    date: Number(dateString.split("-")[2]),
    income: payload.income,
    expense: payload.expense,
    details: payload.details,
  };

  isModalOpen.value = true;
};

onMounted(() => {
  ledgerStore.fetchTransactions();
});

onUnmounted(() => {
  ledgerStore.stopLiveSync();
});
</script>
<style scoped>
.home-page {
  min-height: 100vh;
  width: calc(100% + 3rem);
  margin: -1.5rem;
  background: var(--page-bg);
  color: var(--text-color);
}

.home-inner {
  max-width: 125rem;
  margin: 0 auto;
  padding: 5.5rem 1.5rem 1.5rem;
}

@media (min-width: 768px) {
  .home-page {
    width: calc(100% + 6rem);
    margin: -3rem;
  }

  .home-inner {
    padding: 5.5rem 1.5rem 1.5rem;
  }
}
</style>
