import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from './api';

export const useMemberStore = defineStore('member', () => {
  const members = ref([]);

  async function fetchMembers() {
    const memberRes = await api.get('/members');
    members.value = memberRes.data;
  }

  return {
    members,
    fetchMembers,
  };
});
