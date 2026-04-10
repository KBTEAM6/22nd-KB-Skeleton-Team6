<template>
  <div class="d-flex flex-column gap-4">
    <div class="d-flex align-items-center justify-content-between">
      <h2 class="fs-4 fw-bold mb-0">
        {{ ledgerDate.getFullYear() }}년 {{ ledgerDate.getMonth() + 1 }}월
      </h2>
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
        <CategoryBarChart
          :selectedCategory="selectedCategory"
          @selectCategory="handleCategorySelect"
        />
        <CategoryRanking />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useLedgerStore } from "@/stores/ledger";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import TransactionList from "@/components/ledger/TransactionList.vue";
import CategoryBarChart from "@/components/ledger/CategoryBarChart.vue";
import CategoryRanking from "@/components/ledger/CategoryRanking.vue";

const ledgerStore = useLedgerStore();
const selectedCategory = ref(null);
const ledgerDate = ref(
  new Date(ledgerStore.currentYear, ledgerStore.currentMonth - 1, 1),
);

// 페이지 로드 시 데이터 가져오기
onMounted(() => {
  ledgerStore.fetchTransactions();
});

// 날짜 변경 시 스토어 상태 업데이트
watch(ledgerDate, (newDate) => {
  ledgerStore.currentYear = newDate.getFullYear();
  ledgerStore.currentMonth = newDate.getMonth() + 1;
  // 스토어 필터링(computed)이 자동으로 작동하여 TransactionList의 데이터가 변경됩니다.
});

const handleCategorySelect = (category) => {
  selectedCategory.value = category;
};

const prevMonth = () => {
  ledgerDate.value = new Date(
    ledgerDate.value.getFullYear(),
    ledgerDate.value.getMonth() - 1,
    1,
  );
};

const nextMonth = () => {
  ledgerDate.value = new Date(
    ledgerDate.value.getFullYear(),
    ledgerDate.value.getMonth() + 1,
    1,
  );
};
</script>
