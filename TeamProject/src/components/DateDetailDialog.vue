<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  date: number
  income: number
  expense: number
  details: {
    id: string
    type: 'income' | 'expense'
    amount: number
    category: string
    memo: string
  }[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const mockDetails = computed(() => {
  if (props.details && props.details.length > 0) return props.details
  return [
    {
      id: '1',
      type: 'expense' as const,
      amount: 45000,
      category: '식비',
      memo: '점심 회식',
    },
    {
      id: '2',
      type: 'income' as const,
      amount: 85000,
      category: '용돈',
      memo: '부모님 용돈',
    },
  ]
})
</script>

<template>
  <div v-if="isOpen" class="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3 p-4">
    <div class="bg-white rounded-4 w-100 p-4 shadow-lg overflow-y-auto" style="max-width: 28rem; max-height: 80vh;">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <h2 class="fs-5 fw-bold m-0">{{ date }}일 상세 내역</h2>
        <button
          @click="emit('close')"
          class="btn btn-light d-flex align-items-center justify-content-center p-0"
          style="width: 32px; height: 32px; border-radius: 0.75rem;"
        >
          <X style="width: 20px; height: 20px;" />
        </button>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-6">
          <div class="bg-primary bg-opacity-10 rounded-4 p-3 h-100">
            <div class="small text-muted mb-1">수입</div>
            <div class="fs-5 fw-bold text-primary m-0">
              +{{ income.toLocaleString() }}원
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="rounded-4 p-3 h-100" style="background-color: rgba(240,68,82,0.1);">
            <div class="small text-muted mb-1">지출</div>
            <div class="fs-5 fw-bold m-0" style="color: rgb(240,68,82);">
              -{{ expense.toLocaleString() }}원
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column gap-3">
        <div
          v-for="item in mockDetails"
          :key="item.id"
          class="bg-light rounded-4 p-3 d-flex align-items-center justify-content-between"
        >
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 mb-1">
              <span
                class="px-2 py-1 rounded-3 small fw-medium"
                :class="item.type === 'income' ? 'bg-primary bg-opacity-10 text-primary' : ''"
                :style="item.type === 'expense' ? 'background-color: rgba(240,68,82,0.1); color: rgb(240,68,82);' : ''"
              >
                {{ item.category }}
              </span>
            </div>
            <div v-if="item.memo" class="small text-muted mb-0">{{ item.memo }}</div>
          </div>
          <div
            class="fs-5 fw-bold"
            :class="item.type === 'income' ? 'text-primary' : ''"
            :style="item.type === 'expense' ? 'color: rgb(240,68,82);' : ''"
          >
            {{ item.type === 'income' ? '+' : '-' }}{{ item.amount.toLocaleString() }}원
          </div>
        </div>
      </div>

      <button
        @click="emit('close')"
        class="btn w-100 mt-4 py-2 rounded-3 fw-bold border-0"
        style="background-color: rgb(255,204,80);"
      >
        닫기
      </button>
    </div>
  </div>
</template>