<template>
  <MainLayout>
    <section class="settings-page">
      <div class="container">
        <h1>Settings</h1>
        <p class="subtitle">Your account details for this demo store.</p>

        <div v-if="!auth.isLoggedIn" class="card empty">
          <p>Please log in to view account settings.</p>
          <RouterLink to="/login" class="cta">Login</RouterLink>
        </div>

        <div v-else class="card">
          <div class="row">
            <span class="label">Name</span>
            <span class="value">{{ auth.currentUser?.name || "—" }}</span>
          </div>
          <div class="row">
            <span class="label">Email</span>
            <span class="value">{{ auth.currentUser?.email || "—" }}</span>
          </div>
          <div class="row">
            <span class="label">Sign-in method</span>
            <span class="value">{{ auth.currentUser?.provider || "Local Account" }}</span>
          </div>
          <div class="row">
            <span class="label">Role</span>
            <span class="value">{{ auth.isAdmin ? "Store Admin" : "Customer" }}</span>
          </div>

          <!-- <p class="note">
            This is a front-end demo. Profile edits and password changes would require a backend in a production app.
          </p> -->

          <button class="logout" @click="logout">
            <i class="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layouts/MainLayout.vue"
import { auth } from "../stores/auth"
import { useRouter } from "vue-router"

const router = useRouter()

function logout() {
  auth.logout()
  router.push("/login")
}
</script>

<style scoped>
.settings-page {
  padding: 140px 0 80px;
  background: #f6f7f9;
  min-height: 100vh;
}

h1 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 6px;
}

.subtitle {
  color: #777;
  margin-bottom: 32px;
}

.card {
  background: #fff;
  border-radius: 22px;
  padding: 32px;
  max-width: 560px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.card.empty {
  text-align: center;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
}

.row:last-of-type {
  border-bottom: none;
}

.label {
  color: #888;
  font-size: 14px;
  font-weight: 600;
}

.value {
  font-weight: 700;
  color: #222;
  word-break: break-all;
}

.note {
  margin-top: 24px;
  font-size: 13px;
  color: #999;
  line-height: 1.5;
}

.logout {
  margin-top: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 80, 80, 0.1);
  color: #e74c3c;
  padding: 12px 22px;
  border-radius: 50px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.25s;
}

.logout:hover {
  background: rgba(255, 80, 80, 0.18);
}

.cta {
  display: inline-block;
  margin-top: 16px;
  background: #121212;
  color: #fff;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 700;
}

@media (max-width: 576px) {
  h1 {
    font-size: 28px;
  }
  .card {
    padding: 22px;
  }
}
</style>
