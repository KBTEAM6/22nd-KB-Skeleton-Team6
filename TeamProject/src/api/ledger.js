// src/api/ledger.js
import api from './api';

// 특정 사용자 거래 전체 조회
export const getTransactionsByUserId = async (userId) => {
  const response = await api.get(
    `/transactions?userId=${userId}&_sort=date&_order=desc`,
  );
  return response.data;
};

// 거래 추가
export const createTransaction = async (transactionData) => {
  const response = await api.post('/transactions', transactionData);
  return response.data;
};

// 거래 수정
export const updateTransaction = async (id, transactionData) => {
  const response = await api.put(`/transactions/${id}`, transactionData);
  return response.data;
};

// 거래 삭제
export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

// 단건 조회
export const getTransactionById = async (id) => {
  const response = await api.get(`/transactions/${id}`);
  return response.data;
};
