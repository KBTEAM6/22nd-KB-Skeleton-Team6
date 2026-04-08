<template>
  <section>
    <h2 class="page-title">그룹가계부</h2>
    <p class="text-muted mb-3" v-if="selectedPartner">{{ selectedPartner.name }}(ID:{{ selectedPartner.id }}) 님과 1:1 그룹가계부</p>

    <article class="card-box group-panel">
      <div class="circles">
        <div class="circle">{{ authStore.currentUser.name }}</div>
        <div class="heart">♡</div>
        <div class="circle">{{ selectedPartner?.name ?? '파트너 선택' }}</div>
      </div>

      <div class="compare-row" v-for="item in compareItems" :key="item.label">
        <span class="side-value">{{ money(item.left) }}</span>
        <div class="compare-track">
          <div class="compare-fill left" :style="{ width: `${(item.left / item.max) * 100}%` }"></div>
          <div class="compare-fill right" :style="{ width: `${(item.right / item.max) * 100}%` }"></div>
          <strong>{{ item.label }}</strong>
          <small>{{ money(item.center) }}</small>
        </div>
        <span class="side-value">{{ money(item.right) }}</span>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useLedgerStore } from '../stores/ledger';
import { useMemberStore } from '../stores/member';

const authStore = useAuthStore();
const ledgerStore = useLedgerStore();
const memberStore = useMemberStore();
const route = useRoute();
const money = (value) => `${value.toLocaleString()}원`;

onMounted(async () => {
  if (memberStore.members.length === 0) {
    await memberStore.fetchMembers();
  }
  if (ledgerStore.transactions.length === 0) {
    await ledgerStore.fetchTransactions();
  }
});

const selectedPartner = computed(() => {
  const memberId = Number(route.params.id);
  if (!memberId) {
    return null;
  }
  return memberStore.members.find((member) => Number(member.id) === memberId) ?? null;
});

const monthKey = computed(() => `${ledgerStore.currentYear}-${String(ledgerStore.currentMonth).padStart(2, '0')}`);

const summaryByUserId = (userId) => {
  const scoped = ledgerStore.transactions.filter(
    (tx) => Number(tx.userId) === Number(userId) && tx.date.startsWith(monthKey.value),
  );
  const income = scoped.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const expense = scoped.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  return {
    income,
    expense,
    saving: income - expense,
  };
};

const partner = computed(() => {
  if (!selectedPartner.value) {
    return { income: 0, expense: 0, saving: 0 };
  }
  return summaryByUserId(selectedPartner.value.id);
});

const compareItems = computed(() => {
  const mine = summaryByUserId(authStore.currentUser.id);

  return [
    { label: '수입', left: mine.income, right: partner.value.income, center: mine.income + partner.value.income },
    { label: '지출', left: mine.expense, right: partner.value.expense, center: mine.expense + partner.value.expense },
    { label: '순이익', left: mine.saving, right: partner.value.saving, center: mine.saving + partner.value.saving },
  ].map((item) => ({ ...item, max: Math.max(item.left, item.right, 1) }));
});

</script>
