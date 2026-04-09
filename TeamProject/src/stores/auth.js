import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '../api/api';

export const useAuthStore = defineStore('auth', () => {
  const users = ref([]);
  const activeUserId = ref(0);
  const currentUser = ref({ id: null, name: '게스트', email: '' });
  const isAuthenticated = computed(() => Boolean(currentUser.value?.id));

  async function fetchUsers() {
    const usersRes = await api.get('/users');
    users.value = usersRes.data;
    setActiveUser(activeUserId.value);
  }

  function setActiveUser(userId) {
    activeUserId.value = Number(userId);
    const found = users.value.find((user) => Number(user.id) === Number(activeUserId.value));
    if (found) {
      currentUser.value = found;
      return;
    }
    currentUser.value = {
      id: activeUserId.value || null,
      name: activeUserId.value ? `사용자${activeUserId.value}` : '게스트',
      email: '',
    };
  }

  function hydrateSession() {
    const raw = localStorage.getItem('ledger_active_user_id');
    if (!raw) {
      activeUserId.value = 0;
      currentUser.value = { id: null, name: '게스트', email: '' };
      return;
    }
    activeUserId.value = Number(raw);
  }

  async function login(email, password) {
    if (users.value.length === 0) {
      await fetchUsers();
    }
    const found = users.value.find((user) => user.email === email && user.password === password);
    if (!found) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    setActiveUser(found.id);
    localStorage.setItem('ledger_active_user_id', String(found.id));
  }

  async function signup({ name, email, password }) {
    if (users.value.length === 0) {
      await fetchUsers();
    }
    if (users.value.some((user) => user.email === email)) {
      throw new Error('이미 가입된 이메일입니다.');
    }
    const response = await api.post('/users', { name, email, password });
    users.value.push(response.data);
    setActiveUser(response.data.id);
    localStorage.setItem('ledger_active_user_id', String(response.data.id));
  }

  async function updateCurrentUser(payload) {
    const response = await api.patch(`/users/${currentUser.value.id}`, payload);
    currentUser.value = response.data;
    const idx = users.value.findIndex((user) => user.id === currentUser.value.id);
    if (idx >= 0) {
      users.value[idx] = response.data;
    }
  }

  function logout() {
    localStorage.removeItem('ledger_active_user_id');
    activeUserId.value = 0;
    currentUser.value = { id: null, name: '게스트', email: '' };
  }

  return {
    users,
    activeUserId,
    currentUser,
    isAuthenticated,
    fetchUsers,
    setActiveUser,
    hydrateSession,
    login,
    signup,
    updateCurrentUser,
    logout,
  };
});
