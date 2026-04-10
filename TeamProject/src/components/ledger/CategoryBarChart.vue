<script setup>
import { computed } from 'vue';
import { useLedgerStore } from '@/stores/ledger';

const props = defineProps({
  selectedCategory: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['selectCategory']);
const ledgerStore = useLedgerStore();

// 1. 스토어의 실제 데이터를 가져오고 금액이 있는 것만 필터링
const chartData = computed(() => {
  return ledgerStore.categoryExpenseChartData
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value); // 비중이 큰 순서대로 정렬
});

// 2. 전체 지출 합계 (비중 계산용)
const totalAmount = computed(() => 
  chartData.value.reduce((sum, item) => sum + item.value, 0)
);

// 카테고리 클릭 핸들러
const handleCategoryClick = (category) => {
  if (props.selectedCategory === category) {
    emit('selectCategory', null);
  } else {
    emit('selectCategory', category);
  }
};
</script>

<template>
  <div class="bg-white rounded-4 p-4 shadow-sm">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h3 class="fw-bold m-0 fs-5">카테고리별 지출 비중</h3>
      <button
        v-if="selectedCategory"
        @click="emit('selectCategory', null)"
        class="btn btn-link text-decoration-none small text-muted p-0"
      >
        전체 보기
      </button>
    </div>

    <template v-if="chartData.length > 0">
      <div class="w-100 d-flex rounded-3 overflow-hidden mb-4 bg-light" style="height: 32px">
        <div
          v-for="item in chartData"
          :key="item.category"
          class="h-100 transition-all cursor-pointer position-relative"
          :style="{
            width: `${(item.value / totalAmount) * 100}%`,
            backgroundColor: item.color,
            opacity: selectedCategory && selectedCategory !== item.category ? '0.3' : '1',
          }"
          @click="handleCategoryClick(item.category)"
          :title="`${item.category}: ${((item.value / totalAmount) * 100).toFixed(1)}%`"
        >
        </div>
      </div>

      <div class="d-flex flex-column gap-3">
        <div
          v-for="item in chartData"
          :key="item.category"
          class="d-flex align-items-center gap-3 cursor-pointer p-2 rounded-3"
          :class="selectedCategory === item.category ? 'bg-light' : ''"
          @click="handleCategoryClick(item.category)"
        >
          <div
            class="rounded-circle flex-shrink-0"
            :style="{ backgroundColor: item.color, width: '12px', height: '12px' }"
          />
          <span
            class="small fw-medium mb-0"
            :class="selectedCategory === item.category ? 'text-dark' : 'text-muted'"
          >
            {{ item.category }}
          </span>
          <span class="small fw-bold ms-auto mb-0">
            {{ ((item.value / totalAmount) * 100).toFixed(0) }}%
          </span>
        </div>
      </div>
    </template>

    <div v-else class="py-5 text-center bg-light rounded-3">
      <p class="text-muted small mb-0">지출 데이터가 없습니다.</p>
    </div>
  </div>
</template>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}
.cursor-pointer {
  cursor: pointer;
}
</style>