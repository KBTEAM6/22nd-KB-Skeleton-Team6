<template>
  <div class="bg-white rounded-4 p-4 shadow-sm">
    <h3 class="fw-bold mb-4 fs-5">카테고리별 지출</h3>

    <div class="position-relative" style="height: 16rem">
      <div
        v-if="total === 0"
        class="position-absolute top-50 start-50 translate-middle text-muted small"
      >
        지출 내역이 없습니다
      </div>
      <Pie :data="chartData" :options="chartOptions" />
    </div>

    <div class="d-flex flex-column gap-2 mt-4">
      <div
        v-for="item in chartSource"
        :key="item.category"
        class="d-flex align-items-center justify-content-between"
      >
        <div class="d-flex align-items-center gap-2">
          <div
            class="rounded-circle"
            :style="{
              backgroundColor: item.color,
              width: '12px',
              height: '12px',
            }"
          />
          <span class="small">{{ item.category }}</span>
        </div>

        <div class="small">
          <span class="fw-medium"> {{ item.value.toLocaleString() }}원 </span>
          <span class="text-muted ms-2">
            ({{ getPercentage(item.value) }}%)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const chartSource = computed(() => props.data || []);

const total = computed(() =>
  chartSource.value.reduce((sum, item) => sum + item.value, 0),
);

const chartData = computed(() => {
  const values = chartSource.value.map((item) => item.value);
  const isAllZero = values.every((v) => v === 0);

  return {
    labels: chartSource.value.map((item) => item.category),
    datasets: [
      {
        backgroundColor: isAllZero
          ? chartSource.value.map(() => "#f0f0f0")
          : chartSource.value.map((item) => item.color),
        data: isAllZero ? [1] : values,
        borderWidth: 0,
      },
    ],
  };
});

const getPercentage = (value) => {
  if (total.value === 0) return "0.0";
  return ((value / total.value) * 100).toFixed(1);
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  cutout: "60%",
};
</script>
