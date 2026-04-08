<template>
  <section>
    <h2 class="page-title">연동가계부</h2>

    <div class="friend-toolbar">
      <input class="form-control" placeholder="친구 검색" v-model="keyword" />
      <button class="invite-btn" @click="showRequests = !showRequests">👤+</button>
    </div>

    <article class="card-box friend-list">
      <div class="friend-row" v-for="member in filteredMembers" :key="member.id">
        <div class="profile-mini">
          <span class="avatar large"></span>
          <strong class="clickable" @click="openGroup(member)">{{ member.name }}</strong>
        </div>
        <button class="btn btn-outline-dark btn-sm" @click="openGroup(member)">1:1 가계부</button>
      </div>
    </article>

    <article class="card-box request-box" v-if="showRequests">
      <h3>친구 요청</h3>
      <div class="friend-row" v-for="request in friendRequests" :key="request.id">
        <div class="profile-mini">
          <span class="avatar large"></span>
          <strong>{{ request.name }}</strong>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-dark">수락</button>
          <button class="btn btn-sm btn-outline-secondary">삭제</button>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '../stores/member';

const memberStore = useMemberStore();
const router = useRouter();
const keyword = ref('');
const showRequests = ref(false);
const friendRequests = ref([{ id: 100, name: '김샘플' }]);

const filteredMembers = computed(() =>
  memberStore.members.filter((member) => member.name.toLowerCase().includes(keyword.value.toLowerCase())),
);

const openGroup = (member) => {
  router.push({ name: 'group', params: { id: member.id } });
};

</script>
