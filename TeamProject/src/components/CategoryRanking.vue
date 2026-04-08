<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  data?: {
    category: string
    amount: number
    color: string
    count: number
  }[]
}>()

const mockData = computed(() => {
  const data = props.data || [
    { category: "식비", amount: 450000, color: "#FF8A3D", count: 8 },
    { category: "주거통신", amount: 450000, color: "#7B68EE", count: 1 },
    { category: "쇼핑", amount: 284000, color: "#E91E63", count: 2 },
    { category: "문화", amount: 89000, color: "#FFBC50", count: 1 },
    { category: "교통", amount: 67000, color: "#4A90E2", count: 1 },
    { category: "의료", amount: 50000, color: "#4CAF50", count: 1 },
    { category: "기타", amount: 30000, color: "#9E9E9E", count: 1 },
  ]
  return data.sort((a, b) => b.amount - a.amount).slice(0, 5)
})

const total = computed(() => mockData.value.reduce((sum, item) => sum + item.amount, 0))
</script>

<template>
  <div class="bg-white rounded-4 p-4 shadow-sm">
    <h3 class="fw-bold mb-4 fs-5">카테고리별 지출 순위</h3>
    <div class="d-flex flex-column gap-4">
      <div v-for="(item, index) in mockData" :key="item.category">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-3 bg-light d-flex align-items-center justify-content-center fw-bold small" style="width: 32px; height: 32px;">
              {{ index + 1 }}
            </div>
            <div class="d-flex align-items-center gap-2">
              <div
                class="rounded-circle"
                :style="{ backgroundColor: item.color, width: '12px', height: '12px' }"
              />
              <span class="fw-medium m-0">{{ item.category }}</span>
            </div>
          </div>
          <div class="text-end">
            <div class="fw-bold m-0">{{ item.amount.toLocaleString() }}원</div>
            <div class="small text-muted m-0">{{ item.count }}건</div>
          </div>
        </div>
        <div class="w-100 bg-light rounded-pill overflow-hidden" style="height: 8px;">
          <div
            class="h-100 rounded-pill transition-all"
            :style="{
              width: `${(item.amount / total) * 100}%`,
              backgroundColor: item.color,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
