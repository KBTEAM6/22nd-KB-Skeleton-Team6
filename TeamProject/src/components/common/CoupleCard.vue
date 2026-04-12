<script setup>
import { computed } from 'vue';
import { getProfileImageSrc } from '@/components/common/profileImages.js';

const props = defineProps({
  user: Object,
  type: String,
  requestId: Number,
});

defineEmits(['action']);

const profileImageSrc = computed(() => getProfileImageSrc(props.user?.profileImageKey));
</script>

<template>
  <div class="couple-card mx-auto w-100">
    <div class="card-left">
      <img class="profile-img" :src="profileImageSrc" alt="프로필 이미지" />
      <div class="user-info">
        <h3 class="user-name">
          {{ user.name || user.nickname || '이름 없음' }}
        </h3>
        <p class="user-email">{{ user.email }}</p>
      </div>
    </div>

    <div class="card-actions">
      <button
        v-if="type === 'search'"
        @click="$emit('action', { type: 'request', user })"
        class="action-btn btn-blue"
      >
        파트너 요청
      </button>

      <template v-else-if="type === 'received'">
        <button
          @click="$emit('action', { type: 'accept', user })"
          class="action-btn btn-blue"
        >
          수락
        </button>
        <button
          @click="$emit('action', { type: 'reject', user })"
          class="action-btn btn-red"
        >
          거절
        </button>
      </template>

      <template v-else-if="type === 'sent'">
        <button
          @click="$emit('action', { type: 'cancel', requestId: props.requestId })"
          class="action-btn btn-red"
        >
          요청 취소
        </button>
      </template>

      <template v-else-if="type === 'matched'">
        <button class="action-btn btn-disabled" disabled>매칭된 사용자</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.couple-card {
  max-width: 56rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 1.25rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.25s ease;
}

.couple-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.1);
  border-color: var(--border-light);
}

.card-left {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
  flex: 1;
}

.profile-img {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid var(--border-light);
}

.user-info {
  min-width: 0;
}

.user-name {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--text-color);
}

.user-email {
  margin: 0.2rem 0 0;
  font-size: 0.86rem;
  color: var(--text-muted);
  word-break: break-all;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.55rem;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.action-btn {
  border: none;
  border-radius: 999px;
  padding: 0.68rem 1rem;
  min-width: 96px;
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1;
  color: white;
  transition:
    transform 0.15s ease,
    opacity 0.2s ease,
    box-shadow 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.action-btn:disabled {
  cursor: not-allowed;
  transform: none;
}

.btn-blue {
  background-color: #4a90e2;
}

.btn-red {
  background-color: #e57373;
}

.btn-disabled {
  background-color: var(--sub-bg);
  color: var(--text-muted);
  border: 1px solid var(--border-light);
}

@media (max-width: 992px) {
  .couple-card {
    padding: 1rem 1rem;
  }

  .action-btn {
    min-width: 88px;
    padding: 0.65rem 0.9rem;
  }
}

@media (max-width: 768px) {
  .couple-card {
    flex-direction: column;
    align-items: stretch;
    gap: 0.9rem;
    padding: 1rem;
  }

  .card-left {
    width: 100%;
  }

  .card-actions {
    width: 100%;
    justify-content: stretch;
    gap: 0.5rem;
  }

  .card-actions > * {
    flex: 1 1 0;
  }

  .action-btn {
    width: 100%;
    min-width: 0;
    padding: 0.8rem 0.9rem;
  }
}

@media (max-width: 480px) {
  .profile-img {
    width: 48px;
    height: 48px;
  }

  .user-name {
    font-size: 0.93rem;
  }

  .user-email {
    font-size: 0.8rem;
  }

  .action-btn {
    font-size: 0.8rem;
    padding: 0.75rem 0.8rem;
  }
}
</style>
