// src/stores/couples.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  searchUsersByKeyword,
  getReceivedcoupleRequests,
  getSentcoupleRequests,
  createcoupleRequest,
  updatecoupleRequest,
  getcouplesByUserId,
  createcouple,
  deletecouple,
} from '@/api/couples';

export const usecouplesStore = defineStore('couples', () => {
  const couples = ref([]);
  const receivedRequests = ref([]);
  const sentRequests = ref([]);
  const searchResults = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref('');

  const pendingReceivedRequests = computed(() =>
    receivedRequests.value.filter((item) => item.status === 'pending'),
  );

  const pendingSentRequests = computed(() =>
    sentRequests.value.filter((item) => item.status === 'pending'),
  );

  const coupleCount = computed(() => couples.value.length);

  const coupleIds = computed(() =>
    couples.value.map((item) => item.coupleUserId),
  );

  const searchUsers = async (keyword, myUserId) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      const users = await searchUsersByKeyword(keyword);
      searchResults.value = users.filter((user) => user.id !== myUserId);
    } catch (error) {
      errorMessage.value = error.message || '사용자 검색에 실패했습니다.';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchcouples = async (userId) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';
      couples.value = await getcouplesByUserId(userId);
    } catch (error) {
      errorMessage.value = error.message || '친구 목록 조회에 실패했습니다.';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchReceivedRequests = async (userId) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';
      receivedRequests.value = await getReceivedcoupleRequests(userId);
    } catch (error) {
      errorMessage.value =
        error.message || '받은 친구 요청 조회에 실패했습니다.';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchSentRequests = async (userId) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';
      sentRequests.value = await getSentcoupleRequests(userId);
    } catch (error) {
      errorMessage.value =
        error.message || '보낸 친구 요청 조회에 실패했습니다.';
    } finally {
      isLoading.value = false;
    }
  };

  const sendcoupleRequest = async ({ requesterId, targetUserId }) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      const created = await createcoupleRequest({
        requesterId,
        targetUserId,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      sentRequests.value.unshift(created);

      return { success: true };
    } catch (error) {
      errorMessage.value = error.message || '친구 요청 전송에 실패했습니다.';
      return { success: false, message: errorMessage.value };
    } finally {
      isLoading.value = false;
    }
  };

  const acceptcoupleRequest = async (request) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      await updatecoupleRequest(request.id, { status: 'accepted' });

      await createcouple({
        userId: request.requesterId,
        coupleUserId: request.targetUserId,
        createdAt: new Date().toISOString(),
      });

      await createcouple({
        userId: request.targetUserId,
        coupleUserId: request.requesterId,
        createdAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      errorMessage.value = error.message || '친구 요청 수락에 실패했습니다.';
      return { success: false, message: errorMessage.value };
    } finally {
      isLoading.value = false;
    }
  };

  const rejectcoupleRequest = async (requestId) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      await updatecoupleRequest(requestId, { status: 'rejected' });
      receivedRequests.value = receivedRequests.value.map((item) =>
        item.id === requestId ? { ...item, status: 'rejected' } : item,
      );

      return { success: true };
    } catch (error) {
      errorMessage.value = error.message || '친구 요청 거절에 실패했습니다.';
      return { success: false, message: errorMessage.value };
    } finally {
      isLoading.value = false;
    }
  };

  const removecouple = async (coupleRelationId) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      await deletecouple(coupleRelationId);
      couples.value = couples.value.filter(
        (item) => item.id !== coupleRelationId,
      );

      return { success: true };
    } catch (error) {
      errorMessage.value = error.message || '친구 삭제에 실패했습니다.';
      return { success: false, message: errorMessage.value };
    } finally {
      isLoading.value = false;
    }
  };

  const clearcouplesData = () => {
    couples.value = [];
    receivedRequests.value = [];
    sentRequests.value = [];
    searchResults.value = [];
    errorMessage.value = '';
  };

  return {
    couples,
    receivedRequests,
    sentRequests,
    searchResults,
    isLoading,
    errorMessage,
    pendingReceivedRequests,
    pendingSentRequests,
    coupleCount,
    coupleIds,
    searchUsers,
    fetchcouples,
    fetchReceivedRequests,
    fetchSentRequests,
    sendcoupleRequest,
    acceptcoupleRequest,
    rejectcoupleRequest,
    removecouple,
    clearcouplesData,
  };
});
