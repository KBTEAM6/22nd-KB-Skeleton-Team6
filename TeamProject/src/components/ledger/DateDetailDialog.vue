<script setup>
import { X } from "lucide-vue-next";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
  details: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div
    v-if="isOpen"
    class="dialog-backdrop position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center z-3 p-4"
  >
    <div
      class="dialog-card rounded-4 w-100 p-4 shadow-lg overflow-y-auto"
      style="max-width: 28rem; max-height: 80vh"
    >
      <div class="d-flex align-items-center justify-content-between mb-4">
        <h2 class="fs-5 fw-bold m-0">{{ date }}일 상세 내역</h2>
        <button
          @click="emit('close')"
          class="dialog-close-btn d-flex align-items-center justify-content-center p-0"
          type="button"
        >
          <X style="width: 20px; height: 20px" />
        </button>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-6">
          <div class="income-box rounded-4 p-3 h-100">
            <div class="small dialog-subtext mb-1">수입</div>
            <div class="fs-5 fw-bold text-primary m-0">
              +{{ income.toLocaleString() }}원
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="expense-box rounded-4 p-3 h-100">
            <div class="small dialog-subtext mb-1">지출</div>
            <div class="fs-5 fw-bold expense-text m-0">
              -{{ expense.toLocaleString() }}원
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column gap-3">
        <div
          v-for="item in details"
          :key="item.id"
          class="detail-item rounded-4 p-3 d-flex align-items-center justify-content-between"
        >
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 mb-1">
              <span
                class="px-2 py-1 rounded-3 small fw-medium"
                :class="
                  item.type === 'INCOME' ? 'income-badge' : 'expense-badge'
                "
              >
                {{ item.category }}
              </span>
            </div>

            <div v-if="item.memo" class="small dialog-subtext mb-0">
              {{ item.memo }}
            </div>
          </div>

          <div
            class="fs-6 fw-bold"
            :class="item.type === 'INCOME' ? 'text-primary' : 'expense-text'"
          >
            {{ item.type === "INCOME" ? "+" : "-"
            }}{{ item.amount.toLocaleString() }}원
          </div>
        </div>
      </div>

      <button
        @click="emit('close')"
        class="btn w-100 mt-4 py-2 rounded-3 fw-bold border-0 dialog-close-main"
      >
        닫기
      </button>
    </div>
  </div>
</template>
<style scoped>
.dialog-backdrop {
  background: rgba(17, 24, 39, 0.55);
}

.dialog-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.dialog-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  background: var(--sub-bg);
  color: var(--text-color);
}

.dialog-close-btn:hover {
  background: var(--card-bg);
}

.income-box {
  background: rgba(13, 110, 253, 0.1);
}

.expense-box {
  background-color: rgba(240, 68, 82, 0.1);
}

.expense-text {
  color: rgb(240, 68, 82);
}

.dialog-subtext {
  color: var(--text-muted);
}

.detail-item {
  background: var(--sub-bg);
}

.income-badge {
  background: rgba(13, 110, 253, 0.1);
  color: var(--bs-primary, #0d6efd);
}

.expense-badge {
  background-color: rgba(240, 68, 82, 0.1);
  color: rgb(240, 68, 82);
}

.dialog-close-main {
  background-color: rgb(255, 204, 80);
  color: #1f2937;
}
</style>
