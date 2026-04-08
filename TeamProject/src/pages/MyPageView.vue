<template>
  <section class="center-card my-page">
    <h2 class="page-title">마이페이지</h2>
    <div class="profile-header">
      <div class="profile-circle">프로필이미지</div>
      <button class="edit-profile-btn" @click="toggleEdit">✏️</button>
    </div>
    <p class="id-text">ID : {{ authStore.currentUser.name }}</p>
    <div class="profile-edit-form card-box">
      <label>
        테스트 사용자 전환
        <select :value="authStore.activeUserId" @change="changeUser">
          <option v-for="user in authStore.users" :key="user.id" :value="user.id">
            {{ user.name }} ({{ user.email }})
          </option>
        </select>
      </label>
      <small class="text-muted">로그인/회원가입 도입 전 다중 사용자 동작 검증용입니다.</small>
    </div>
    <form v-if="editMode" class="card-box profile-edit-form" @submit.prevent="saveProfile">
      <label>이름 <input v-model="name" required /></label>
      <label>이메일 <input v-model="email" type="email" required /></label>
      <button class="btn btn-dark">저장</button>
    </form>
    <div class="mypage-actions">
      <button class="btn btn-outline-dark rounded-pill px-4">비밀번호 변경</button>
      <button class="btn btn-outline-dark rounded-pill px-4">배지 찾기</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const editMode = ref(false);
const name = ref(authStore.currentUser.name);
const email = ref(authStore.currentUser.email ?? '');

const toggleEdit = () => {
  editMode.value = !editMode.value;
  name.value = authStore.currentUser.name;
  email.value = authStore.currentUser.email ?? '';
};

const saveProfile = async () => {
  await authStore.updateCurrentUser({
    name: name.value,
    email: email.value,
  });
  editMode.value = false;
};

const changeUser = (event) => {
  authStore.setActiveUser(Number(event.target.value));
  name.value = authStore.currentUser.name;
  email.value = authStore.currentUser.email ?? '';
};
</script>
