<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Home, BookOpen, Users, User } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui'; // 추가

const uiStore = useUiStore();

// 인증 store 사용
const authstore = useAuthStore();

// 현재 URL 경로 확인용
const route = useRoute();

// 클릭 시 원하는 페이지로 이동시키기 위한 router
const router = useRouter();

// 프로필 메뉴(설정/로그아웃/파트너 정보) 열림 여부
// false면 닫힘, true면 열림
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

// 프로필 영역 클릭 시 메뉴 토글
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

// "파트너 정보" 버튼 클릭 시 이동
// 필요에 따라 '/couples' 대신 다른 경로로 바꿔도 됨
const goToPartnerInfo = () => {
  router.push('/couples');
  isProfileMenuOpen.value = false;
};

// 로그아웃 처리
// 1. store에서 로그아웃
// 2. 메뉴 닫기
// 3. 로그인 페이지로 이동
const handleLogout = () => {
  authstore.logout();
  uiStore.showToast('로그아웃 했습니다.');
  isProfileMenuOpen.value = false;
  router.push('/auth/login');
};

// "설정" 클릭 시에도 메뉴를 닫고 싶다면 사용하는 함수
const closeProfileMenu = () => {
  isProfileMenuOpen.value = false;
};
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
            @click="closeProfileMenu"
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
/* 프로필 영역 전체를 기준점으로 사용
   드롭다운 메뉴를 absolute로 띄우기 위해 relative 필요 */
.profile-area {
  position: relative;
}

/* 프로필 버튼 기본 스타일
   기존 사이드바 메뉴 버튼과 비슷한 hover 감각을 주기 위해 배경 전환만 사용 */
.profile-trigger {
  background-color: transparent;
  transition: background-color 0.2s ease;
}

/* 마우스를 올렸을 때 위 메뉴 버튼들과 비슷한 느낌 */
.profile-trigger:hover {
  background-color: #e9ecef;
}

/* 프로필 메뉴가 열려 있을 때 버튼 자체도 선택된 느낌을 주고 싶을 때 */
.profile-trigger-open {
  background-color: rgb(255, 204, 80);
}

/* 드롭다운 카드
   버튼 아래가 아니라 위쪽으로 띄우기 위해 bottom 사용 */
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

/* 메뉴 항목 공통 스타일
   RouterLink와 button이 똑같이 보이도록 통일 */
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

/* 메뉴 항목 hover */
.profile-menu-item:hover {
  background-color: #f8f9fa;
}

/* 로그아웃처럼 위험 액션은 색상 분리 */
.profile-menu-item-danger {
  color: #dc3545;
}

/* 모바일/좁은 화면 대응으로 media query */
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

/* 사이드바 design */
.sidebar-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

/* 로고 */
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
</style>
