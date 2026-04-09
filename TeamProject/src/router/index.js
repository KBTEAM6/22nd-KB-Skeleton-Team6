import { createRouter, createWebHistory } from 'vue-router';

// layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

// pages
import LoginPage from '@/pages/auth/LoginPage.vue';
import SignupPage from '@/pages/auth/SignupPage.vue';
import HomePage from '@/pages/home/HomePage.vue';
import LedgerPage from '@/pages/ledger/LedgerPage.vue';
import CoupleDetailPage from '@/pages/couples/coupleDetailPage.vue';
import CoupleLedgerPage from '@/pages/couples/CoupleLedgerPage.vue';
import MyPagePage from '@/pages/mypage/MyPagePage.vue';
import SettingsPage from '@/pages/settings/SettingsPage.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomePage,
      },
      {
        path: 'ledger',
        name: 'ledger',
        component: LedgerPage,
      },
      {
        path: 'couples',
        name: 'couples',
        component: CoupleLedgerPage,
      },
      {
        path: 'couples2',
        name: 'couples2',
        component: CoupleDetailPage,
      },
      {
        path: 'mypage',
        name: 'mypage',
        component: MyPagePage,
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsPage,
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    meta: { guestOnly: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginPage,
      },
      {
        path: 'signup',
        name: 'signup',
        component: SignupPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  authStore.loadUserFromStorage();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' };
  }

  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return { name: 'home' };
  }

  return true;
});

export default router;
