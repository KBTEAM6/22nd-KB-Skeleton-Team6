<script setup>
import { ref } from 'vue';
import SummaryCards from '@/components/home/SummaryCards.vue';
import LedgerCalendar from '@/components/ledger/LedgerCalendar.vue';
import ExpensePieChart from '@/components/home/ExpensePieChart.vue';
import DateDetailDialog from '@/components/ledger/DateDetailDialog.vue';

const isDateDetailOpen = ref(false);
const selectedDate = ref(null);

const handleDateClick = (date, data) => {
  selectedDate.value = data;
  isDateDetailOpen.value = true;
};
</script>

<template>
  <div class="p-4 p-md-5 d-flex flex-column gap-4">
    <SummaryCards :totalIncome="3705000" :totalExpense="1070000" />
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <LedgerCalendar @dateClick="handleDateClick" />
      </div>
      <div class="col-12 col-lg-4 d-flex flex-column gap-4">
        <ExpensePieChart />
      </div>
    </div>
  </div>
</template>
