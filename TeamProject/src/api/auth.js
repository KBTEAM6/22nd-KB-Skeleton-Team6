// src/api/auth.js
import api from './api';

// 이메일로 유저 조회
export const findUserByEmail = async (email) => {
  const response = await api.get('/users', {
    params: { email },
  });

  return response.data;
};

// 회원가입
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// id로 사용자 조회
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
