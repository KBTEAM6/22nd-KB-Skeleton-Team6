<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Home, BookOpen, Users, User } from 'lucide-vue-next';

const props = defineProps({
  currentView: {
    type: String,
    default: '',
  },
});

const menuItems = [
  { id: 'home', label: '홈', icon: Home, to: '/home' },
  { id: 'ledger', label: '가계부', icon: BookOpen, to: '/ledger' },
  { id: 'couple', label: '부부 가계부', icon: Users, to: '/couples' },
  { id: 'mypage', label: '마이페이지', icon: User, to: '/mypage' },
];

const route = useRoute();

const activeView = computed(() => {
  if (props.currentView) return props.currentView;
  const path = route.path;
  if (path === '/') return 'home';
  if (path.startsWith('/ledger')) return 'ledger';
  if (path.startsWith('/couples')) return 'couples';
  if (path.startsWith('/mypage')) return 'mypage';
  return 'home';
});
</script>

<template>
  <aside
    class="d-flex flex-column bg-white border-end vh-100"
    style="width: 256px"
  >
    <div class="p-4 d-flex align-items-center gap-3">
      <div
        class="d-flex align-items-center justify-content-center rounded-3"
        style="width: 40px; height: 40px; background-color: rgb(255, 204, 80)"
      >
        <span class="fs-5">💰</span>
      </div>
      <div>
        <h1 class="fw-bold fs-5 mb-0">KB가계부</h1>
        <p class="small text-muted mb-0">KB Bank Ledger</p>
      </div>
    </div>

    <nav class="flex-grow-1 px-3 py-4 d-flex flex-column">
      <RouterLink
        v-for="item in menuItems"
        :key="item.id"
        :to="item.to"
        class="w-100 d-flex align-items-center gap-3 px-4 py-3 rounded-4 mb-2 border-0 text-start btn sidebar-btn text-decoration-none"
        :class="activeView === item.id ? 'text-dark fw-medium' : 'text-muted'"
        :style="
          activeView === item.id ? 'background-color: rgb(255,204,80);' : ''
        "
      >
        <component :is="item.icon" style="width: 20px; height: 20px" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="p-4 border-top">
      <div class="d-flex align-items-center gap-3 px-2">
        <div
          class="d-flex align-items-center justify-content-center rounded-circle"
          style="width: 40px; height: 40px; background-color: rgb(255, 188, 80)"
        >
          <span>김</span>
        </div>
        <div class="flex-grow-1">
          <p class="fw-medium mb-0">김철수</p>
          <p class="small text-muted mb-0">user@kb.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-btn {
  background-color: transparent;
  transition: background-color 0.2s ease;
}
.sidebar-btn.text-muted:hover {
  background-color: #e9ecef;
}
</style>
