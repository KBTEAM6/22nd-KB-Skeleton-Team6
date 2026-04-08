<template>
  <section>
    <div class="month-header">
      <button class="btn btn-outline-secondary btn-sm" @click="prevMonth">
        ◀
      </button>
      <h2 class="page-title mb-0">{{ store.currentMonth }}월</h2>
      <button class="btn btn-outline-secondary btn-sm" @click="nextMonth">
        ▶
      </button>
    </div>

    <div class="ledger-layout">
      <article class="card-box tx-list">
        <h3>최근 거래내역</h3>
        <ul class="scroll-list">
          <li v-for="tx in filteredTransactions" :key="tx.id">
            <span class="tx-date">{{ tx.date }}</span>
            <strong>{{ tx.category }}</strong>
            <span class="tx-amount" :class="tx.type">{{
              money(tx.amount)
            }}</span>
            <div class="tx-actions">
              <button class="more-btn" @click="toggleActionMenu(tx.id)">
                ⋮
              </button>
            </div>
            <div v-if="actionMenuId === tx.id" class="tx-inline-actions">
              <button @click="">수정</button>
              <button class="danger" @click="">삭제</button>
              <!-- <button @click="startEdit(tx)">수정</button>
              <button class="danger" @click="removeTransaction(tx.id)">삭제</button> -->
            </div>
          </li>
          <li v-if="filteredTransactions.length === 0" class="list-empty">
            선택한 카테고리 거래가 없습니다.
          </li>
        </ul>
      </article>

      <article class="card-box">
        <h3>카테고리</h3>
        <div class="rainbow-toggles">
          <button
            v-for="item in categoryStats"
            :key="item.name"
            class="rainbow-segment"
            :style="{
              backgroundColor: item.color,
              flexGrow: Math.max(item.total, 1),
            }"
            :class="{ active: selectedCategory === item.name }"
            @click="toggleCategory(item.name)"
          ></button>
        </div>

        <div class="category-item" v-for="cat in categoryStats" :key="cat.name">
          <button
            class="dot clickable"
            :style="{ backgroundColor: cat.color }"
            @click="toggleCategory(cat.name)"
          ></button>
          <span>{{ cat.name }}</span>
          <span>{{ money(cat.total) }}</span>
        </div>
      </article>
    </div>

    <article class="card-box memo-board" v-if="memoTransactions.length">
      <h3>메모 거래 카드</h3>
      <div class="memo-board-grid">
        <div
          class="memo-card"
          v-for="tx in memoTransactions"
          :key="`memo-${tx.id}`"
        >
          <div class="memo-meta">
            <span>{{ tx.date }}</span>
            <span :class="['memo-amount', tx.type]">{{
              money(tx.amount)
            }}</span>
          </div>
          <strong class="memo-category">{{ tx.category }}</strong>
          <p class="memo-text">{{ tx.memo }}</p>
        </div>
      </div>
    </article>

    <div
      v-if="showEditModal"
      class="modal-overlay"
      @click.self="showEditModal = false"
    >
      <form class="card-box tx-modal" @submit.prevent="submitEdit">
        <div class="popup-head">
          <h3 class="mb-0">내역 수정</h3>
          <button
            type="button"
            class="close-btn"
            @click="showEditModal = false"
          >
            ✕
          </button>
        </div>
        <div class="type-row">
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: editForm.type === 'income' }"
            @click="editForm.type = 'income'"
          >
            수입
          </button>
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: editForm.type === 'expense' }"
            @click="editForm.type = 'expense'"
          >
            지출
          </button>
        </div>
        <label
          >금액
          <input
            v-model.number="editForm.amount"
            type="number"
            min="0"
            required
        /></label>
        <label>
          카테고리
          <select v-model="editForm.category" required>
            <option
              v-for="category in editCategories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </label>
        <label
          >날짜 <input v-model="editForm.date" type="date" required
        /></label>
        <label>메모 <input v-model="editForm.memo" /></label>
        <small v-if="editError" class="expense">{{ editError }}</small>
        <button class="btn btn-dark">수정 저장</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import {
  expenseCategories,
  incomeCategories,
  useLedgerStore,
} from '../stores/ledger';

const store = useLedgerStore();
const selectedCategory = ref('');
const actionMenuId = ref(null);
const showEditModal = ref(false);
const editError = ref('');
const editingId = ref(null);
const editForm = reactive({
  type: 'expense',
  amount: 0,
  category: expenseCategories[0],
  date: '',
  memo: '',
});
const money = (value) => `${value.toLocaleString()}원`;
const editCategories = computed(() =>
  editForm.type === 'income' ? incomeCategories : expenseCategories,
);

const categoryStats = computed(() => {
  const map = new Map();
  for (const tx of store.monthlyTransactions.filter(
    (item) => item.type === 'expense',
  )) {
    map.set(tx.category, (map.get(tx.category) ?? 0) + tx.amount);
  }

  return Array.from(map.entries()).map(([name, total]) => ({
    name,
    total,
    color: store.getCategoryColor(name),
  }));
});

const filteredTransactions = computed(() => {
  if (!selectedCategory.value) {
    return store.monthlyTransactions;
  }

  return store.monthlyTransactions.filter(
    (tx) => tx.category === selectedCategory.value,
  );
});

const memoTransactions = computed(() =>
  filteredTransactions.value
    .filter((tx) => typeof tx.memo === 'string' && tx.memo.trim())
    .slice()
    .reverse(),
);

watch(
  () => editForm.type,
  () => {
    if (!editCategories.value.includes(editForm.category)) {
      editForm.category = editCategories.value[0] ?? '';
    }
  },
);

const toggleCategory = (name) => {
  selectedCategory.value = selectedCategory.value === name ? '' : name;
};

const toggleActionMenu = (txId) => {
  actionMenuId.value = actionMenuId.value === txId ? null : txId;
};

const startEdit = (tx) => {
  editingId.value = tx.id;
  editForm.type = tx.type;
  editForm.amount = tx.amount;
  editForm.category = tx.category;
  editForm.date = tx.date;
  editForm.memo = tx.memo ?? '';
  editError.value = '';
  actionMenuId.value = null;
  showEditModal.value = true;
};

const submitEdit = async () => {
  editError.value = '';
  if (!editingId.value) {
    return;
  }

  try {
    await store.updateTransaction(editingId.value, {
      type: editForm.type,
      amount: Number(editForm.amount),
      category: editForm.category,
      date: editForm.date,
      memo: editForm.memo,
    });
    showEditModal.value = false;
  } catch (error) {
    editError.value =
      error instanceof Error ? error.message : '수정 중 오류가 발생했습니다.';
  }
};

const removeTransaction = async (txId) => {
  const ok = window.confirm(
    '이 거래내역을 삭제할까요? 삭제 후 복구할 수 없습니다.',
  );
  if (!ok) {
    return;
  }

  await store.deleteTransaction(txId);
  actionMenuId.value = null;
};

const prevMonth = () => {
  if (store.currentMonth === 1) {
    store.currentMonth = 12;
    store.currentYear -= 1;
    return;
  }
  store.currentMonth -= 1;
};

const nextMonth = () => {
  if (store.currentMonth === 12) {
    store.currentMonth = 1;
    store.currentYear += 1;
    return;
  }
  store.currentMonth += 1;
};
</script>
