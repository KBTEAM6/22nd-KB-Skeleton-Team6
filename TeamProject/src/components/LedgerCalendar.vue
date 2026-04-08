<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

export interface DayData {
  date: number
  income: number
  expense: number
  details?: {
    id: string
    type: 'income' | 'expense'
    amount: number
    category: string
    memo: string
  }[]
}

const emit = defineEmits<{
  (e: 'dateClick', date: number, data: DayData): void
}>()

const currentDate = ref(new Date(2026, 3, 1)) // April 2026

// Mock data
const mockData: Record<number, DayData> = {
  1: { date: 1, income: 85000, expense: 45000, details: [] },
  2: { date: 2, income: 0, expense: 128000, details: [] },
  3: { date: 3, income: 0, expense: 89000, details: [] },
  5: { date: 5, income: 3500000, expense: 450000, details: [] },
  7: { date: 7, income: 0, expense: 234000, details: [] },
  9: { date: 9, income: 120000, expense: 67000, details: [] },
  11: { date: 11, income: 0, expense: 156000, details: [] },
}

const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

const days = computed(() => {
  const y = year.value
  const m = month.value
  const firstDay = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()

  return Array.from({ length: firstDay + daysInMonth }, (_, i) => {
    if (i < firstDay) return null
    return i - firstDay + 1
  })
})

const weekDays = ['일', '월', '화', '수', '목', '금', '토']

const prevMonth = () => {
  currentDate.value = new Date(year.value, month.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(year.value, month.value + 1, 1)
}

const handleClick = (day: number | null) => {
  if (!day) return
  const data = mockData[day]
  const hasData = data && (data.income > 0 || data.expense > 0)
  if (hasData) {
    emit('dateClick', day, data)
  }
}
</script>

<template>
  <div class="bg-white rounded-4 p-4 shadow-sm">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2 class="fs-5 fw-bold m-0">
        {{ year }}년 {{ month + 1 }}월
      </h2>
      <div class="d-flex gap-2">
        <button
          @click="prevMonth"
          class="btn btn-light d-flex align-items-center justify-content-center p-0 border-0"
          style="width: 36px; height: 36px; border-radius: 0.75rem;"
        >
          <ChevronLeft style="width: 20px; height: 20px;" />
        </button>
        <button
          @click="nextMonth"
          class="btn btn-light d-flex align-items-center justify-content-center p-0 border-0"
          style="width: 36px; height: 36px; border-radius: 0.75rem;"
        >
          <ChevronRight style="width: 20px; height: 20px;" />
        </button>
      </div>
    </div>

    <div class="d-grid gap-2" style="grid-template-columns: repeat(7, minmax(0, 1fr));">
      <div
        v-for="(day, idx) in weekDays"
        :key="day"
        class="text-center small fw-medium py-2"
        :class="idx === 0 ? '' : idx === 6 ? 'text-primary' : 'text-muted'"
        :style="idx === 0 ? 'color: rgb(240,68,82);' : ''"
      >
        {{ day }}
      </div>

      <template v-for="(day, idx) in days" :key="`day-${idx}`">
        <div v-if="!day"></div>
        <button
          v-else
          @click="handleClick(day)"
          class="btn border-0 p-1 text-start rounded-3"
          :class="mockData[day] && (mockData[day].income > 0 || mockData[day].expense > 0) ? 'btn-light' : 'bg-transparent'"
          style="aspect-ratio: 1;"
        >
          <div
            class="small mb-1 d-block"
            :class="idx % 7 === 0 ? '' : idx % 7 === 6 ? 'text-primary' : ''"
            :style="idx % 7 === 0 ? 'color: rgb(240,68,82);' : ''"
          >
            {{ day }}
          </div>
          <div
            v-if="mockData[day] && (mockData[day].income > 0 || mockData[day].expense > 0)"
            class="d-flex flex-column gap-1"
          >
            <div v-if="mockData[day].income > 0" class="text-primary text-truncate" style="font-size: 10px;">
              +{{ mockData[day].income.toLocaleString() }}
            </div>
            <div v-if="mockData[day].expense > 0" class="text-truncate" style="color: rgb(240,68,82); font-size: 10px;">
              -{{ mockData[day].expense.toLocaleString() }}
            </div>
          </div>
        </button>
      </template>
    </div>
  </div>
</template>