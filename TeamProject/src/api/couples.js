// src/api/couples.js
import api from './api';

// 사용자 검색
export const searchUsersByKeyword = async (keyword) => {
  const response = await api.get(`/users?q=${keyword}`);
  return response.data;
};

// 받은 친구 요청 조회
export const getReceivedcoupleRequests = async (userId) => {
  const response = await api.get(
    `/coupleRequests?targetUserId=${userId}&_sort=createdAt&_order=desc`,
  );
  return response.data;
};

// 보낸 친구 요청 조회
export const getSentcoupleRequests = async (userId) => {
  const response = await api.get(
    `/coupleRequests?requesterId=${userId}&_sort=createdAt&_order=desc`,
  );
  return response.data;
};

// 친구 요청 생성
export const createcoupleRequest = async (payload) => {
  const response = await api.post('/coupleRequests', payload);
  return response.data;
};

// 친구 요청 상태 수정 (PUT 방식)
export const updatecoupleRequest = async (requestId, payload) => {
  // 1. 기존 데이터 조회
  const { data: existing } = await api.get(`/coupleRequests/${requestId}`);

  // 2. 기존 + 수정 데이터 합치기
  const updatedData = {
    ...existing,
    ...payload,
  };

  // 3. 전체 데이터 PUT 요청
  const response = await api.put(`/coupleRequests/${requestId}`, updatedData);

  return response.data;
};
// 친구 목록 조회
export const getcouplesByUserId = async (userId) => {
  const response = await api.get(`/couples?userId=${userId}`);
  return response.data;
};

// 친구 관계 생성
export const createcouple = async (payload) => {
  const response = await api.post('/couples', payload);
  return response.data;
};

// 친구 관계 삭제
export const deletecouple = async (id) => {
  const response = await api.delete(`/couples/${id}`);
  return response.data;
};
