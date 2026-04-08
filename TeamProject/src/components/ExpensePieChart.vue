<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  data?: {
    category: string
    value: number
    color: string
  }[]
}>()

const mockData = computed(() => props.data || [
  { category: '식비', value: 450000, color: '#FF8A3D' },
  { category: '교통', value: 120000, color: '#4A90E2' },
  { category: '주거통신', value: 180000, color: '#7B68EE' },
  { category: '쇼핑', value: 230000, color: '#E91E63' },
  { category: '의료', value: 150000, color: '#4CAF50' },
  { category: '문화', value: 140000, color: '#FFBC50' },
  { category: '기타', value: 90000, color: '#9E9E9E' },
])

const total = computed(() => mockData.value.reduce((sum, item) => sum + item.value, 0))

const chartData = computed(() => ({
  labels: mockData.value.map(item => item.category),
  datasets: [
    {
      backgroundColor: mockData.value.map(item => item.color),
      data: mockData.value.map(item => item.value),
      borderWidth: 0,
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  cutout: '60%',
}
</script>

<template>
  <div class="bg-white rounded-4 p-4 shadow-sm">
    <h3 class="fw-bold mb-4 fs-5">카테고리별 지출</h3>
    <div class="position-relative" style="height: 16rem;">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
    <div class="d-flex flex-column gap-2 mt-4">
      <div v-for="item in mockData" :key="item.category" class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-2">
          <div
            class="rounded-circle"
            :style="{ backgroundColor: item.color, width: '12px', height: '12px' }"
          />
          <span class="small">{{ item.category }}</span>
        </div>
        <div class="small">
          <span class="fw-medium">{{ item.value.toLocaleString() }}원</span>
          <span class="text-muted ms-2">
            ({{ ((item.value / total) * 100).toFixed(1) }}%)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
