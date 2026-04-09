<template>
  <div class="auth-page d-flex align-items-center min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card border-0 shadow auth-card">
            <div class="card-body p-4 p-md-5">
              <h2 class="text-center fw-bold mb-5 auth-title">{{ title }}</h2>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>

<style scoped>
.auth-page {
  background: linear-gradient(135deg, #e0f2f7 0%, #f7e0e7 100%);
}

.auth-card {
  border-radius: 1.25rem;
  background-color: #ffffff;
}

.auth-title {
  color: var(--kb-gray);
}

.auth-input {
  border-radius: 0.9rem;
  border: 1px solid #dee2e6;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.auth-input:focus {
  border-color: var(--kb-yellow);
  box-shadow: 0 0 0 0.2rem rgba(255, 188, 0, 0.2);
}

.auth-btn {
  background-color: var(--kb-yellow);
  color: var(--kb-gray);
  font-weight: 700;
  border: none;
  border-radius: 0.9rem;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.auth-btn:hover {
  background-color: var(--kb-yellow-hover);
  color: var(--kb-gray);
}

.auth-btn:disabled {
  background-color: #e9d9a0;
  color: #6c757d;
}

.auth-link-btn {
  border-radius: 0.9rem;
  font-weight: 600;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.auth-link-btn:hover {
  background-color: var(--kb-gray);
  border-color: var(--kb-gray);
  color: #fff;
}
</style>
