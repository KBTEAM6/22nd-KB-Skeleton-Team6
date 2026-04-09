<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  selectedCategory: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['selectCategory']);

const mockData = computed(
  () =>
    props.data || [
      { category: '식비', amount: 450000, color: '#FF8A3D' },
      { category: '주거통신', amount: 450000, color: '#7B68EE' },
      { category: '쇼핑', amount: 284000, color: '#E91E63' },
      { category: '문화', amount: 89000, color: '#FFBC50' },
      { category: '교통', amount: 67000, color: '#4A90E2' },
    ],
);

const totalAmount = computed(() => mockData.value.reduce((sum, item) => sum + item.amount, 0));
const maxAmount = computed(() => Math.max(...mockData.value.map((item) => item.amount)));

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

    <div class="w-100 d-flex rounded-3 overflow-hidden mb-4 bg-light" style="height: 32px">
      <div
        v-for="item in mockData"
        :key="item.category"
        class="h-100 transition-all cursor-pointer position-relative"
        :style="{
          width: `${(item.amount / totalAmount) * 100}%`,
          backgroundColor: item.color,
          opacity: selectedCategory && selectedCategory !== item.category ? '0.3' : '1',
        }"
        @click="handleCategoryClick(item.category)"
      >
        <div
          class="position-absolute start-50 translate-middle-x bg-dark text-white rounded z-3"
          style="top: -32px; padding: 2px 8px; font-size: 10px; white-space: nowrap; opacity: 0"
          onmouseover="this.style.opacity = '1'"
          onmouseout="this.style.opacity = '0'"
        >
          {{ item.category }}: {{ ((item.amount / maxAmount) * 100).toFixed(0) }}%
        </div>
      </div>
    </div>

    <div class="d-flex flex-column gap-3">
      <div
        v-for="item in mockData"
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
          {{ ((item.amount / maxAmount) * 100).toFixed(0) }}%
        </span>
      </div>
    </div>
  </div>
</template>
