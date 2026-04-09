<template>
  <div
    class="container-fluid px-0 mx-auto d-flex flex-column gap-4"
    style="max-width: 80rem"
  >
    <!-- Hero Title -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h2 class="fs-4 fw-bold m-0">연동가계부</h2>
        <p class="text-muted m-0 mt-1">
          배우자와 함께 투명하고 스마트하게 자산을 관리하세요.
        </p>
      </div>
    </div>

    <!-- Header Banner -->
    <div
      class="bg-primary bg-opacity-10 p-5 rounded-4 position-relative overflow-hidden d-flex flex-column align-items-center mb-5"
    >
      <div class="position-absolute top-0 end-0 p-4 opacity-25">
        <span
          class="material-symbols-outlined fs-1"
          style="font-size: 120px !important"
          >favorite</span
        >
      </div>
      <div
        class="position-relative z-3 d-flex align-items-center justify-content-center gap-5 w-100"
        style="max-width: 56rem"
      >
        <!-- Person 1 -->
        <div
          class="d-flex flex-column align-items-center gap-3 position-relative"
        >
          <div
            class="position-absolute top-50 translate-middle-y bg-white px-3 py-2 rounded-4 shadow-sm text-primary small fw-bold d-none d-md-block"
            style="left: -140px"
          >
            오늘도 절약 화이팅!
          </div>
          <div
            class="rounded-circle border border-4 border-white shadow-sm overflow-hidden"
            style="width: 96px; height: 96px"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNIIDy95gFmVazSnu0Dp0YWLK2QW2DKtqkYiveCNqRrb6l5-WOxHxRNQngbDy5-7CAXCMEOBXjEj0wjSzB89Td4Pa4-Z_-v3vg8BtGXC3teL2OO8lAEplshWocWNRRT8TgxvtUQriz1rnS8-Vx7ZoEJrpsD-6iHSxAxNtueCCVugstTpXWUPKDTsAYfqfRn7_oHGtrcMt7vRG-bp_YEkCP857HEkA_UgKLFe0YlJEUHA6DuAbQ8DpMOcaid534r6qsyYBt1bdawRrp"
              class="w-100 h-100 object-fit-cover"
            />
          </div>
          <span
            class="bg-white bg-opacity-50 px-3 py-1 rounded-pill small fw-bold"
            >홍길동</span
          >
        </div>
        <!-- Connector -->
        <div class="d-flex flex-column align-items-center gap-2">
          <div
            class="rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm text-danger"
            style="width: 48px; height: 48px"
          >
            <span
              class="material-symbols-outlined fs-4"
              style="font-variation-settings: 'FILL' 1"
              >favorite</span
            >
          </div>
          <div class="d-flex gap-4 mt-1">
            <span class="material-symbols-outlined text-black-50 fs-5"
              >sync_alt</span
            >
          </div>
        </div>
        <!-- Person 2 -->
        <div
          class="d-flex flex-column align-items-center gap-3 position-relative"
        >
          <div
            class="position-absolute top-50 translate-middle-y bg-white px-3 py-2 rounded-4 shadow-sm text-primary small fw-bold d-none d-md-block"
            style="right: -140px"
          >
            같이 부자되자!
          </div>
          <div
            class="rounded-circle border border-4 border-white shadow-sm overflow-hidden bg-light"
            style="width: 96px; height: 96px"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI8ioidGPfljAtYWc6YAoJmhK9kYEgMRxqQNUnSxK084Anw8FNiaepJNK-RluCvPBTTYvFQI7A_YFYZ1NBavNl6Ni6N8yW4dwHW4ptJh7FwmLeFnZEh5Fpgsxf6wOEal1JYQJpTQIujF7Gswn7DpPwNpxg9Osbv8qAy7zpfpxlx7GCXtEmsKT_TCpTapiSA4_e5CBpxxzFh56K9rXnZ0PZ9360Ow_1to15mcdegKrNX0dpyGHROv4pIE_ge5H2zhf6mtvKEY27WahA"
              class="w-100 h-100 object-fit-cover"
            />
          </div>
          <span
            class="bg-white bg-opacity-50 px-3 py-1 rounded-pill small fw-bold"
            >동길홍</span
          >
        </div>
      </div>
      <div class="mt-4 text-center">
        <p class="fs-5 fw-bold text-primary m-0">
          연동된 지 243일째, 오늘도 똑똑한 가계부 생활!
        </p>
      </div>
    </div>

    <div class="row g-4">
      <!-- Left: Comparison View -->
      <div class="col-12 col-lg-8 d-flex flex-column gap-4">
        <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm border h-100">
          <div class="d-flex align-items-center justify-content-between mb-5">
            <h3 class="fs-5 fw-bold m-0">이번 달 금융 현황 비교</h3>
            <span
              class="small fw-medium text-muted bg-light px-3 py-1 rounded-pill"
              >2023년 10월 기준</span
            >
          </div>

          <div class="d-flex flex-column gap-5">
            <div class="position-relative">
              <div
                class="d-flex justify-content-between align-items-center mb-2 px-2"
              >
                <div class="text-start" style="width: 33.33%">
                  <p
                    class="text-muted fw-bold mb-1 text-uppercase"
                    style="font-size: 10px; letter-spacing: 0.05em"
                  >
                    홍길동
                  </p>
                  <p class="fs-5 fw-bold m-0" style="color: #e53935">
                    2,700,000원
                  </p>
                </div>
                <div
                  class="d-flex flex-column align-items-center text-center"
                  style="width: 33.33%"
                >
                  <span class="small fw-bold bg-light px-3 py-1 rounded-pill"
                    >수입 (Income)</span
                  >
                  <p class="mt-2 small fw-bold text-muted m-0">
                    합산: 5,700,000원
                  </p>
                </div>
                <div class="text-end" style="width: 33.33%">
                  <p
                    class="text-muted fw-bold mb-1 text-uppercase"
                    style="font-size: 10px; letter-spacing: 0.05em"
                  >
                    동길홍
                  </p>
                  <p class="fs-5 fw-bold m-0" style="color: #1e88e5">
                    3,000,000원
                  </p>
                </div>
              </div>
              <div
                class="d-flex align-items-center w-100 bg-light rounded-pill overflow-hidden"
                style="height: 1rem"
              >
                <div class="flex-grow-1 d-flex justify-content-end h-100">
                  <div
                    class="h-100"
                    style="
                      background-color: #e53935;
                      border-top-left-radius: 50rem;
                      border-bottom-left-radius: 50rem;
                      width: 90%;
                    "
                  ></div>
                </div>
                <div class="h-100 bg-white z-3" style="width: 2px"></div>
                <div class="flex-grow-1 d-flex justify-content-start h-100">
                  <div
                    class="h-100"
                    style="
                      background-color: #1e88e5;
                      border-top-right-radius: 50rem;
                      border-bottom-right-radius: 50rem;
                      width: 100%;
                    "
                  ></div>
                </div>
              </div>
            </div>

            <div class="position-relative">
              <div
                class="d-flex justify-content-between align-items-center mb-2 px-2"
              >
                <div class="text-start" style="width: 33.33%">
                  <p class="fs-5 fw-bold m-0" style="color: #e53935">
                    1,250,000원
                  </p>
                </div>
                <div
                  class="d-flex flex-column align-items-center text-center"
                  style="width: 33.33%"
                >
                  <span class="small fw-bold bg-light px-3 py-1 rounded-pill"
                    >지출 (Expense)</span
                  >
                  <p class="mt-2 small fw-bold text-muted m-0">
                    합산: 2,670,000원
                  </p>
                </div>
                <div class="text-end" style="width: 33.33%">
                  <p class="fs-5 fw-bold m-0" style="color: #1e88e5">
                    1,420,000원
                  </p>
                </div>
              </div>
              <div
                class="d-flex align-items-center w-100 bg-light rounded-pill overflow-hidden"
                style="height: 1rem"
              >
                <div class="flex-grow-1 d-flex justify-content-end h-100">
                  <div
                    class="h-100"
                    style="
                      background-color: #e53935;
                      border-top-left-radius: 50rem;
                      border-bottom-left-radius: 50rem;
                      width: 88%;
                    "
                  ></div>
                </div>
                <div class="h-100 bg-white z-3" style="width: 2px"></div>
                <div class="flex-grow-1 d-flex justify-content-start h-100">
                  <div
                    class="h-100"
                    style="
                      background-color: #1e88e5;
                      border-top-right-radius: 50rem;
                      border-bottom-right-radius: 50rem;
                      width: 100%;
                    "
                  ></div>
                </div>
              </div>
            </div>

            <div class="position-relative">
              <div
                class="d-flex justify-content-between align-items-center mb-2 px-2"
              >
                <div class="text-start" style="width: 33.33%">
                  <p class="fs-5 fw-bold m-0" style="color: #e53935">
                    1,450,000원
                  </p>
                </div>
                <div
                  class="d-flex flex-column align-items-center text-center"
                  style="width: 33.33%"
                >
                  <span class="small fw-bold bg-light px-3 py-1 rounded-pill"
                    >순이익 (Net Profit)</span
                  >
                  <p class="mt-2 small fw-bold text-muted m-0">
                    합산: 3,030,000원
                  </p>
                </div>
                <div class="text-end" style="width: 33.33%">
                  <p class="fs-5 fw-bold m-0" style="color: #1e88e5">
                    1,580,000원
                  </p>
                </div>
              </div>
              <div
                class="d-flex align-items-center w-100 bg-light rounded-pill overflow-hidden border"
                style="height: 1.5rem"
              >
                <div class="flex-grow-1 d-flex justify-content-end h-100">
                  <div
                    class="h-100 shadow-sm"
                    style="
                      background-color: #e53935;
                      border-top-left-radius: 50rem;
                      border-bottom-left-radius: 50rem;
                      width: 91%;
                    "
                  ></div>
                </div>
                <div class="h-100 bg-white z-3" style="width: 4px"></div>
                <div class="flex-grow-1 d-flex justify-content-start h-100">
                  <div
                    class="h-100 shadow-sm"
                    style="
                      background-color: #1e88e5;
                      border-top-right-radius: 50rem;
                      border-bottom-right-radius: 50rem;
                      width: 100%;
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Joint Goal & Task -->
      <div class="col-12 col-lg-4 d-flex flex-column gap-4">
        <div
          class="p-4 rounded-4 border shadow-sm d-flex flex-column position-relative bg-light"
          style="border-left: 4px solid var(--bs-primary) !important"
        >
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <p class="small fw-bold text-primary mb-1 text-uppercase">
                공동 목표
              </p>
              <h4 class="fs-5 fw-bold m-0">내 집 마련 적금</h4>
            </div>
          </div>
          <div class="mt-2 d-flex align-items-end gap-2">
            <span class="fs-3 fw-bold m-0">78%</span>
            <span class="small fw-medium text-muted pb-1 m-0"
              >3,400,000 / 5,000,000</span
            >
          </div>
          <div
            class="mt-3 w-100 bg-white rounded-pill overflow-hidden border"
            style="height: 0.75rem"
          >
            <div class="h-100 bg-primary rounded-pill" style="width: 78%"></div>
          </div>
          <button
            class="btn btn-white border mt-4 w-100 py-2 fw-bold text-primary rounded-3 shadow-sm bg-white"
          >
            상세 보기
          </button>
        </div>

        <div class="bg-white p-4 rounded-4 shadow-sm border">
          <h3
            class="fw-bold mb-4 small d-flex align-items-center justify-content-between m-0"
          >
            최근 활동 피드
            <span
              class="bg-primary text-white px-2 py-1 rounded-pill"
              style="font-size: 10px"
              >New</span
            >
          </h3>
          <div class="d-flex flex-column gap-3">
            <div
              class="bg-light p-3 rounded-3 d-flex align-items-center gap-3 border"
            >
              <div
                class="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center text-secondary small fw-bold"
                style="width: 32px; height: 32px"
              >
                김
              </div>
              <div class="flex-grow-1">
                <p class="fw-medium m-0 text-muted" style="font-size: 11px">
                  김선호님이 저축액 20만원을 입력했습니다.
                </p>
                <p class="text-muted mt-1 m-0" style="font-size: 9px">5분 전</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Comparison -->
    <div class="mt-5">
      <h3 class="fs-4 fw-bold mb-4">부부 카테고리 비교</h3>
      <div class="row g-4">
        <div
          v-for="cat in categories"
          :key="cat.name"
          class="col-12 col-md-6 col-lg-3"
        >
          <div class="bg-white p-4 rounded-4 shadow-sm border h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div
                class="rounded-3 d-flex align-items-center justify-content-center"
                :class="cat.bgClass"
                style="width: 40px; height: 40px"
              >
                <span class="material-symbols-outlined fs-5">{{
                  cat.icon
                }}</span>
              </div>
              <span class="fw-bold">{{ cat.name }}</span>
            </div>
            <div class="d-flex flex-column gap-2">
              <div
                class="d-flex justify-content-between align-items-center small"
              >
                <span class="text-muted">홍길동</span>
                <span class="fw-bold" style="color: #e53935">{{
                  cat.val1
                }}</span>
              </div>
              <div
                class="d-flex justify-content-between align-items-center small"
              >
                <span class="text-muted">동길홍</span>
                <span class="fw-bold" style="color: #1e88e5">{{
                  cat.val2
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
