<script setup>
import { usecouplesStore } from "@/stores/couples.js";
import { useAuthStore } from "@/stores/auth.js";
import { ref, onMounted } from "vue";
import CoupleCard from "@/components/common/CoupleCard.vue";
import { useUiStore } from "@/stores/ui";

const uiStore = useUiStore();

const coupleStore = usecouplesStore();
const authStore = useAuthStore();
const keyword = ref("");

const handleSearch = () => {
  if (!keyword.value.trim()) {
    coupleStore.searchResults = [];
    return;
  }
  coupleStore.searchUsers(keyword.value, authStore.user.id);
};

const resetSearch = () => {
  keyword.value = "";
  coupleStore.searchResults = [];
};
const getUserCardType = (user) => {
  const receivedReq = coupleStore.pendingReceivedRequests.find(
    (req) => req.user?.id === user.id,
  );
  if (receivedReq) return "received";

  const sentReq = coupleStore.pendingSentRequests.find(
    (req) => req.user?.id === user.id,
  );
  if (sentReq) return "sent";
  if (coupleStore.isTargetAlreadyCoupled(user.id)) {
    return "matched";
  }
  return "search";
};
const getRequestIdByUser = (user) => {
  const sentReq = coupleStore.pendingSentRequests.find(
    (req) => req.user?.id === user.id,
  );

  return sentReq?.id ?? null;
};
const getReceivedRequestUser = (user) => {
  const receivedReq = coupleStore.pendingReceivedRequests.find(
    (req) => req.user?.id === user.id,
  );

  return receivedReq ?? user;
};

const handleAction = async ({ type, user, requestId }) => {
  const myId = authStore.user.id;

  if (type === "request") {
    const result = await coupleStore.sendcoupleRequest({
      requesterId: myId,
      targetUserId: user.id,
    });

    if (result.success) {
      await coupleStore.fetchSentRequests(myId);
      uiStore.showToast("파트너 요청을 보냈습니다.");
    } else {
      uiStore.showToast(result.message || "요청 전송에 실패했습니다.");
    }
  }

  if (type === "accept") {
    const request = user;
    const result = await coupleStore.acceptcoupleRequest(request);

    if (result.success) {
      uiStore.showToast("커플 연결이 완료되었습니다.");
      return;
    }

    uiStore.showToast(result.message || "요청 수락에 실패했습니다.");
  }

  if (type === "reject") {
    const request = user;
    const result = await coupleStore.rejectcoupleRequest(request.id);

    if (result.success) {
      await coupleStore.fetchReceivedRequests(myId);
      uiStore.showToast("요청을 거절했습니다.", "error");
    } else {
      uiStore.showToast(result.message || "거절 실패", "error");
    }
  }

  if (type === "cancel") {
    const result = await coupleStore.cancelcoupleRequest(requestId);

    if (result.success) {
      await coupleStore.fetchSentRequests(myId);
      uiStore.showToast("요청을 취소했습니다.", "error");
    } else {
      uiStore.showToast(result.message || "취소 실패", "error");
    }
  }
};
</script>

<template>
  <div class="couples-page min-vh-100 p-4 p-md-5">
    <div class="container-fluid px-0 mx-auto" style="max-width: 86rem">
      <header class="mb-4">
        <h1 class="fs-4 fw-bold mb-2">배우자 관리</h1>
        <p class="small section-desc mb-0">
          함께 자산을 관리할 배우자를 찾고 연결하세요.
        </p>
      </header>

      <main class="row g-4">
        <section class="col-12 col-xl-5">
          <div class="content-panel h-100">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h2 class="fs-5 fw-bold mb-1">배우자 검색</h2>
                <p class="small section-desc mb-0">
                  이름 또는 이메일로 검색할 수 있습니다.
                </p>
              </div>
            </div>

            <form class="form mb-4" @submit.prevent>
              <button type="button" aria-label="검색">
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    stroke-width="1.333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <input
                v-model="keyword"
                @input="handleSearch"
                class="input"
                placeholder="배우자 검색 (이름 또는 이메일)"
                type="text"
              />

              <button
                type="reset"
                class="reset"
                @click="resetSearch"
                aria-label="검색어 초기화"
              >
                ✕
              </button>
            </form>

            <div class="d-flex flex-column gap-3">
              <template v-if="coupleStore.searchResults.length > 0">
                <CoupleCard
                  v-for="user in coupleStore.searchResults"
                  :key="user.id"
                  :user="user"
                  :type="getUserCardType(user)"
                  :request-id="getRequestIdByUser(user)"
                  @action="
                    (payload) =>
                      handleAction({
                        ...payload,
                        user:
                          payload.type === 'accept' || payload.type === 'reject'
                            ? getReceivedRequestUser(user)
                            : user,
                      })
                  "
                />
              </template>

              <div v-else class="empty-box">검색 결과가 없습니다.</div>
            </div>
          </div>
        </section>
        <section class="col-12 col-xl-7">
          <div class="d-flex flex-column gap-4">
            <!-- 받은 요청 -->
            <div class="content-panel">
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <div>
                  <h2 class="fs-5 fw-bold mb-1">받은 요청</h2>
                  <p class="small section-desc mb-0">
                    상대방이 보낸 부부 연결 요청입니다.
                  </p>
                </div>
                <span class="count-badge">
                  {{ coupleStore.pendingReceivedRequests.length }}건
                </span>
              </div>

              <div class="d-flex flex-column gap-3">
                <template v-if="coupleStore.pendingReceivedRequests.length > 0">
                  <CoupleCard
                    v-for="req in coupleStore.pendingReceivedRequests"
                    :key="req.id"
                    :user="req.user"
                    type="received"
                    @action="
                      (payload) => handleAction({ ...payload, user: req })
                    "
                  />
                </template>

                <div v-else class="empty-box">아직 받은 요청이 없습니다.</div>
              </div>
            </div>

            <div class="content-panel">
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <div>
                  <h2 class="fs-5 fw-bold mb-1">보낸 요청</h2>
                  <p class="small section-desc mb-0">
                    내가 보낸 부부 연결 요청입니다.
                  </p>
                </div>
                <span class="count-badge">
                  {{ coupleStore.pendingSentRequests.length }}건
                </span>
              </div>

              <div class="d-flex flex-column gap-3">
                <template v-if="coupleStore.pendingSentRequests.length > 0">
                  <CoupleCard
                    v-for="req in coupleStore.pendingSentRequests"
                    :key="req.id"
                    :user="req.user"
                    :request-id="req.id"
                    type="sent"
                    @action="handleAction"
                  />
                </template>

                <div v-else class="empty-box">아직 보낸 요청이 없습니다.</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
<style scoped>
.couples-page {
  background: var(--page-bg);
  color: var(--text-color);
}

.content-panel {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.section-desc {
  color: var(--text-muted);
}

.empty-box {
  background: var(--sub-bg);
  border: 1px dashed var(--border-light);
  border-radius: 1rem;
  padding: 1.2rem 1rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.count-badge {
  background: rgba(255, 188, 0, 0.14);
  color: var(--kb-yellow);
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}

.form {
  --width-of-input: 100%;
  --height-of-input: 50px;
  --input-bg: var(--sub-bg);
  --border-radius: 30px;

  position: relative;
  width: var(--width-of-input);
  height: var(--height-of-input);
  display: flex;
  align-items: center;
  padding-inline: 1rem;
  border-radius: var(--border-radius);
  background: var(--input-bg);
  border: 1px solid var(--border-light);
  transition: all 0.25s ease;
}

.form button {
  border: none;
  background: none;
  color: var(--text-muted);
}

.input {
  font-size: 0.95rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  border: none;
  padding-inline: 0.6rem;
  color: var(--text-color);
}

.input::placeholder {
  color: var(--text-muted);
}

.input:focus {
  outline: none;
}

.form button:focus {
  outline: none;
}

.form:focus-within {
  box-shadow: 0 0 0 3px rgba(255, 204, 80, 0.28);
  border-color: rgb(255, 204, 80);
}

.reset {
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}

.form svg {
  width: 17px;
  color: var(--text-muted);
}

@media (max-width: 1199.98px) {
  .content-panel {
    padding: 1.25rem;
  }
}
</style>
