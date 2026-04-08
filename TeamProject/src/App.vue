<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LedgerCalendar, { type DayData } from './components/LedgerCalendar.vue'
import ExpensePieChart from './components/ExpensePieChart.vue'
import SummaryCards from './components/SummaryCards.vue'
import AddLedgerDialog, { type LedgerEntry } from './components/AddLedgerDialog.vue'
import FloatingAddButton from './components/FloatingAddButton.vue'
import DateDetailDialog from './components/DateDetailDialog.vue'
import TransactionList from './components/TransactionList.vue'
import CategoryBarChart from './components/CategoryBarChart.vue'
import CategoryRanking from './components/CategoryRanking.vue'
import CoupleLedger from './components/CoupleLedger.vue'
import MyPage from './components/MyPage.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const currentView = ref('home')
const isAddDialogOpen = ref(false)
const isDateDetailOpen = ref(false)
const selectedDate = ref<DayData | null>(null)
const ledgerDate = ref(new Date(2026, 3, 1))
const selectedCategory = ref<string | null>(null)

const handleCategorySelect = (category: string | null) => {
  selectedCategory.value = category
}

const handleDateClick = (date: number, data: DayData) => {
  selectedDate.value = data
  isDateDetailOpen.value = true
}

const handleAddLedger = (data: LedgerEntry) => {
  console.log('Added ledger entry:', data)
}

const prevMonth = () => {
  ledgerDate.value = new Date(ledgerDate.value.getFullYear(), ledgerDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  ledgerDate.value = new Date(ledgerDate.value.getFullYear(), ledgerDate.value.getMonth() + 1, 1)
}
</script>

<template>
  <div class="w-100 vh-100 d-flex" style="background-color: #F5F5F7;">
    <Sidebar :currentView="currentView" @viewChange="currentView = $event" />

    <main class="flex-grow-1 overflow-auto">
      <template v-if="currentView === 'home'">
        <div class="p-4 p-md-5 d-flex flex-column gap-4">
          <SummaryCards :totalIncome="3705000" :totalExpense="1070000" />
          <div class="row g-4">
            <div class="col-12 col-lg-8">
              <LedgerCalendar @dateClick="handleDateClick" />
            </div>
            <div class="col-12 col-lg-4 d-flex flex-column gap-4">
              <ExpensePieChart />
            </div>
          </div>
        </div>
      </template>

      <template v-if="currentView === 'ledger'">
        <div class="p-4 p-md-5 d-flex flex-column gap-4">
          <div class="d-flex align-items-center justify-content-between">
            <h2 class="fs-4 fw-bold mb-0">
              {{ ledgerDate.getFullYear() }}년 {{ ledgerDate.getMonth() + 1 }}월
            </h2>
            <div class="d-flex gap-2">
              <button
                @click="prevMonth"
                class="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                style="width: 36px; height: 36px; border-radius: 0.75rem;"
              >
                <ChevronLeft style="width: 20px; height: 20px;" />
              </button>
              <button
                @click="nextMonth"
                class="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                style="width: 36px; height: 36px; border-radius: 0.75rem;"
              >
                <ChevronRight style="width: 20px; height: 20px;" />
              </button>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-12 col-lg-8">
              <TransactionList :selectedCategory="selectedCategory" />
            </div>
            <div class="col-12 col-lg-4 d-flex flex-column gap-4">
              <CategoryBarChart 
                :selectedCategory="selectedCategory" 
                @selectCategory="handleCategorySelect" 
              />
              <CategoryRanking />
            </div>
          </div>
        </div>
      </template>

      <template v-if="currentView === 'couple'">
        <CoupleLedger />
      </template>

      <template v-if="currentView === 'mypage'">
        <MyPage />
      </template>
    </main>

    <FloatingAddButton @click="isAddDialogOpen = true" />

    <AddLedgerDialog
      :isOpen="isAddDialogOpen"
      @close="isAddDialogOpen = false"
      @add="handleAddLedger"
    />

    <DateDetailDialog
      v-if="selectedDate"
      :isOpen="isDateDetailOpen"
      @close="isDateDetailOpen = false"
      :date="selectedDate.date"
      :income="selectedDate.income"
      :expense="selectedDate.expense"
      :details="selectedDate.details || []"
    />
  </div>
</template>
