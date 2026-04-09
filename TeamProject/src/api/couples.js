<<<<<<< HEAD
// src/api/couples.js
import api from "./api";
=======
/**
 * @fileoverview 부부(커플) 관련 API 함수들
 * @description 부부 연결, 친구 요청 등의 소셜 기능을 제공하는 API 모듈
 */

import api from './api';
>>>>>>> 13f6814 (feat: uiToast 구현 + 마이페이지 연동중 db.json변경 직전 commit)

/**
 * 키워드로 사용자 검색
 * @param {string} keyword - 검색 키워드 (이름이나 이메일)
 * @returns {Promise<Array>} 검색된 사용자 배열
 * @example
 * const users = await searchUsersByKeyword('홍길동');
 * // [{ id: 1, name: '홍길동', email: 'hong@example.com' }, ...]
 */
export const searchUsersByKeyword = async (keyword) => {
  const response = await api.get(`/users?q=${keyword}`);
  return response.data;
};

<<<<<<< HEAD
// 받은 친구 요청 조회
// export const getReceivedcoupleRequests = async (userId) => {
//   const response = await api.get(
//     `/coupleRequests?targetUserId=${userId}&_sort=createdAt&_order=desc`,
//   );
//   return response.data;
// };

// // 보낸 친구 요청 조회
// export const getSentcoupleRequests = async (userId) => {
//   const response = await api.get(
//     `/coupleRequests?requesterId=${userId}&_sort=createdAt&_order=desc`,
//   );
//   return response.data;
// };
=======
/**
 * 받은 부부 요청 조회
 * @param {number} userId - 대상 사용자 ID
 * @returns {Promise<Array>} 받은 요청 배열 (생성일 내림차순)
 * @example
 * const requests = await getReceivedcoupleRequests(1);
 * // [{ id: 1, requesterId: 2, targetUserId: 1, status: 'pending', ... }]
 */
export const getReceivedcoupleRequests = async (userId) => {
  const response = await api.get(
    `/coupleRequests?targetUserId=${userId}&_sort=createdAt&_order=desc`,
  );
  return response.data;
};

/**
 * 보낸 부부 요청 조회
 * @param {number} userId - 요청자 사용자 ID
 * @returns {Promise<Array>} 보낸 요청 배열 (생성일 내림차순)
 * @example
 * const requests = await getSentcoupleRequests(1);
 * // [{ id: 1, requesterId: 1, targetUserId: 2, status: 'pending', ... }]
 */
export const getSentcoupleRequests = async (userId) => {
  const response = await api.get(
    `/coupleRequests?requesterId=${userId}&_sort=createdAt&_order=desc`,
  );
  return response.data;
};
>>>>>>> 13f6814 (feat: uiToast 구현 + 마이페이지 연동중 db.json변경 직전 commit)

/**
 * 부부 요청 생성
 * @param {Object} payload - 요청 데이터
 * @param {number} payload.requesterId - 요청자 ID
 * @param {number} payload.targetUserId - 대상자 ID
 * @param {string} payload.status - 요청 상태 ('pending')
 * @param {string} payload.createdAt - 생성일시
 * @returns {Promise<Object>} 생성된 요청 객체
 * @example
 * const request = await createcoupleRequest({
 *   requesterId: 1,
 *   targetUserId: 2,
 *   status: 'pending',
 *   createdAt: '2024-01-01T00:00:00.000Z'
 * });
 */
export const createcoupleRequest = async (payload) => {
  const response = await api.post("/coupleRequests", payload);
  return response.data;
};

/**
 * 부부 요청 상태 수정 (PUT 방식 - 전체 데이터 교체)
 * @param {number} requestId - 요청 ID
 * @param {Object} payload - 수정할 데이터 (부분 업데이트)
 * @returns {Promise<Object>} 수정된 요청 객체
 * @example
 * const updated = await updatecoupleRequest(1, { status: 'accepted' });
 */
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

/**
 * 사용자별 부부 목록 조회
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Array>} 연결된 부부 배열
 * @example
 * const couples = await getcouplesByUserId(1);
 * // [{ id: 1, userId: 1, coupleUserId: 2, createdAt: '...' }, ...]
 */
export const getcouplesByUserId = async (userId) => {
  const response = await api.get(`/couples?userId=${userId}`);
  return response.data;
};

/**
 * 부부 관계 생성
 * @param {Object} payload - 부부 관계 데이터
 * @param {number} payload.userId - 사용자 ID
 * @param {number} payload.coupleUserId - 연결할 사용자 ID
 * @param {string} payload.createdAt - 생성일시
 * @returns {Promise<Object>} 생성된 부부 관계 객체
 * @example
 * const couple = await createcouple({
 *   userId: 1,
 *   coupleUserId: 2,
 *   createdAt: '2024-01-01T00:00:00.000Z'
 * });
 */
export const createcouple = async (payload) => {
  const response = await api.post("/couples", payload);
  return response.data;
};

/**
 * 부부 관계 삭제
 * @param {number} id - 부부 관계 ID
 * @returns {Promise<void>} 삭제 완료
 * @example
 * await deletecouple(1);
 */
export const deletecouple = async (id) => {
  const response = await api.delete(`/couples/${id}`);
  return response.data;
};

//추가(수정) - 기존 api가 잘못되어 수정(targetUserId, requesterId-> db에는 toid랑fromid를 사용)
// 받은 친구 요청 조회
export const getReceivedcoupleRequests = async (userId) => {
  return (await api.get(`/coupleRequests?toId=${userId}`)).data;
};
// // 보낸 친구 요청 조회
export const getSentcoupleRequests = async (userId) => {
  return (await api.get(`/coupleRequests?fromId=${userId}`)).data;
};
//추가 - 요청 취소하는 기능 추가
export const deletecoupleRequest = async (id) => {
  const response = await api.delete(`/coupleRequests/${id}`);
  return response.data;
};
//추가 - 전체 커플 조회하는 기능 -> 친구요청할떄 커플인 사용자 막기위해
export const getAllcouples = async () => {
  const response = await api.get("/couples");
  return response.data;
};
