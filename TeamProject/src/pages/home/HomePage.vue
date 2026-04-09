<template>
  <div class="p-4 p-md-5 d-flex flex-column gap-4">
    <SummaryCards
      :totalIncome="ledgerStore.totalIncome"
      :totalExpense="ledgerStore.totalExpense"
    />
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <LedgerCalendar @dateClick="handleDateClick" />
      </div>
      <div class="col-12 col-lg-4 d-flex flex-column gap-4">
        <ExpensePieChart :data="ledgerStore.categoryExpenseChartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useLedgerStore } from "@/stores/ledger";
import SummaryCards from "@/components/home/SummaryCards.vue";
import LedgerCalendar from "@/components/ledger/LedgerCalendar.vue";
import ExpensePieChart from "@/components/home/ExpensePieChart.vue";

// 가계부 스토어 가져오기
const ledgerStore = useLedgerStore();

onMounted(() => {
  // 컴포넌트가 마운트될 때 가계부 데이터 조회 시작
  ledgerStore.fetchTransactions();
});

onUnmounted(() => {
  // 컴포넌트가 언마운트될 때 리소스 정리
  ledgerStore.stopLiveSync();
});

// const isDateDetailOpen = ref(false);
// const selectedDate = ref(null);

// const handleDateClick = (date, data) => {
//   selectedDate.value = data;
//   isDateDetailOpen.value = true;
// };
</script>
