// src/stores/category.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getCategories } from '@/api/categories';

export const useCategoryStore = defineStore('category', () => {
  const incomeCategories = ref([]);
  const expenseCategories = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref('');

  const allCategories = computed(() => ({
    income: incomeCategories.value,
    expense: expenseCategories.value,
  }));

  const fetchCategories = async () => {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      const categories = await getCategories();

      incomeCategories.value = categories.income || [];
      expenseCategories.value = categories.expense || [];
    } catch (error) {
      errorMessage.value = error.message || '카테고리 조회에 실패했습니다.';
    } finally {
      isLoading.value = false;
    }
  };

  const getCategoriesByType = (type) => {
    if (type === 'income') return incomeCategories.value;
    if (type === 'expense') return expenseCategories.value;
    return [];
  };

  const clearCategories = () => {
    incomeCategories.value = [];
    expenseCategories.value = [];
    errorMessage.value = '';
  };

  return {
    incomeCategories,
    expenseCategories,
    isLoading,
    errorMessage,
    allCategories,
    fetchCategories,
    getCategoriesByType,
    clearCategories,
  };
});
