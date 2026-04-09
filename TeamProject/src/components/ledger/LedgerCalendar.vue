<template>
  <div class="bg-white rounded-4 p-4 shadow-sm">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2 class="fs-5 fw-bold m-0">{{ year }}년 {{ month + 1 }}월</h2>
      <div class="d-flex gap-2">
        <button
          @click="prevMonth"
          class="btn btn-light d-flex align-items-center justify-content-center p-0 border-0"
          style="width: 36px; height: 36px; border-radius: 0.75rem"
        >
          <ChevronLeft style="width: 20px; height: 20px" />
        </button>
        <button
          @click="nextMonth"
          class="btn btn-light d-flex align-items-center justify-content-center p-0 border-0"
          style="width: 36px; height: 36px; border-radius: 0.75rem"
        >
          <ChevronRight style="width: 20px; height: 20px" />
        </button>
      </div>
    </div>

    <div
      class="d-grid gap-2"
      style="grid-template-columns: repeat(7, minmax(0, 1fr))"
    >
      <div
        v-for="(dayName, idx) in weekDays"
        :key="dayName"
        class="text-center small fw-medium py-2"
        :class="idx === 0 ? '' : idx === 6 ? 'text-primary' : 'text-muted'"
        :style="idx === 0 ? 'color: rgb(240,68,82);' : ''"
      >
        {{ dayName }}
      </div>

      <template v-for="(day, idx) in days" :key="`day-${idx}`">
        <div v-if="!day"></div>
        <button
          v-else
          @click="handleClick(day)"
          :class="[
            'btn border-0 p-1 text-start rounded-3 position-relative',
            ledgerStore.calendarData[day]
              ? 'btn-light'
              : 'bg-transparent opacity-50',
          ]"
          :style="{
            pointerEvents: ledgerStore.calendarData[day] ? 'auto' : 'none',
          }"
          style="aspect-ratio: 1; min-height: 60px"
        >
          <div
            class="small mb-1 d-block"
            :class="idx % 7 === 0 ? '' : idx % 7 === 6 ? 'text-primary' : ''"
            :style="idx % 7 === 0 ? 'color: rgb(240,68,82);' : ''"
          >
            {{ day }}
          </div>

          <div
            v-if="ledgerStore.calendarData[day]"
            class="d-flex flex-column gap-1"
          >
            <div
              v-if="ledgerStore.calendarData[day].income > 0"
              class="text-primary text-truncate"
              style="font-size: 10px"
            >
              +{{ ledgerStore.calendarData[day].income.toLocaleString() }}
            </div>
            <div
              v-if="ledgerStore.calendarData[day].expense > 0"
              class="text-truncate"
              style="color: rgb(240, 68, 82); font-size: 10px"
            >
              -{{ ledgerStore.calendarData[day].expense.toLocaleString() }}
            </div>
          </div>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useLedgerStore } from "@/stores/ledger";

const emit = defineEmits(["dateClick"]);
const ledgerStore = useLedgerStore();

// 스토어의 연/월 상태와 연동
const year = computed(() => ledgerStore.currentYear);
const month = computed(() => ledgerStore.currentMonth - 1); // JS Month는 0부터 시작

const days = computed(() => {
  const y = year.value;
  const m = month.value;
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  return Array.from({ length: firstDay + daysInMonth }, (_, i) => {
    if (i < firstDay) return null;
    return i - firstDay + 1;
  });
});

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

// 월 변경 시 스토어 상태 업데이트
const prevMonth = () => {
  if (ledgerStore.currentMonth === 1) {
    ledgerStore.currentYear--;
    ledgerStore.currentMonth = 12;
  } else {
    ledgerStore.currentMonth--;
  }
};

const nextMonth = () => {
  if (ledgerStore.currentMonth === 12) {
    ledgerStore.currentYear++;
    ledgerStore.currentMonth = 1;
  } else {
    ledgerStore.currentMonth++;
  }
};

const handleClick = (day) => {
  if (!day) return;
  const dayData = ledgerStore.calendarData[day];
  // 해당 날짜의 전체 내역을 필터링하여 전달
  const dateString = `${year.value}-${String(month.value + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const details = ledgerStore.activeUserTransactions.filter(
    (item) => item.date === dateString,
  );

  emit("dateClick", dateString, {
    income: dayData?.income ?? 0,
    expense: dayData?.expense ?? 0,
    details,
  });
};
</script>
