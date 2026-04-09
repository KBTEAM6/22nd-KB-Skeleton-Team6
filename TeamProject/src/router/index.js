import { createRouter, createWebHistory } from 'vue-router';

// layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

// pages
import LoginPage from '@/pages/auth/LoginPage.vue';
import SignupPage from '@/pages/auth/SignupPage.vue';
import HomePage from '@/pages/home/HomePage.vue';
import LedgerPage from '@/pages/ledger/LedgerPage.vue';
import FriendSearchPage from '@/pages/friends/FriendSearchPage.vue';
import CoupleLedgerPage from '@/pages/couple/CoupleLedgerPage.vue';
import MyPagePage from '@/pages/mypage/MyPagePage.vue';
import SettingsPage from '@/pages/settings/SettingsPage.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage,
      },
      {
        path: 'ledger',
        name: 'ledger',
        component: LedgerPage,
      },
      {
        path: 'friends',
        name: 'friends',
        component: FriendSearchPage,
      },
      {
        path: 'couple',
        name: 'couple',
        component: CoupleLedgerPage,
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

export default router;
