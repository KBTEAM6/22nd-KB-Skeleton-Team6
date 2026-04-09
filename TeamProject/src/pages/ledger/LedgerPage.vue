<script setup>
import { ref } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import TransactionList from '@/components/ledger/TransactionList.vue';
import CategoryBarChart from '@/components/ledger/CategoryBarChart.vue';
import CategoryRanking from '@/components/ledger/CategoryRanking.vue';

const ledgerDate = ref(new Date(2026, 3, 1));
const selectedCategory = ref(null);

const handleCategorySelect = (category) => {
  selectedCategory.value = category;
};

const prevMonth = () => {
  ledgerDate.value = new Date(ledgerDate.value.getFullYear(), ledgerDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  ledgerDate.value = new Date(ledgerDate.value.getFullYear(), ledgerDate.value.getMonth() + 1, 1);
};
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <div class="d-flex align-items-center justify-content-between">
      <h2 class="fs-4 fw-bold mb-0">{{ ledgerDate.getFullYear() }}년 {{ ledgerDate.getMonth() + 1 }}월</h2>
      <div class="d-flex gap-2">
        <button
          @click="prevMonth"
          class="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
          style="width: 36px; height: 36px; border-radius: 0.75rem"
        >
          <ChevronLeft style="width: 20px; height: 20px" />
        </button>
        <button
          @click="nextMonth"
          class="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
          style="width: 36px; height: 36px; border-radius: 0.75rem"
        >
          <ChevronRight style="width: 20px; height: 20px" />
        </button>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <TransactionList :selectedCategory="selectedCategory" />
      </div>
      <div class="col-12 col-lg-4 d-flex flex-column gap-4">
        <CategoryBarChart :selectedCategory="selectedCategory" @selectCategory="handleCategorySelect" />
        <CategoryRanking />
      </div>
    </div>
  </div>
</template>
