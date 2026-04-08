<script setup lang="ts">
import { computed } from 'vue'
import { ArrowDownRight, ArrowUpRight } from "lucide-vue-next";

export interface Transaction {
  id: string;
  date: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  memo: string;
}

const props = defineProps<{
  transactions?: Transaction[]
  selectedCategory?: string | null
}>()

const mockTransactions = computed(() => {
  const data = props.transactions || [
    { id: "1", date: "2026-04-01", type: "income", amount: 85000, category: "용돈", memo: "부모님 용돈" },
    { id: "2", date: "2026-04-01", type: "expense", amount: 45000, category: "식비", memo: "마트 장보기" },
    { id: "3", date: "2026-04-02", type: "expense", amount: 128000, category: "쇼핑", memo: "의류 구매" },
    { id: "4", date: "2026-04-03", type: "expense", amount: 89000, category: "문화", memo: "영화 및 저녁" },
    { id: "5", date: "2026-04-05", type: "income", amount: 3500000, category: "급여", memo: "4월 급여" },
    { id: "6", date: "2026-04-05", type: "expense", amount: 450000, category: "주거통신", memo: "월세 및 관리비" },
    { id: "7", date: "2026-04-07", type: "expense", amount: 234000, category: "식비", memo: "외식 및 배달" },
    { id: "8", date: "2026-04-09", type: "income", amount: 120000, category: "부수입", memo: "프리랜서 작업" },
    { id: "9", date: "2026-04-09", type: "expense", amount: 67000, category: "교통", memo: "주유 및 주차" },
    { id: "10", date: "2026-04-11", type: "expense", amount: 156000, category: "쇼핑", memo: "생활용품 구매" },
  ];

  if (props.selectedCategory) {
    return data.filter(t => t.category === props.selectedCategory)
  }
  return data
})
</script>

<template>
  <div class="bg-white rounded-4 p-4 shadow-sm" style="min-height: 400px;">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h3 class="fw-bold m-0 fs-5">
        거래 내역
        <span v-if="selectedCategory" class="small fw-normal text-muted ms-2">
          ({{ selectedCategory }})
        </span>
      </h3>
      <div v-if="selectedCategory" class="small text-muted">
        {{ mockTransactions.length }}건 검색됨
      </div>
    </div>
    <div class="d-flex flex-column gap-3">
      <div
        v-for="transaction in mockTransactions"
        :key="transaction.id"
        class="d-flex align-items-center justify-content-between py-3 border-bottom"
      >
        <div class="d-flex align-items-center gap-3">
          <div
            class="d-flex align-items-center justify-content-center rounded-3"
            :class="transaction.type === 'income' ? 'bg-primary bg-opacity-10' : ''"
            :style="transaction.type === 'expense' ? 'width: 40px; height: 40px; background-color: rgba(240,68,82,0.1);' : 'width: 40px; height: 40px;'"
          >
            <ArrowUpRight v-if="transaction.type === 'income'" class="text-primary" style="width: 20px; height: 20px;" />
            <ArrowDownRight v-else style="width: 20px; height: 20px; color: rgb(240,68,82);" />
          </div>
          <div>
            <div class="fw-medium mb-0">{{ transaction.memo }}</div>
            <div class="small text-muted mb-0">
              {{ transaction.category }} · {{ new Date(transaction.date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) }}
            </div>
          </div>
        </div>
        <div
          class="fw-bold"
          :class="transaction.type === 'income' ? 'text-primary' : ''"
          :style="transaction.type === 'expense' ? 'color: rgb(240,68,82);' : ''"
        >
          {{ transaction.type === "income" ? "+" : "-" }}{{ transaction.amount.toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>
