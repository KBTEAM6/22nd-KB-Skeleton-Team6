/**
 * @fileoverview 인증 관련 API 함수들
 * @description 사용자 로그인, 회원가입, 조회 등의 인증 기능을 제공하는 API 모듈
 */

import api from './api';

/**
 * 이메일로 사용자 조회
 * @param {string} email - 조회할 사용자 이메일
 * @returns {Promise<Array>} 사용자 배열 (일반적으로 1개 또는 빈 배열)
 * @example
 * const users = await findUserByEmail('user@example.com');
 * // [{ id: 1, email: 'user@example.com', name: '사용자', ... }]
 */
export const findUserByEmail = async (email) => {
  const response = await api.get('/users', {
    params: { email },
  });

  return response.data;
};

/**
 * 새 사용자 생성 (회원가입)
 * @param {Object} userData - 사용자 정보
 * @param {string} userData.name - 사용자 이름
 * @param {string} userData.email - 사용자 이메일
 * @param {string} userData.password - 사용자 비밀번호
 * @param {string} userData.createdAt - 가입일시 (ISO string)
 * @returns {Promise<Object>} 생성된 사용자 정보
 * @example
 * const newUser = await createUser({
 *   name: '홍길동',
 *   email: 'hong@example.com',
 *   password: 'password123',
 *   createdAt: '2024-01-01T00:00:00.000Z'
 * });
 */
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

/**
 * ID로 사용자 조회
 * @param {number|string} id - 사용자 ID
 * @returns {Promise<Object>} 사용자 정보
 * @example
 * const user = await getUserById(1);
 * // { id: 1, name: '홍길동', email: 'hong@example.com', ... }
 */
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

/**
 * 사용자 정보 전체 수정
 * @param {number|string} id - 사용자 ID
 * @param {Object} userData - 전체 사용자 정보
 * @returns {Promise<Object>} 수정된 사용자 정보
 */
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};
