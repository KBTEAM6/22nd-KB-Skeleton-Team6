<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Home, BookOpen, Users, User, Menu, X } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();
const authstore = useAuthStore();
const route = useRoute();
const router = useRouter();

const isProfileMenuOpen = ref(false);

const props = defineProps({
  currentView: {
    type: String,
    default: '',
  },
});

const menuItems = [
  { id: 'home', label: '홈', icon: Home, to: '/home' },
  { id: 'ledger', label: '가계부', icon: BookOpen, to: '/ledger' },
  { id: 'couples', label: '부부 가계부', icon: Users, to: '/couples' },
  { id: 'mypage', label: '마이페이지', icon: User, to: '/mypage' },
];

const activeView = computed(() => {
  if (props.currentView) return props.currentView;
  const path = route.path;
  if (path === '/') return 'home';
  if (path.startsWith('/ledger')) return 'ledger';
  if (path.startsWith('/couples')) return 'couples';
  if (path.startsWith('/mypage')) return 'mypage';
  return 'home';
});

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const goToPartnerInfo = () => {
  router.push('/couples');
  isProfileMenuOpen.value = false;
  uiStore.isSidebarOpen = false;
};

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false;
};

const closeSidebar = () => {
  uiStore.isSidebarOpen = false;
};

const toggleSidebar = () => {
  uiStore.toggleSidebar();
};

const handleLogout = () => {
  authstore.logout();
  uiStore.showToast('로그아웃 했습니다.');
  isProfileMenuOpen.value = false;
  uiStore.isSidebarOpen = false;
  router.push('/auth/login');
};

const handleMenuClick = () => {
  isProfileMenuOpen.value = false;
  uiStore.isSidebarOpen = false;
};
</script>

<template>
  <!-- 모바일 상단 바 -->
  <div class="mobile-topbar d-lg-none">
    <button type="button" class="hamburger-btn" @click="toggleSidebar">
      <Menu :size="22" />
    </button>
  </div>

  <!-- 모바일 오버레이 -->
  <div
    v-if="uiStore.isSidebarOpen"
    class="sidebar-overlay d-lg-none"
    @click="closeSidebar"
  ></div>

  <!-- 사이드바 -->
  <aside
    class="app-sidebar d-flex flex-column bg-white border-end"
    :class="{ 'sidebar-open': uiStore.isSidebarOpen }"
  >
    <div
      class="sidebar-header p-4 d-flex align-items-center justify-content-between"
    >
      <div class="d-flex align-items-center gap-3">
        <div
          class="d-flex align-items-center justify-content-center rounded-3"
          style="width: 40px; height: 40px; background-color: rgb(255, 204, 80)"
        >
          <div class="logo-box">
            <img
              src="@/assets/Logo.png"
              alt="KB 가계부 로고"
              class="sidebar-logo"
            />
          </div>
        </div>
        <div>
          <h1 class="fw-bold fs-5 mb-0">가계쀼</h1>
          <p class="small text-muted mb-0">Boo-jet</p>
        </div>
      </div>

      <!-- 모바일 닫기 버튼 -->
      <button
        type="button"
        class="sidebar-close-btn d-lg-none"
        @click="closeSidebar"
      >
        <X :size="20" />
      </button>
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
        @click="handleMenuClick"
      >
        <component :is="item.icon" style="width: 20px; height: 20px" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="p-4 border-top">
      <div class="profile-area">
        <button
          type="button"
          class="profile-trigger d-flex align-items-center gap-3 px-2 py-2 rounded-4 w-100 border-0 text-start"
          :class="{ 'profile-trigger-open': isProfileMenuOpen }"
          @click="toggleProfileMenu"
        >
          <div
            class="d-flex align-items-center justify-content-center rounded-circle"
            style="
              width: 40px;
              height: 40px;
              background-color: rgb(255, 188, 80);
            "
          >
            <span>{{ authstore.user?.name?.slice(0, 1) }}</span>
          </div>

          <div class="flex-grow-1">
            <p class="fw-medium mb-0">{{ authstore.user?.name ?? '' }}</p>
            <p class="small text-muted mb-0">
              {{ authstore.user?.email ?? '' }}
            </p>
          </div>
        </button>

        <div v-if="isProfileMenuOpen" class="profile-menu-card">
          <RouterLink
            to="/mypage"
            class="profile-menu-item text-decoration-none text-dark"
            @click="handleMenuClick"
          >
            설정
          </RouterLink>

          <button
            type="button"
            class="profile-menu-item"
            @click="goToPartnerInfo"
          >
            파트너 정보
          </button>

          <button
            type="button"
            class="profile-menu-item profile-menu-item-danger"
            @click="handleLogout"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.mobile-topbar {
  position: sticky;
  top: 0;
  z-index: 1040;
  height: 64px;
  padding: 0 1rem;
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.hamburger-btn,
.sidebar-close-btn {
  border: 0;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger-btn:hover,
.sidebar-close-btn:hover {
  background: #f3f4f6;
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.mobile-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.mobile-title {
  font-weight: 700;
  color: #212529;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 1045;
  background: rgba(15, 23, 42, 0.35);
}

.app-sidebar {
  width: 256px;
  height: 100vh;
  z-index: 1050;
  background: #fff;
}

.profile-area {
  position: relative;
}

.profile-trigger {
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.profile-trigger:hover {
  background-color: #e9ecef;
}

.profile-trigger-open {
  background-color: rgb(255, 204, 80);
}

.profile-menu-card {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% + 8px);
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  max-width: 100%;
}

.profile-menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: 0;
  border-radius: 0.8rem;
  background: transparent;
  color: #212529;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.profile-menu-item:hover {
  background-color: #f8f9fa;
}

.profile-menu-item-danger {
  color: #dc3545;
}

.logo-box {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-color: #f3f4f6;
  border: 2px solid rgb(255, 204, 80);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar-logo {
  width: 65px;
  height: 65px;
  object-fit: contain;
}

/* 데스크탑 */
@media (min-width: 992px) {
  .app-sidebar {
    position: sticky;
    top: 0;
    transform: none;
  }
}

/* 모바일/태블릿 */
@media (max-width: 991.98px) {
  .app-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.28s ease;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  }

  .app-sidebar.sidebar-open {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .profile-menu-card {
    bottom: calc(100% + 6px);
    padding: 0.4rem;
  }

  .profile-menu-item {
    padding: 0.7rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
