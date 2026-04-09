<template>
  <div class="bg-light min-vh-100 p-4 p-md-5">
    <!-- Main Content Canvas -->
    <div class="container-fluid px-0 mx-auto d-flex flex-column gap-4" style="max-width: 80rem;">
      <!-- Page Header -->
      <div class="text-start">
        <h2 class="fs-4 fw-bold mb-1">마이페이지</h2>
        <p class="text-muted fw-medium m-0">개인 정보 및 계정 설정을 관리하세요</p>
      </div>
      <!-- Profile Bento Section -->
      <div class="row g-4 align-items-start">
        <!-- Profile Identity Card -->
        <div class="col-12 col-md-4">
          <div class="d-flex flex-column align-items-center bg-white p-4 p-lg-5 shadow-sm border h-100" style="border-radius: 2rem;">
            <div class="position-relative mb-4">
              <div class="rounded-circle bg-light p-1" style="width: 10rem; height: 10rem;">
                <div class="w-100 h-100 rounded-circle overflow-hidden">
                  <img
                    alt="Profile Image"
                    class="w-100 h-100 object-fit-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDftwAZ6yHDb__srqcdXMrN_IYNTXVXvQJkK2pE2fVNcgUHorcnWJB-C8ZGK5a9_FjfswfOTntz6snsOsYdkLA0gD9Wah_YVTKhB4K8UUFP1rBKI__mJ17uTk1oNAYoABuXovMCCKys_fMdY2eG_zUtgFvIZSB_ETVO7M2REjK6xHT68SrlYGN3F842Vam4Rm_-0EJrqtPUbIDlFPOOEjcIU9gICXH2Y5K3jtcivyeiiif0X38GAlYECUjqaOWPsOMpSDwmFUixZm-f"
                  />
                </div>
              </div>
              <button class="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle shadow-sm btn border-0 d-flex align-items-center justify-content-center" style="transform: translate(-10%, -10%); width: 48px; height: 48px;">
                <span class="material-symbols-outlined fs-5">photo_camera</span>
              </button>
            </div>
            <div class="text-center">
              <h3 class="fs-4 fw-bold mb-1">홍길동</h3>
              <p class="small text-muted m-0">ID: hong</p>
            </div>
            <div class="mt-4 d-flex flex-wrap justify-content-center gap-2">
              <span class="px-3 py-1 bg-secondary bg-opacity-10 text-secondary small fw-bold rounded-pill">배찌칸</span>
            </div>
          </div>
        </div>
        <!-- Personal Info Details (Expanded Column) -->
        <div class="col-12 col-md-8">
          <div class="bg-white p-4 p-lg-5 shadow-sm border h-100" style="border-radius: 2rem;">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h4 class="fs-5 fw-bold m-0">상세 정보</h4>
              <button class="small fw-bold text-primary d-flex align-items-center gap-1 btn btn-link text-decoration-none p-0">
                <span class="material-symbols-outlined" style="font-size: 1rem;">edit</span>
                수정하기
              </button>
            </div>
            <div class="d-flex flex-column gap-4">
              <div class="d-flex align-items-center justify-content-between pb-3 border-bottom">
                <div class="d-flex align-items-center gap-3">
                  <div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted" style="width: 40px; height: 40px;">
                    <span class="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p class="small text-muted mb-1 d-block">이메일 주소</p>
                    <p class="fw-bold m-0">sy.han@kbfg.com</p>
                  </div>
                </div>
                <span class="material-symbols-outlined text-primary fs-6" style='font-variation-settings: "FILL" 1;'>verified</span>
              </div>
              <div class="d-flex align-items-center justify-content-between pb-3 border-bottom">
                <div class="d-flex align-items-center gap-3">
                  <div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted" style="width: 40px; height: 40px;">
                    <span class="material-symbols-outlined">smartphone</span>
                  </div>
                  <div>
                    <p class="small text-muted mb-1 d-block">휴대폰 번호</p>
                    <p class="fw-bold m-0">010-****-5678</p>
                  </div>
                </div>
                <span class="border rounded px-2 py-1 text-muted fw-bold" style="font-size: 10px;">인증됨</span>
              </div>
              <div class="d-flex align-items-center justify-content-between pb-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted" style="width: 40px; height: 40px;">
                    <span class="material-symbols-outlined">calendar_month</span>
                  </div>
                  <div>
                    <p class="small text-muted mb-1 d-block">가입일</p>
                    <p class="fw-bold m-0">2023년 11월 12일</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Secondary Action: Password Change -->
            <div class="mt-4 pt-4 border-top">
              <button class="btn btn-light w-100 d-flex align-items-center justify-content-between px-4 py-3 rounded-4 border text-start">
                <div class="d-flex align-items-center gap-3 text-dark">
                  <span class="material-symbols-outlined text-secondary">lock_reset</span>
                  <span class="small fw-bold m-0">비밀번호 변경</span>
                </div>
                <span class="material-symbols-outlined text-secondary">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>