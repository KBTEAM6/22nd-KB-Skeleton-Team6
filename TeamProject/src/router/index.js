import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/HomeView.vue';
import LedgerView from '../pages/LedgerView.vue';
import MyPageView from '../pages/MyPageView.vue';
import GroupView from '../pages/GroupView.vue';
import MemberListView from '../pages/MemberListView.vue';
import LoginView from '../pages/LoginView.vue';
import SignupView from '../pages/SignupView.vue';
import { useAuthStore } from '../stores/auth';
import { useLedgerStore } from '../stores/ledger';
import { useMemberStore } from '../stores/member';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { public: true, hideShell: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { public: true, hideShell: true },
  },
  { path: '/', name: 'home', component: HomeView },
  { path: '/ledger', name: 'ledger', component: LedgerView },
  { path: '/mypage', name: 'mypage', component: MyPageView },
  { path: '/group/:id?', name: 'group', component: GroupView },
  { path: '/member', name: 'member', component: MemberListView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const ledgerStore = useLedgerStore();
  const memberStore = useMemberStore();

  if (authStore.users.length === 0) {
    authStore.hydrateSession();
    await Promise.all([
      authStore.fetchUsers(),
      ledgerStore.fetchTransactions(),
      memberStore.fetchMembers(),
    ]);
  }

  if (!to.meta.public && !authStore.isAuthenticated) {
    return { name: 'login' };
  }

  if (to.meta.public && authStore.isAuthenticated) {
    return { name: 'home' };
  }
});

export default router;
