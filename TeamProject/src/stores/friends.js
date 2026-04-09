import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '../api/api';

export const useMemberStore = defineStore('member', () => {
  const members = ref([]);

  async function fetchMembers() {
    const memberRes = await api.get('/users');
    members.value = memberRes.data;
  }

  return {
    members,
    fetchMembers,
  };
});
