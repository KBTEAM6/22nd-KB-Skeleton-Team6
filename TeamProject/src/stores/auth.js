// src/stores/auth.js
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { findUserByEmail, createUser } from '@/api/auth';

const STORAGE_KEY = 'budget-auth-user';

export const useAuthStore = defineStore('auth', () => {
  // state
  const user = ref(null);
  const isLoading = ref(false);
  const errorMessage = ref('');

  // getters
  const isLoggedIn = computed(() => !!user.value);

  // actions
  const clearError = () => {
    errorMessage.value = '';
  };

  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const clearUser = () => {
    user.value = null;
    localStorage.removeItem(STORAGE_KEY);
  };

  const loadUserFromStorage = () => {
    const savedUser = localStorage.getItem(STORAGE_KEY);

    if (!savedUser) {
      user.value = null;
      return;
    }

    try {
      user.value = JSON.parse(savedUser);
    } catch (error) {
      console.error('저장된 로그인 정보 파싱 실패:', error);
      localStorage.removeItem(STORAGE_KEY);
      user.value = null;
    }
  };

  const login = async ({ email, password }) => {
    isLoading.value = true;
    clearError();

    try {
      const users = await findUserByEmail(email);
      const foundUser = users[0];

      if (!foundUser) {
        errorMessage.value = '존재하지 않는 이메일입니다.';
        return {
          success: false,
          message: errorMessage.value,
        };
      }

      if (foundUser.password !== password) {
        errorMessage.value = '비밀번호가 올바르지 않습니다.';
        return {
          success: false,
          message: errorMessage.value,
        };
      }

      // 비밀번호까지 그대로 저장할 필요는 없음
      const safeUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      };

      setUser(safeUser);

      return {
        success: true,
        message: '로그인 성공',
      };
    } catch (error) {
      console.error('로그인 실패:', error);
      errorMessage.value = '로그인 중 오류가 발생했습니다.';
      return {
        success: false,
        message: errorMessage.value,
      };
    } finally {
      isLoading.value = false;
    }
  };

  const signup = async ({ name, email, password }) => {
    isLoading.value = true;
    clearError();

    try {
      const users = await findUserByEmail(email);

      if (users.length > 0) {
        errorMessage.value = '이미 사용 중인 이메일입니다.';
        return {
          success: false,
          message: errorMessage.value,
        };
      }

      const createdUser = await createUser({
        name,
        email,
        password,
      });

      const safeUser = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };

      setUser(safeUser);

      return {
        success: true,
        message: '회원가입 성공',
      };
    } catch (error) {
      console.error('회원가입 실패:', error);
      errorMessage.value = '회원가입 중 오류가 발생했습니다.';
      return {
        success: false,
        message: errorMessage.value,
      };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    clearUser();
  };

  return {
    // state
    user,
    isLoading,
    errorMessage,

    // getters
    isLoggedIn,

    // actions
    clearError,
    setUser,
    clearUser,
    loadUserFromStorage,
    login,
    signup,
    logout,
  };
});
