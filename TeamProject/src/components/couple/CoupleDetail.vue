<template>
  <div class="couple-detail-page">
    <div
      class="container-fluid px-0 mx-auto d-flex flex-column gap-4 couple-detail-inner"
      style="max-width: 80rem"
    >
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 class="fs-4 fw-bold m-0">연동가계부</h2>
          <p class="section-desc m-0 mt-1">
            배우자와 함께 투명하고 스마트하게 자산을 관리하세요.
          </p>
        </div>
      </div>

      <div
        class="couple-hero p-5 rounded-4 position-relative overflow-hidden d-flex flex-column align-items-center mb-5"
      >
        <button
          type="button"
          class="couple-edit-btn rounded-circle d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-3 shadow-sm border-0 z-3"
          style="width: 3rem; height: 3rem"
          @click="startEditingMessage('user')"
        >
          <span class="material-symbols-outlined fs-5">edit</span>
        </button>

        <div
          class="position-relative z-3 d-flex align-items-center justify-content-center w-100"
          style="max-width: 64rem"
        >
          <div
            class="d-flex align-items-center justify-content-end gap-3 flex-grow-1"
          >
            <div
              class="message-box px-3 py-2 rounded-4 shadow-sm small fw-bold d-none d-xl-block position-relative"
              style="white-space: nowrap"
            >
              <template v-if="editingMessage === 'user'">
                <div class="d-flex align-items-center gap-2">
                  <input
                    v-model="editableMessages.user"
                    type="text"
                    class="form-control form-control-sm"
                    maxlength="20"
                    @keyup.enter="saveMessage('user')"
                  />
                </div>
              </template>
              <template v-else>
                {{ statusMessages.user }}
              </template>
            </div>

            <div class="d-flex flex-column align-items-center gap-2">
              <div
                class="profile-avatar rounded-circle border border-4 shadow-sm overflow-hidden"
                style="width: 96px; height: 96px"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNIIDy95gFmVazSnu0Dp0YWLK2QW2DKtqkYiveCNqRrb6l5-WOxHxRNQngbDy5-7CAXCMEOBXjEj0wjSzB89Td4Pa4-Z_-v3vg8BtGXC3teL2OO8lAEplshWocWNRRT8TgxvtUQriz1rnS8-Vx7ZoEJrpsD-6iHSxAxNtueCCVugstTpXWUPKDTsAYfqfRn7_oHGtrcMt7vRG-bp_YEkCP857HEkA_UgKLFe0YlJEUHA6DuAbQ8DpMOcaid534r6qsyYBt1bdawRrp"
                  class="w-100 h-100 object-fit-cover"
                />
              </div>
              <span
                class="name-pill px-3 py-1 rounded-pill small fw-bold text-nowrap"
              >
                {{ userName }}
              </span>
            </div>
          </div>

          <div
            class="d-flex flex-column align-items-center gap-2 px-3 px-md-5 flex-shrink-0"
          >
            <button
              type="button"
              class="heart-badge rounded-circle d-flex align-items-center justify-content-center shadow-sm border-0"
              style="width: 48px; height: 48px; cursor: pointer"
              @click="confirmDisconnectCouple"
            >
              <span class="material-symbols-outlined filled-icon">
                favorite
              </span>
            </button>
            <div class="d-flex gap-4 mt-1">
              <span class="material-symbols-outlined sync-icon fs-5">
                sync_alt
              </span>
            </div>
          </div>

          <div
            class="d-flex align-items-center justify-content-start gap-3 flex-grow-1"
          >
            <div class="d-flex flex-column align-items-center gap-2">
              <div
                class="profile-avatar rounded-circle border border-4 shadow-sm overflow-hidden"
                style="width: 96px; height: 96px"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI8ioidGPfljAtYWc6YAoJmhK9kYEgMRxqQNUnSxK084Anw8FNiaepJNK-RluCvPBTTYvFQI7A_YFYZ1NBavNl6Ni6N8yW4dwHW4ptJh7FwmLeFnZEh5Fpgsxf6wOEal1JYQJpTQIujF7Gswn7DpPwNpxg9Osbv8qAy7zpfpxlx7GCXtEmsKT_TCpTapiSA4_e5CBpxxzFh56K9rXnZ0PZ9360Ow_1to15mcdegKrNX0dpyGHROv4pIE_ge5H2zhf6mtvKEY27WahA"
                  class="w-100 h-100 object-fit-cover"
                />
              </div>
              <span
                class="name-pill px-3 py-1 rounded-pill small fw-bold text-nowrap"
              >
                {{ partnerName }}
              </span>
            </div>

            <div
              class="message-box px-3 py-2 rounded-4 shadow-sm small fw-bold d-none d-xl-block position-relative"
              style="white-space: nowrap"
            >
              {{ statusMessages.partner }}
            </div>
          </div>
        </div>

        <div class="mt-4 text-center">
          <p class="fs-5 fw-bold couple-summary-text m-0">
            연동된 지 {{ coupleDays }}일째, 오늘도 똑똑한 가계부 생활!
          </p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-12 col-lg-8">
          <div class="detail-card p-4 p-md-5 rounded-4 h-100">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h3 class="fs-5 fw-bold m-0">이번 달 금융 현황 비교</h3>
              <span class="small fw-medium meta-pill px-3 py-1 rounded-pill">
                2026년 4월 기준
              </span>
            </div>

            <p class="small section-desc mb-5">
              막대 길이는 전체 금액 기준으로 표시됩니다.
            </p>

            <div class="d-flex flex-column gap-5">
              <div class="position-relative">
                <div
                  class="d-flex justify-content-between align-items-center mb-2 px-2"
                >
                  <div class="text-start flex-1" style="width: 33%">
                    <p class="stat-label fw-bold mb-1 small text-uppercase">
                      {{ userName }}
                    </p>
                    <p class="fs-5 fw-bold m-0" style="color: #e53935">
                      {{ summary.myIncome.toLocaleString() }}원
                    </p>
                  </div>

                  <div class="text-center flex-1" style="width: 33%">
                    <span
                      class="small fw-bold stat-pill px-3 py-1 rounded-pill"
                    >
                      수입
                    </span>
                    <p class="mt-2 small fw-bold stat-subtext m-0">
                      합산: {{ summary.totalIncome.toLocaleString() }}원
                    </p>
                  </div>

                  <div class="text-end flex-1" style="width: 33%">
                    <p class="stat-label fw-bold mb-1 small text-uppercase">
                      {{ partnerName }}
                    </p>
                    <p class="fs-5 fw-bold m-0" style="color: #1e88e5">
                      {{ summary.partnerIncome.toLocaleString() }}원
                    </p>
                  </div>
                </div>

                <div
                  class="bar-track d-flex align-items-center w-100 rounded-pill overflow-hidden"
                  style="height: 1rem"
                >
                  <div class="flex-grow-1 d-flex justify-content-end h-100">
                    <div
                      class="h-100"
                      :style="{
                        backgroundColor: '#e53935',
                        width: incomeBar.myWidth,
                        borderRadius: '50rem 0 0 50rem',
                      }"
                    ></div>
                  </div>

                  <div
                    class="bar-divider h-100"
                    style="width: 2px; z-index: 2"
                  ></div>

                  <div class="flex-grow-1 d-flex justify-content-start h-100">
                    <div
                      class="h-100"
                      :style="{
                        backgroundColor: '#1e88e5',
                        width: incomeBar.partnerWidth,
                        borderRadius: '0 50rem 50rem 0',
                      }"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="position-relative">
                <div
                  class="d-flex justify-content-between align-items-center mb-2 px-2"
                >
                  <div class="text-start" style="width: 33%">
                    <p class="fs-5 fw-bold m-0" style="color: #e53935">
                      {{ summary.myExpense.toLocaleString() }}원
                    </p>
                  </div>

                  <div class="text-center" style="width: 33%">
                    <span
                      class="small fw-bold stat-pill px-3 py-1 rounded-pill"
                    >
                      지출
                    </span>
                    <p class="mt-2 small fw-bold stat-subtext m-0">
                      합산: {{ summary.totalExpense.toLocaleString() }}원
                    </p>
                  </div>

                  <div class="text-end" style="width: 33%">
                    <p class="fs-5 fw-bold m-0" style="color: #1e88e5">
                      {{ summary.partnerExpense.toLocaleString() }}원
                    </p>
                  </div>
                </div>

                <div
                  class="bar-track d-flex align-items-center w-100 rounded-pill overflow-hidden"
                  style="height: 1rem"
                >
                  <div class="flex-grow-1 d-flex justify-content-end h-100">
                    <div
                      class="h-100"
                      :style="{
                        backgroundColor: '#e53935',
                        width: expenseBar.myWidth,
                        borderRadius: '50rem 0 0 50rem',
                      }"
                    ></div>
                  </div>

                  <div
                    class="bar-divider h-100"
                    style="width: 2px; z-index: 2"
                  ></div>

                  <div class="flex-grow-1 d-flex justify-content-start h-100">
                    <div
                      class="h-100"
                      :style="{
                        backgroundColor: '#1e88e5',
                        width: expenseBar.partnerWidth,
                        borderRadius: '0 50rem 50rem 0',
                      }"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="position-relative">
                <div
                  class="d-flex justify-content-between align-items-center mb-2 px-2"
                >
                  <div class="text-start" style="width: 33%">
                    <p class="fs-5 fw-bold m-0" style="color: #e53935">
                      {{ formatSignedCurrency(summary.myProfit) }}
                    </p>
                  </div>

                  <div
                    class="d-flex flex-column align-items-center text-center"
                    style="width: 33%"
                  >
                    <span
                      class="small fw-bold stat-pill px-3 py-1 rounded-pill"
                    >
                      순 수익
                    </span>
                    <p class="mt-2 small fw-bold stat-subtext m-0">
                      합산: {{ formatSignedCurrency(summary.totalProfit) }}
                    </p>
                  </div>

                  <div class="text-end" style="width: 33%">
                    <p class="fs-5 fw-bold m-0" style="color: #1e88e5">
                      {{ formatSignedCurrency(summary.partnerProfit) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4 d-flex flex-column gap-4">
          <div
            class="goal-card p-4 rounded-4 border shadow-sm"
            style="border-left: 4px solid var(--bs-primary) !important"
          >
            <p class="small fw-bold text-primary mb-1">공동 목표</p>
            <h4 class="fs-5 fw-bold mb-3">내 집 마련 적금</h4>
            <div class="d-flex align-items-end gap-2 mb-2">
              <span class="fs-3 fw-bold">78%</span>
              <span class="small goal-subtext pb-1">3,400,000 / 5,000,000</span>
            </div>
            <div
              class="w-100 goal-progress-track rounded-pill overflow-hidden border"
              style="height: 0.75rem"
            >
              <div class="h-100 bg-primary" style="width: 78%"></div>
            </div>
            <button
              class="goal-detail-btn btn border mt-4 w-100 py-2 fw-bold rounded-3 shadow-sm"
            >
              상세 보기
            </button>
          </div>

          <div class="detail-card p-4 rounded-4">
            <h3
              class="fw-bold mb-4 small d-flex align-items-center justify-content-between"
            >
              최근 활동 피드
              <span
                class="bg-primary text-white px-2 py-1 rounded-pill"
                style="font-size: 10px"
              >
                New
              </span>
            </h3>

            <div class="d-flex flex-column gap-3">
              <div
                class="feed-item p-3 rounded-3 d-flex align-items-center gap-3 border"
              >
                <div
                  class="feed-avatar rounded-circle d-flex align-items-center justify-content-center small fw-bold"
                  style="width: 32px; height: 32px"
                >
                  {{ userName[0] }}
                </div>
                <div class="flex-grow-1">
                  <p class="fw-medium m-0 feed-text" style="font-size: 11px">
                    {{ userName }}님이 {{ myLatestTransaction?.category }}
                    {{ myLatestTransaction?.amount }}원을 입력했습니다.
                  </p>
                  <p class="feed-time mt-1 m-0" style="font-size: 9px">
                    5분 전
                  </p>
                </div>
              </div>

              <div
                class="feed-item p-3 rounded-3 d-flex align-items-center gap-3 border"
              >
                <div
                  class="feed-avatar rounded-circle d-flex align-items-center justify-content-center small fw-bold"
                  style="width: 32px; height: 32px"
                >
                  {{ partnerName[0] }}
                </div>
                <div class="flex-grow-1">
                  <p class="fw-medium m-0 feed-text" style="font-size: 11px">
                    {{ partnerName }}님이
                    {{ partnerLatestTransaction?.category }}
                    {{ partnerLatestTransaction?.amount }}원을 입력했습니다.
                  </p>
                  <p class="feed-time mt-1 m-0" style="font-size: 9px">
                    5분 전
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <h3 class="fs-4 fw-bold m-0">부부 카테고리 비교</h3>
          <button
            v-if="hasMoreCategories || showAllCategories"
            type="button"
            class="btn btn-warning rounded-circle d-flex align-items-center justify-content-center shadow-sm border-0"
            style="width: 3rem; height: 3rem"
            @click="showAllCategories = !showAllCategories"
          >
            <span class="material-symbols-outlined fs-4">
              {{ showAllCategories ? "remove" : "add" }}
            </span>
          </button>
        </div>

        <div class="row g-4">
          <div
            v-for="cat in visibleCategories"
            :key="cat.name"
            class="col-12 col-md-6 col-lg-3"
          >
            <div class="detail-card p-4 rounded-4 h-100">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div
                  class="rounded-3 d-flex align-items-center justify-content-center"
                  :class="cat.bgClass"
                  style="width: 40px; height: 40px"
                >
                  <span class="material-symbols-outlined fs-5">
                    {{ cat.icon }}
                  </span>
                </div>
                <span class="fw-bold">{{ cat.name }}</span>
              </div>

              <div class="d-flex flex-column gap-2">
                <div
                  class="d-flex justify-content-between align-items-center small"
                >
                  <span class="category-label">{{ userName }}</span>
                  <span class="fw-bold" style="color: #e53935">
                    {{ cat.val1 }}
                  </span>
                </div>

                <div
                  class="d-flex justify-content-between align-items-center small"
                >
                  <span class="category-label">{{ partnerName }}</span>
                  <span class="fw-bold" style="color: #1e88e5">
                    {{ cat.val2 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";
import { usecouplesStore } from "../../stores/couples";
import { getUserById } from "../../api/auth";
import api from "@/api/api";
import { useRouter } from "vue-router";
import { useUiStore } from "@/stores/ui";
import {
  getCoupleMonthlySummary,
  getCoupleTransactions,
} from "@/api/coupleLedger";

const router = useRouter();
const uiStore = useUiStore();
const authStore = useAuthStore();
const couplesStore = usecouplesStore();
const partner = ref(null);

const userName = computed(() => authStore.user?.name || "사용자");
const userId = computed(() => authStore.user?.id);
const myCouple = computed(() => couplesStore.couples[0] || null);

const partnerId = computed(() => {
  if (!myCouple.value || !userId.value) return null;
  return myCouple.value.user1Id === userId.value
    ? myCouple.value.user2Id
    : myCouple.value.user1Id;
});

const partnerName = computed(() => partner.value?.name || "배우자");

const statusMessages = ref({
  user: "",
  partner: "",
});

const editableMessages = ref({
  user: statusMessages.value.user,
});

const userStatusField = computed(() => {
  if (!myCouple.value || !userId.value) return null;
  return myCouple.value.user1Id === userId.value
    ? "user1Message"
    : "user2Message";
});

const partnerStatusField = computed(() => {
  if (!myCouple.value || !userId.value) return null;
  return myCouple.value.user1Id === userId.value
    ? "user2Message"
    : "user1Message";
});

const loadStatusMessages = () => {
  if (!myCouple.value) return;

  const userMessage =
    myCouple.value[userStatusField.value] || statusMessages.value.user;
  const partnerMessage =
    myCouple.value[partnerStatusField.value] || statusMessages.value.partner;

  statusMessages.value.user = userMessage;
  statusMessages.value.partner = partnerMessage;
  editableMessages.value.user = userMessage;
};

const editingMessage = ref(null);

const coupleDays = computed(() => {
  if (!myCouple.value?.createdAt) return 0;
  const createdDate = new Date(myCouple.value.createdAt);
  const today = new Date();
  return Math.floor((today - createdDate) / (1000 * 60 * 60 * 24)) + 1;
});

const categoryMeta = {
  식비: {
    icon: "restaurant",
    bgClass: "bg-danger bg-opacity-10 text-danger",
  },
  "주거/통신": {
    icon: "home",
    bgClass: "bg-primary bg-opacity-10 text-primary",
  },
  "교통/차량": {
    icon: "directions_car",
    bgClass: "bg-warning bg-opacity-10 text-warning",
  },
  "쇼핑/생활": {
    icon: "shopping_bag",
    bgClass: "bg-success bg-opacity-10 text-success",
  },
  "의료/건강": {
    icon: "medical_services",
    bgClass: "bg-info bg-opacity-10 text-info",
  },
  "문화/여가": {
    icon: "sports_esports",
    bgClass: "culture-badge",
  },
  기타: {
    icon: "category",
    bgClass: "bg-dark bg-opacity-10 text-dark",
  },
};

const summary = ref({
  myIncome: 0,
  partnerIncome: 0,
  totalIncome: 0,
  myExpense: 0,
  partnerExpense: 0,
  totalExpense: 0,
  myProfit: 0,
  partnerProfit: 0,
  totalProfit: 0,
  transactions: [],
});

const monthKey = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
});

const comparisonScale = computed(() => {
  const incomeA = Number(summary.value.myIncome || 0);
  const incomeB = Number(summary.value.partnerIncome || 0);
  const expenseA = Number(summary.value.myExpense || 0);
  const expenseB = Number(summary.value.partnerExpense || 0);
  const netA = Number(summary.value.myProfit || 0);
  const netB = Number(summary.value.partnerProfit || 0);

  const globalMax = Math.max(
    Math.abs(incomeA),
    Math.abs(incomeB),
    Math.abs(expenseA),
    Math.abs(expenseB),
    Math.abs(netA),
    Math.abs(netB),
    1,
  );

  const toWidth = (value) =>
    `${(Math.abs(Number(value || 0)) / globalMax) * 100}%`;

  return {
    globalMax,
    incomeAWidth: toWidth(incomeA),
    incomeBWidth: toWidth(incomeB),
    expenseAWidth: toWidth(expenseA),
    expenseBWidth: toWidth(expenseB),
  };
});

const incomeBar = computed(() => ({
  myWidth: comparisonScale.value.incomeAWidth,
  partnerWidth: comparisonScale.value.incomeBWidth,
}));

const expenseBar = computed(() => ({
  myWidth: comparisonScale.value.expenseAWidth,
  partnerWidth: comparisonScale.value.expenseBWidth,
}));

const formatSignedCurrency = (value) => {
  const amount = Number(value || 0);
  if (amount < 0) {
    return `-${Math.abs(amount).toLocaleString()}원`;
  }
  return `${amount.toLocaleString()}원`;
};

const categories = computed(() => {
  const map = {};

  summary.value.transactions.forEach((item) => {
    if (item.type !== "EXPENSE") return;

    const categoryName = item.category || "기타";
    const meta = categoryMeta[categoryName] || categoryMeta.기타;

    if (!map[categoryName]) {
      map[categoryName] = {
        name: categoryName,
        icon: meta.icon,
        bgClass: meta.bgClass,
        myAmount: 0,
        partnerAmount: 0,
      };
    }

    if (Number(item.userId) === Number(userId.value)) {
      map[categoryName].myAmount += item.amount;
    } else if (Number(item.userId) === Number(partnerId.value)) {
      map[categoryName].partnerAmount += item.amount;
    }
  });

  return Object.values(map)
    .sort((a, b) => {
      const totalA = a.myAmount + a.partnerAmount;
      const totalB = b.myAmount + b.partnerAmount;
      return totalB - totalA;
    })
    .map((item) => ({
      name: item.name,
      icon: item.icon,
      bgClass: item.bgClass,
      val1: `${item.myAmount.toLocaleString()}원`,
      val2: `${item.partnerAmount.toLocaleString()}원`,
    }));
});

const showAllCategories = ref(false);

const visibleCategories = computed(() => {
  if (showAllCategories.value) {
    return categories.value;
  }

  return categories.value.slice(0, 4);
});

const hasMoreCategories = computed(() => categories.value.length > 4);

const myLatestTransaction = computed(() => {
  const myTransactions = summary.value.transactions.filter(
    (item) => Number(item.userId) === Number(userId.value),
  );
  return myTransactions.at(-1) || null;
});

const partnerLatestTransaction = computed(() => {
  if (!partnerId.value) return null;

  const partnerTransactions = summary.value.transactions.filter(
    (item) => Number(item.userId) === Number(partnerId.value),
  );
  return partnerTransactions.at(-1) || null;
});

const startEditingMessage = (target) => {
  if (target !== "user") return;

  if (editingMessage.value === "user") {
    // 두 번째 클릭 시 편집 취소
    editableMessages.value.user = statusMessages.value.user;
    editingMessage.value = null;
    return;
  }

  editableMessages.value.user = statusMessages.value.user;
  editingMessage.value = "user";
};

const persistStatusMessage = async (message) => {
  if (!myCouple.value?.id || !userStatusField.value) return;

  const updatedCouple = {
    ...myCouple.value,
    [userStatusField.value]: message,
  };

  await api.put(`/couples/${myCouple.value.id}`, updatedCouple);

  const index = couplesStore.couples.findIndex(
    (item) => item.id === myCouple.value.id,
  );
  if (index !== -1) {
    couplesStore.couples.splice(index, 1, updatedCouple);
  }
};

const saveMessage = async (target) => {
  if (target !== "user") return;

  const message = editableMessages.value.user.trim();
  if (!message) {
    editingMessage.value = null;
    return;
  }

  statusMessages.value.user = message;
  editingMessage.value = null;

  try {
    await persistStatusMessage(message);
  } catch (error) {
    window.alert("상태 메시지 저장에 실패했습니다. 다시 시도해주세요.");
  }
};

const confirmDisconnectCouple = async () => {
  if (!myCouple.value?.id) {
    window.alert("연동된 배우자 정보가 없습니다.");
    return;
  }

  const confirmed = window.confirm("배우자와 연동을 정말로 해지하겠습니까?");
  if (!confirmed) return;

  const result = await couplesStore.removecouple(myCouple.value.id);

  if (!result?.success) {
    window.alert(result?.message || "연동 해지에 실패했습니다.");
    return;
  }

  partner.value = null;
  uiStore.showToast("배우자 연동이 해지되었습니다.");
  setTimeout(() => {
    router.push("/couples");
  }, 900);
};

onMounted(async () => {
  await couplesStore.fetchcouples(userId.value);
  loadStatusMessages();

  if (myCouple.value && partnerId.value) {
    partner.value = await getUserById(partnerId.value);

    summary.value = await getCoupleMonthlySummary(
      userId.value,
      partnerId.value,
      monthKey.value,
    );
  }

  //  const coupleTransactions = getCoupleTransactions(userId, partnerId);
});
</script>

<style scoped>
.couple-detail-page {
  min-height: 100vh;
  width: calc(100% + 3rem);
  margin: -1.5rem;
  background: var(--page-bg);
  color: var(--text-color);
}

.couple-detail-inner {
  padding: 5.5rem 1.5rem 1.5rem;
}

.section-desc {
  color: var(--text-muted);
}

.couple-hero {
  background-color: rgb(255, 204, 80);
}

.couple-edit-btn {
  background: var(--card-bg);
  color: var(--text-color);
}

.couple-edit-btn:hover {
  background: var(--sub-bg);
  color: var(--text-color);
}

.detail-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.message-box {
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.profile-avatar {
  border-color: rgba(255, 255, 255, 0.75) !important;
  background: var(--sub-bg);
}

.name-pill {
  background: rgba(255, 255, 255, 0.55);
  color: #222;
}

:global(html.dark) .name-pill {
  background: rgba(31, 41, 55, 0.9);
  color: var(--text-color);
}

.heart-badge {
  background: var(--card-bg);
  color: #dc3545;
}

.sync-icon {
  color: rgba(0, 0, 0, 0.45);
}

:global(html.dark) .sync-icon {
  color: var(--text-muted);
}

.couple-summary-text {
  color: #222;
}

:global(html.dark) .couple-summary-text {
  color: #111;
}

.meta-pill,
.stat-pill {
  background: var(--sub-bg);
  color: var(--text-color);
}

.stat-label,
.stat-subtext,
.goal-subtext,
.category-label,
.feed-text,
.feed-time {
  color: var(--text-muted);
}

.bar-track,
.goal-progress-track {
  background: var(--sub-bg);
  border-color: var(--border-light) !important;
}

.bar-divider {
  background: var(--card-bg);
}

.goal-card {
  background: var(--sub-bg);
  border-color: var(--border-color) !important;
}

.goal-detail-btn {
  background: var(--card-bg);
  color: var(--text-color);
  border-color: var(--border-color);
}

.goal-detail-btn:hover {
  background: var(--sub-bg);
  color: var(--text-color);
}

.feed-item {
  background: var(--sub-bg);
  border-color: var(--border-color) !important;
}

.feed-avatar {
  background: rgba(107, 114, 128, 0.15);
  color: var(--text-color);
}

.form-control {
  background-color: var(--sub-bg);
  border: 1px solid var(--border-light);
  color: var(--text-color);
}

.form-control::placeholder {
  color: var(--text-muted);
}

.form-control:focus {
  background-color: var(--sub-bg);
  color: var(--text-color);
  border-color: var(--kb-yellow);
  box-shadow: 0 0 0 0.2rem rgba(255, 188, 0, 0.16);
}

.flex-1 {
  flex: 1;
}

.culture-badge {
  background-color: rgba(155, 81, 224, 0.14);
  color: #9b51e0;
}

@media (min-width: 768px) {
  .couple-detail-page {
    width: calc(100% + 6rem);
    margin: -3rem;
  }

  .couple-detail-inner {
    padding: 5.5rem 1.5rem 1.5rem;
  }
}

.filled-icon {
  font-variation-settings: "FILL" 1;
}
</style>
