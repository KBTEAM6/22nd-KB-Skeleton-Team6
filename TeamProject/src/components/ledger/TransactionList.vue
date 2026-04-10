<template>
  <div class="bg-white rounded-4 p-4 shadow-sm" style="min-height: 400px">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h3 class="fw-bold m-0 fs-5">
        거래 내역
        <span v-if="selectedCategory" class="small fw-normal text-muted ms-2">
          ({{ selectedCategory }})
        </span>
      </h3>
      <div v-if="selectedCategory" class="small text-muted">
        {{ filteredTransactions.length }}건 검색됨
      </div>
    </div>

    <div
      v-if="filteredTransactions.length === 0"
      class="text-center py-5 text-muted"
    >
      이번 달 거래 내역이 없습니다.
    </div>

    <div class="d-flex flex-column gap-3">
      <div
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        class="d-flex align-items-center justify-content-between py-3 border-bottom"
      >
        <div class="d-flex align-items-center gap-3">
          <div
            class="d-flex align-items-center justify-content-center rounded-3"
            :style="
              transaction.type === 'INCOME'
                ? 'width: 40px; height: 40px; background-color: rgba(13, 110, 253, 0.1);'
                : 'width: 40px; height: 40px; background-color: rgba(240, 68, 82, 0.1);'
            "
          >
            <ArrowUpRight
              v-if="transaction.type === 'INCOME'"
              class="text-primary"
              style="width: 20px; height: 20px"
            />
            <ArrowDownRight
              v-else
              style="width: 20px; height: 20px; color: rgb(240, 68, 82)"
            />
          </div>

          <div>
            <div class="fw-medium mb-0">
              {{ transaction.memo || "내역 없음" }}
            </div>
            <div class="small text-muted mb-0">
              {{ transaction.category }} · {{ formatDate(transaction.date) }}
            </div>
          </div>
        </div>

        <div
          class="fw-bold"
          :class="transaction.type === 'INCOME' ? 'text-primary' : ''"
          :style="
            transaction.type === 'EXPENSE' ? 'color: rgb(240, 68, 82);' : ''
          "
        >
          {{ transaction.type === "INCOME" ? "+" : "-"
          }}{{ transaction.amount.toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ArrowDownRight, ArrowUpRight } from "lucide-vue-next";
import { useLedgerStore } from "@/stores/ledger";

const props = defineProps({
  selectedCategory: {
    type: String,
    default: null,
  },
});

const ledgerStore = useLedgerStore();

const filteredTransactions = computed(() => {
  // 이번 달 전체 데이터를 가져오기
  const data = ledgerStore.monthlyTransactions;

  // 카테고리가 선택된 경우 (차트를 클릭한 경우)
  if (props.selectedCategory) {
    return data.filter(
      (t) =>
        // 카테고리 명칭이 일치하면서
        t.category === props.selectedCategory &&
        // 동시에 타입이 지출(EXPENSE)인 것만 필터링
        t.type === "EXPENSE",
    );
  }

  // 3. 카테고리 선택이 없는 평상시에는 전체 데이터(수입+지출)를 반환
  return data;
});

// 날짜 포맷팅 유틸리티
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
};
</script>
