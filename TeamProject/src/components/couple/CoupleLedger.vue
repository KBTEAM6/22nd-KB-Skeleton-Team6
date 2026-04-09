<template>
  <div class="bg-light min-vh-100 p-4 p-md-5">
    <!-- View 1: Spouse Management -->
    <div
      class="container-fluid px-0 mx-auto d-flex flex-column gap-4"
      style="max-width: 80rem"
    >
      <header class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 class="fs-4 fw-bold mb-2">배우자 관리</h1>
          <p class="small text-muted mb-0">
            함께 자산을 관리할 배우자를 찾고 연결하세요.
          </p>
        </div>
        <!-- <button
        @click="currentStep = 2"
        class="btn btn-primary btn-sm fw-bold px-3 py-2 rounded-3 shadow-sm text-white border-0"
      >
        연동가계부 보기
      </button> -->
      </header>

      <main class="d-flex flex-column gap-5 pb-5">
        <!-- Search Section -->
        <section class="d-flex flex-column gap-3">
          <div class="position-relative mx-auto w-100" style="max-width: 56rem">
            <span
              class="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              >search</span
            >
            <input
              class="form-control py-3 bg-white rounded-3 shadow-sm border-0"
              style="padding-left: 3rem"
              placeholder="배우자 검색 (이름 또는 연락처)"
              type="text"
            />
          </div>
          <!-- Search Result Card -->
          <div
            class="mx-auto bg-white rounded-4 p-4 shadow-sm d-flex align-items-center justify-content-between border w-100"
            style="max-width: 56rem"
          >
            <div class="d-flex align-items-center gap-3">
              <img
                class="rounded-circle object-fit-cover"
                style="width: 56px; height: 56px"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWq7JATqdMiU2mWiWynoJsEvIsgl3mOSzdc1yLOVWnBn45RTP9DdCahNHzB_mi2j10RetMbmYR-cnHh0vELvpwkR39vVPrfbkTAvZ-ZDwNmWhskcCSMoXsx77L3qZ0wONqC5_Bl1ELhqEQ_NDdJlsmNZjXFcRQBEFVEEWNRz5S3aZmBGXCAtr45ceOJkNyAPxXPDeZifiXv5wj9HA4gdcTuhTjTm5rM4hcRnWDt9N2O7On-wLK5P19SFQFGR7t4eQDhRz7KT5aZhkf"
              />
              <div>
                <h3 class="fw-bold m-0 fs-6">김수진</h3>
                <p class="small text-muted m-0">sujin.kim@example.com</p>
              </div>
            </div>
            <button class="btn btn-light rounded-pill px-4 py-2 small fw-bold">
              친구 요청
            </button>
          </div>
        </section>

        <!-- Received Requests List Section -->
        <section
          class="mx-auto w-100 d-flex flex-column gap-4"
          style="max-width: 56rem"
        >
          <div class="d-flex align-items-center justify-content-between px-2">
            <h2 class="fs-5 fw-bold m-0">받은 요청</h2>
            <span
              class="bg-secondary bg-opacity-10 text-secondary px-3 py-1 rounded-pill small fw-bold"
              >2건</span
            >
          </div>
          <div class="d-flex flex-column gap-3">
            <div
              class="bg-white rounded-4 p-4 shadow-sm d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 border"
            >
              <div class="d-flex align-items-center gap-3">
                <img
                  class="rounded-circle object-fit-cover"
                  style="width: 48px; height: 48px"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtM2koV3oVBXM2KcSoTrQgMhIcyRcvWDzQ0hqxIBcZJ7rgkJHJ894w70qjxZF2O4G7hCFNBLcYKnLPK5MXBbMMxw3RyH_pwWeFhPEdBEP9N1m4K263D2AIEwxG4w7RsIjpt5sMDWydlDUOL2jPCKS7U1DUXavoEEZaIfa9rk2ctlvdM4bSZSIbrMgh0krxcPVfYBES54a8lv-7bwuX8mPZWT6o2hqcBviL3h8zoZVDsDhs4f8YkjpNlOzFI2DimYyWQutfyJIUdCgw"
                />
                <div>
                  <h4 class="fw-bold m-0 fs-6">이준호</h4>
                  <p class="small text-muted m-0">2024.05.20 요청</p>
                </div>
              </div>
              <div
                class="d-flex align-items-center justify-content-end gap-2 w-100 w-sm-auto"
              >
                <button
                  class="btn btn-primary flex-grow-1 flex-sm-grow-0 rounded-pill px-4 py-2 small fw-bold text-white border-0"
                >
                  수락
                </button>
                <button
                  class="btn btn-light flex-grow-1 flex-sm-grow-0 rounded-pill px-4 py-2 small fw-bold border"
                >
                  삭제
                </button>
              </div>
            </div>
            <div
              class="bg-white rounded-4 p-4 shadow-sm d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 border"
            >
              <div class="d-flex align-items-center gap-3">
                <div
                  class="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary fw-bold fs-5"
                  style="width: 48px; height: 48px"
                >
                  P
                </div>
                <div>
                  <h4 class="fw-bold m-0 fs-6">박지성</h4>
                  <p class="small text-muted m-0">2024.05.18 요청</p>
                </div>
              </div>
              <div
                class="d-flex align-items-center justify-content-end gap-2 w-100 w-sm-auto"
              >
                <button
                  class="btn btn-primary flex-grow-1 flex-sm-grow-0 rounded-pill px-4 py-2 small fw-bold text-white border-0"
                >
                  수락
                </button>
                <button
                  class="btn btn-light flex-grow-1 flex-sm-grow-0 rounded-pill px-4 py-2 small fw-bold border"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Sent Requests Section -->
        <section
          class="mx-auto w-100 d-flex flex-column gap-4"
          style="max-width: 56rem"
        >
          <div class="d-flex align-items-center justify-content-between px-2">
            <h2 class="fs-5 fw-bold m-0">보낸 요청</h2>
            <span
              class="bg-secondary bg-opacity-10 text-secondary px-3 py-1 rounded-pill small fw-bold"
              >1건</span
            >
          </div>
          <div class="d-flex flex-column gap-3">
            <div
              class="bg-white rounded-4 p-4 shadow-sm d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 border"
            >
              <div class="d-flex align-items-center gap-3">
                <div
                  class="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary fw-bold fs-5"
                  style="width: 48px; height: 48px"
                >
                  C
                </div>
                <div>
                  <h4 class="fw-bold m-0 fs-6">최지우</h4>
                  <p class="small text-muted m-0">sujin.choi@example.com</p>
                </div>
              </div>
              <div
                class="d-flex align-items-center justify-content-end gap-2 w-100 w-sm-auto"
              >
                <button
                  class="btn btn-light flex-grow-1 flex-sm-grow-0 rounded-pill px-4 py-2 small fw-bold border"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>
