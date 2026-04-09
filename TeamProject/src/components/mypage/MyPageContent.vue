<template>
  <div class="bg-light min-vh-100 p-4 p-md-5">
    <div class="container-fluid px-0 mx-auto d-flex flex-column gap-4" style="max-width: 80rem">
      <!--
        상단 헤더 영역
        실제 로그아웃 동작은 부모 페이지가 처리하고, 여기서는 이벤트만 올린다.
      -->
      <div class="d-flex align-items-center justify-content-between gap-3">
        <div class="text-start">
          <h2 class="fs-4 fw-bold mb-1">마이페이지</h2>
          <p class="text-muted fw-medium m-0">개인 정보와 계정 상태를 확인하고 수정할 수 있어요.</p>
        </div>
        <button @click="$emit('logout')" class="btn btn-outline-secondary">로그아웃</button>
      </div>

      <div class="row g-4 align-items-start">
        <!-- 왼쪽은 사용자 요약 카드 -->
        <div class="col-12 col-md-4">
          <MyPageProfileCard :user="user" />
        </div>

        <!-- 오른쪽은 상세 정보 + 편집 영역 -->
        <div class="col-12 col-md-8">
          <div class="bg-white p-4 p-lg-5 shadow-sm border h-100" style="border-radius: 2rem">
            <!--
              편집 버튼 / 저장 버튼 영역
              버튼 클릭 이벤트는 부모(MyPagePage)로 올려서 실제 상태 전환을 맡긴다.
            -->
            <div class="d-flex align-items-center justify-content-between mb-4 gap-3">
              <h4 class="fs-5 fw-bold m-0">상세 정보</h4>

              <div class="d-flex gap-2">
                <button
                  v-if="!isEditing"
                  type="button"
                  class="btn btn-outline-dark btn-sm"
                  @click="$emit('edit-start')"
                >
                  프로필 수정
                </button>

                <template v-else>
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    @click="$emit('edit-cancel')"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    :disabled="isSaving"
                    @click="$emit('save')"
                  >
                    {{ isSaving ? '저장 중...' : '저장' }}
                  </button>
                </template>
              </div>
            </div>

            <!-- 부모 페이지에서 만든 에러 메시지를 그대로 표시 -->
            <div v-if="errorMessage" class="alert alert-danger py-2 mb-4" role="alert">
              {{ errorMessage }}
            </div>

            <div class="d-flex flex-column gap-4">
              <MyPageFieldRow icon="badge" label="이름">
                <template #value>
                  <!--
                    편집 중이면 input을 보여주고,
                    아닐 때는 현재 사용자 이름만 텍스트로 보여준다.
                  -->
                  <input
                    v-if="isEditing"
                    class="form-control"
                    type="text"
                    :value="form.name"
                    @input="$emit('update:form', { ...form, name: $event.target.value })"
                    placeholder="이름을 입력하세요"
                  />
                  <p v-else class="fw-bold m-0">{{ displayName }}</p>
                </template>
              </MyPageFieldRow>

              <MyPageFieldRow icon="mail" label="이메일 주소">
                <template #value>
                  <input
                    v-if="isEditing"
                    class="form-control"
                    type="email"
                    :value="form.email"
                    @input="$emit('update:form', { ...form, email: $event.target.value })"
                    placeholder="이메일을 입력하세요"
                  />
                  <p v-else class="fw-bold m-0">{{ user?.email || '등록된 이메일이 없습니다.' }}</p>
                </template>
              </MyPageFieldRow>

              <MyPageFieldRow icon="smartphone" label="전화번호">
                <template #value>
                  <input
                    v-if="isEditing"
                    class="form-control"
                    type="tel"
                    :value="form.phone"
                    @input="$emit('update:form', { ...form, phone: $event.target.value })"
                    placeholder="010-1234-5678"
                  />
                  <p v-else class="fw-bold m-0">{{ user?.phone || '등록된 전화번호가 없습니다.' }}</p>
                </template>

                <template #badge>
                  <!--
                    전화번호 존재 여부만 단순히 보여주는 상태 뱃지
                    실제 인증 여부 필드가 따로 있는 것은 아니다.
                  -->
                  <span
                    class="border rounded px-2 py-1 fw-bold"
                    :class="user?.phone ? 'text-success bg-success bg-opacity-10' : 'text-muted'"
                    style="font-size: 10px"
                  >
                    {{ user?.phone ? '확인 완료' : '미등록' }}
                  </span>
                </template>
              </MyPageFieldRow>

              <MyPageFieldRow icon="calendar_month" label="가입일" :bordered="false">
                <template #value>
                  <p class="fw-bold m-0">{{ formattedJoinDate }}</p>
                </template>
              </MyPageFieldRow>
            </div>

            <!-- 하단 안내 문구 -->
            <div class="mt-4 pt-4 border-top">
              <div
                class="btn btn-light w-100 d-flex align-items-center justify-content-between px-4 py-3 rounded-4 border text-start"
              >
                <div class="d-flex align-items-center gap-3 text-dark">
                  <span class="material-symbols-outlined text-secondary">account_circle</span>
                  <span class="small fw-bold m-0">
                    {{
                      isEditing
                        ? '수정 후 저장 버튼을 누르면 프로필이 반영됩니다.'
                        : '현재 로그인한 계정 정보를 보고 있어요.'
                    }}
                  </span>
                </div>
                <span class="material-symbols-outlined text-secondary">
                  {{ isEditing ? 'edit' : 'check_circle' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import MyPageFieldRow from '@/components/mypage/MyPageFieldRow.vue';
import MyPageProfileCard from '@/components/mypage/MyPageProfileCard.vue';

const props = defineProps({
  // 현재 로그인 사용자 정보
  user: {
    type: Object,
    default: () => ({}),
  },
  // 부모 페이지가 관리하는 수정용 form 상태
  form: {
    type: Object,
    default: () => ({
      name: '',
      email: '',
      phone: '',
    }),
  },
  // 현재 편집 모드 여부
  isEditing: {
    type: Boolean,
    default: false,
  },
  // 저장 요청 진행 여부
  isSaving: {
    type: Boolean,
    default: false,
  },
  // 부모 페이지 또는 store에서 만든 에러 메시지
  errorMessage: {
    type: String,
    default: '',
  },
});

// 이 컴포넌트는 화면 표시 위주라, 실제 동작은 이벤트로 부모에게 위임한다.
defineEmits(['logout', 'edit-start', 'edit-cancel', 'save', 'update:form']);

// 이름이 비어 있거나 nickname만 있는 경우를 대비한 표시용 계산값
const displayName = computed(() => props.user?.name || props.user?.nickname || '사용자');

// 서버 데이터가 비어 있거나 잘못된 경우에도 UI가 깨지지 않도록 방어적으로 처리
const formattedJoinDate = computed(() => {
  if (!props.user?.createdAt) {
    return '가입일 정보가 없습니다.';
  }

  const date = new Date(props.user.createdAt);

  if (Number.isNaN(date.getTime())) {
    return '가입일 정보가 없습니다.';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
});
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>
