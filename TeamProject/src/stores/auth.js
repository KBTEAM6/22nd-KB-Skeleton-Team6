// src/stores/auth.js
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { findUserByEmail, createUser } from '@/api/auth';

// 로컬 스토리지에 사용자 정보를 저장할 때 사용할 키
const STORAGE_KEY = 'budget-auth-user';

/**
 * 인증 상태 관리 스토어
 * 사용자 로그인, 회원가입, 로그아웃 및 세션 관리를 담당
 */
export const useAuthStore = defineStore('auth', () => {
  // ===== STATE (상태) =====
  /** 현재 로그인한 사용자 정보 (id, name, email, createdAt) */
  const user = ref(null);

  /** 로딩 상태 - API 요청 중인지 여부 */
  const isLoading = ref(false);

  /** 에러 메시지 - 로그인/회원가입 실패 시 표시할 메시지 */
  const errorMessage = ref('');

  // ===== GETTERS (계산된 값) =====
  /** 로그인 상태 확인 - user가 존재하면 true */
  const isLoggedIn = computed(() => !!user.value);

  // ===== ACTIONS (액션들) =====

  /**
   * 에러 메시지 초기화
   * 새로운 요청을 시작하기 전에 이전 에러를 클리어
   */
  const clearError = () => {
    errorMessage.value = '';
  };

  /**
   * 사용자 정보 설정 및 로컬 스토리지에 저장
   * @param {Object} userData - 사용자 정보 객체
   * @param {number} userData.id - 사용자 ID
   * @param {string} userData.name - 사용자 이름
   * @param {string} userData.email - 사용자 이메일
   * @param {string} userData.createdAt - 가입일시 (ISO string)
   */
  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  /**
   * 사용자 정보 제거 및 로컬 스토리지 클리어
   * 로그아웃 시 호출됨
   */
  const clearUser = () => {
    user.value = null;
    localStorage.removeItem(STORAGE_KEY);
  };

  /**
   * 로컬 스토리지에서 사용자 정보 로드
   * 앱 시작 시 또는 페이지 새로고침 시 호출
   * 저장된 데이터가 유효하지 않으면 자동으로 클리어
   */
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

  /**
   * 사용자 로그인 처리
   * @param {Object} params - 로그인 파라미터
   * @param {string} params.email - 사용자 이메일
   * @param {string} params.password - 사용자 비밀번호
   * @returns {Promise<{success: boolean, message: string}>} 로그인 결과
   */
  const login = async ({ email, password }) => {
    isLoading.value = true;
    clearError();

    try {
      // 1. 이메일로 사용자 검색
      const users = await findUserByEmail(email);
      const foundUser = users[0];

      // 2. 사용자가 존재하지 않는 경우
      if (!foundUser) {
        errorMessage.value = '존재하지 않는 이메일입니다.';
        return {
          success: false,
          message: errorMessage.value,
        };
      }

      // 3. 비밀번호 검증
      if (foundUser.password !== password) {
        errorMessage.value = '비밀번호가 올바르지 않습니다.';
        return {
          success: false,
          message: errorMessage.value,
        };
      }

      // 4. 로그인 성공 - 안전한 사용자 정보만 저장 (비밀번호 제외)
      const safeUser = {
        id: foundUser.id,
        name: foundUser.name ?? foundUser.nickname, // name이 없으면 nickname 사용
        email: foundUser.email,
        phone: foundUser.phone,
        createdAt: foundUser.createdAt,
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

  /**
   * 사용자 회원가입 처리
   * @param {Object} params - 회원가입 파라미터
   * @param {string} params.name - 사용자 이름
   * @param {string} params.email - 사용자 이메일
   * @param {string} params.phone - 사용자 전화번호
   * @param {string} params.password - 사용자 비밀번호
   * @returns {Promise<{success: boolean, message: string}>} 회원가입 결과
   */
  const signup = async ({ name, email, phone, password }) => {
    isLoading.value = true;
    clearError();

    try {
      // 1. 이메일 중복 체크
      const users = await findUserByEmail(email);

      if (users.length > 0) {
        errorMessage.value = '이미 사용 중인 이메일입니다.';
        return {
          success: false,
          message: errorMessage.value,
        };
      }

      // 2. 새 사용자 생성 (현재 시간으로 가입일 설정)
      const createdAt = new Date().toISOString();
      const createdUser = await createUser({
        name,
        email,
        phone,
        password,
        createdAt,
      });

      // 3. 회원가입 성공 - 자동 로그인 처리
      const safeUser = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        createdAt: createdUser.createdAt,
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

  /**
   * 사용자 로그아웃 처리
   * 사용자 정보와 로컬 스토리지 데이터를 모두 제거
   */
  const logout = () => {
    clearUser();
  };

  // ===== STORE 반환 =====
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
