<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

export interface LedgerEntry {
  type: 'income' | 'expense'
  amount: number
  category: string
  date: string
  memo: string
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add', data: LedgerEntry): void
}>()

const type = ref<'income' | 'expense'>('expense')
const amount = ref('')
const category = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const memo = ref('')

const incomeCategories = ['급여', '보너스', '용돈', '기타수입']
const expenseCategories = ['식비', '교통', '주거통신', '쇼핑', '의료', '문화', '기타']

const handleAmountInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  amount.value = target.value.replace(/[^0-9]/g, '')
}

const handleSubmit = () => {
  if (!amount.value || !category.value) {
    alert('금액과 카테고리를 입력해주세요.')
    return
  }

  emit('add', {
    type: type.value,
    amount: parseInt(amount.value),
    category: category.value,
    date: date.value,
    memo: memo.value,
  })

  // Reset form
  amount.value = ''
  category.value = ''
  memo.value = ''
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3 p-4">
    <div class="bg-white rounded-4 w-100 p-4 shadow-lg" style="max-width: 28rem;">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <h2 class="fs-5 fw-bold m-0">가계부 추가</h2>
        <button
          @click="emit('close')"
          class="btn btn-light d-flex align-items-center justify-content-center p-0"
          style="width: 32px; height: 32px; border-radius: 0.75rem;"
        >
          <X style="width: 20px; height: 20px;" />
        </button>
      </div>

      <div class="d-flex flex-column gap-3">
        <div>
          <label class="small text-muted mb-2 d-block">구분</label>
          <div class="d-flex gap-2">
            <button
              @click="type = 'income'"
              class="btn flex-grow-1 py-2 rounded-3 border-0"
              :class="type === 'income' ? 'btn-primary text-white' : 'btn-light text-muted'"
            >
              수입
            </button>
            <button
              @click="type = 'expense'"
              class="btn flex-grow-1 py-2 rounded-3 border-0"
              :class="type === 'expense' ? 'text-white' : 'btn-light text-muted'"
              :style="type === 'expense' ? 'background-color: rgb(240,68,82);' : ''"
            >
              지출
            </button>
          </div>
        </div>

        <div>
          <label class="small text-muted mb-2 d-block">금액</label>
          <input
            type="text"
            inputmode="numeric"
            :value="amount"
            @input="handleAmountInput"
            placeholder="금액을 입력하세요"
            class="form-control py-2 rounded-3 bg-light border-0"
          />
        </div>

        <div>
          <label class="small text-muted mb-2 d-block">카테고리</label>
          <div class="row g-2">
            <div class="col-3" v-for="cat in (type === 'income' ? incomeCategories : expenseCategories)" :key="cat">
              <button
                @click="category = cat"
                class="btn w-100 py-2 rounded-3 small border-0"
                :class="category === cat ? (type === 'income' ? 'btn-primary text-white' : 'text-white') : 'btn-light text-muted'"
                :style="category === cat && type === 'expense' ? 'background-color: rgb(240,68,82);' : ''"
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label class="small text-muted mb-2 d-block">날짜</label>
          <input
            type="date"
            v-model="date"
            class="form-control py-2 rounded-3 bg-light border-0"
          />
        </div>

        <div>
          <label class="small text-muted mb-2 d-block">메모</label>
          <textarea
            v-model="memo"
            placeholder="메모를 입력하세요 (선택)"
            rows="3"
            class="form-control py-2 rounded-3 bg-light border-0"
            style="resize: none;"
          />
        </div>
      </div>

      <div class="d-flex gap-2 mt-4">
        <button
          @click="emit('close')"
          class="btn btn-light flex-grow-1 py-2 rounded-3 text-muted border-0"
        >
          취소
        </button>
        <button
          @click="handleSubmit"
          class="btn flex-grow-1 py-2 rounded-3 fw-bold border-0"
          style="background-color: rgb(255,204,80);"
        >
          추가하기
        </button>
      </div>
    </div>
  </div>
</template>