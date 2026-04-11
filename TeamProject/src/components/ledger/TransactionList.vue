<template>
  <div class="ledger-card rounded-4 p-4" style="min-height: 400px">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h3 class="fw-bold m-0 fs-5">
        거래 내역
        <span v-if="selectedCategory" class="small fw-normal list-subtext ms-2">
          ({{ selectedCategory }})
        </span>
      </h3>

      <div v-if="selectedCategory" class="small list-subtext">
        {{ filteredTransactions.length }}건 검색됨
      </div>
    </div>

    <div
      v-if="filteredTransactions.length === 0"
      class="text-center py-5 list-subtext"
    >
      이번 달 거래 내역이 없습니다.
    </div>

    <div class="d-flex flex-column gap-3">
      <div
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        class="transaction-row d-flex align-items-center justify-content-between py-3"
      >
        <div class="d-flex align-items-center gap-3">
          <div
            class="transaction-icon d-flex align-items-center justify-content-center rounded-3"
            :class="
              transaction.type === 'INCOME'
                ? 'transaction-icon-income'
                : 'transaction-icon-expense'
            "
          >
            <ArrowUpRight
              v-if="transaction.type === 'INCOME'"
              class="text-primary"
              style="width: 20px; height: 20px"
            />
            <ArrowDownRight
              v-else
              class="expense-arrow"
              style="width: 20px; height: 20px"
            />
          </div>

          <div>
            <div class="fw-medium mb-0">
              {{ transaction.memo || "내역 없음" }}
            </div>
            <div class="small list-subtext mb-0">
              {{ transaction.category }} · {{ formatDate(transaction.date) }}
            </div>
          </div>
        </div>

        <div
          class="fw-bold"
          :class="
            transaction.type === 'INCOME' ? 'text-primary' : 'expense-text'
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
<style scoped>
.ledger-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.list-subtext {
  color: var(--text-muted);
}

.transaction-row {
  border-bottom: 1px solid var(--border-light);
}

.transaction-row:last-child {
  border-bottom: none;
}

.transaction-icon {
  width: 40px;
  height: 40px;
}

.transaction-icon-income {
  background-color: rgba(13, 110, 253, 0.1);
}

.transaction-icon-expense {
  background-color: rgba(240, 68, 82, 0.1);
}

.expense-arrow,
.expense-text {
  color: rgb(240, 68, 82);
}
</style>
