<script setup>
import { usecouplesStore } from "@/stores/couples";
import { useAuthStore } from "@/stores/auth";

const coupleStore = usecouplesStore();
const authStore = useAuthStore();

const myId = authStore.user.id;
const props = defineProps({
  user: Object,
  type: String,
  requestId: Number,
});
const emit = defineEmits(["action"]);
</script>
<template>
  <div
    class="couple-card mx-auto bg-white rounded-4 p-4 shadow-sm d-flex align-items-center justify-content-between border w-100"
    style="max-width: 56rem"
  >
    <div class="d-flex align-items-center gap-3">
      <img
        class="rounded-circle object-fit-cover"
        style="width: 56px; height: 56px"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDftwAZ6yHDb__srqcdXMrN_IYNTXVXvQJkK2pE2fVNcgUHorcnWJB-C8ZGK5a9_FjfswfOTntz6snsOsYdkLA0gD9Wah_YVTKhB4K8UUFP1rBKI__mJ17uTk1oNAYoABuXovMCCKys_fMdY2eG_zUtgFvIZSB_ETVO7M2REjK6xHT68SrlYGN3F842Vam4Rm_-0EJrqtPUbIDlFPOOEjcIU9gICXH2Y5K3jtcivyeiiif0X38GAlYECUjqaOWPsOMpSDwmFUixZm-f"
      />
      <div>
        <h3 class="fw-bold m-0 fs-6">{{ user.nickname }}</h3>
        <p class="small text-muted m-0">{{ user.email }}</p>
      </div>
    </div>
    <div class="d-flex gap-2">
      <button
        v-if="type === 'search'"
        @click="$emit('action', { type: 'request', user })"
        class="btn rounded-pill px-4 py-2 small fw-bold text-white"
        :style="{
          backgroundColor:
            coupleStore.isAlreadyRequested(myId, user.id) ||
            coupleStore.isTargetAlreadyCoupled(user.id)
              ? '#e57373'
              : '#4a90e2',
          border: 'none',
        }"
        :disabled="
          coupleStore.isAlreadyRequested(myId, user.id) ||
          coupleStore.isTargetAlreadyCoupled(user.id)
        "
      >
        {{
          coupleStore.isAlreadyRequested(myId, user.id) ||
          coupleStore.isTargetAlreadyCoupled(user.id)
            ? "요청불가"
            : "부부 요청"
        }}
      </button>
      <template v-else-if="type === 'received'">
        <button
          @click="$emit('action', { type: 'accept', user })"
          class="btn rounded-pill px-4 py-2 small fw-bold text-white"
          style="background-color: #4a90e2; border: none"
        >
          수락
        </button>
        <button
          @click="$emit('action', { type: 'reject', user })"
          class="btn rounded-pill px-4 py-2 small fw-bold text-white"
          style="background-color: #e57373; border: none"
        >
          거절
        </button>
      </template>
      <template v-else-if="type === 'sent'">
        <button
          @click="
            $emit('action', { type: 'cancel', requestId: props.requestId })
          "
          class="btn rounded-pill px-4 py-2 small fw-bold text-white"
          style="background-color: #e57373; border: none"
        >
          전송 취소
        </button>
      </template>
    </div>
  </div>
</template>
<style scoped>
.couple-card {
  transition: all 0.25s ease;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
}

.couple-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.1);
  border-color: #d6dee8;
}
</style>
