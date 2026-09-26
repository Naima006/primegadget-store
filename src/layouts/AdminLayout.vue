<template>
  <div class="admin-layout">
    <!-- Mobile top bar -->
    <header class="admin-topbar">
      <button class="menu-toggle" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle menu">
        <i :class="sidebarOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
      </button>
      <RouterLink to="/admin" class="admin-logo" @click="closeSidebar">
        Prime<span>Gadget</span> <small>Admin</small>
      </RouterLink>
      <div class="topbar-actions">
        <RouterLink to="/" class="view-store" title="View Store">
          <i class="bi bi-shop"></i>
        </RouterLink>
        <button class="logout-btn" @click="handleLogout" title="Logout">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </header>

    <!-- Overlay for mobile -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>

    <!-- Sidebar -->
    <aside :class="['admin-sidebar', { open: sidebarOpen }]">
      <div class="sidebar-brand">
        <RouterLink to="/admin" @click="closeSidebar">
          Prime<span>Gadget</span>
        </RouterLink>
        <span class="badge">Admin</span>
      </div>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          @click="closeSidebar"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="avatar">{{ initials }}</div>
          <div>
            <strong>{{ auth.currentUser?.name || "Admin" }}</strong>
            <small>{{ auth.currentUser?.email }}</small>
          </div>
        </div>
        <button class="logout-full" @click="handleLogout">
          <i class="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { auth } from "../stores/auth"
import { toast } from "../stores/toast"

const router = useRouter()
const sidebarOpen = ref(false)

const navItems = [
  { to: "/admin", label: "Dashboard", icon: "bi bi-grid-1x2" },
  { to: "/admin/products", label: "Products", icon: "bi bi-box-seam" },
  { to: "/admin/categories", label: "Categories", icon: "bi bi-tags" },
  { to: "/admin/orders", label: "Orders", icon: "bi bi-receipt" },
  { to: "/admin/hero", label: "Hero Section", icon: "bi bi-image" },
]

const initials = computed(() => {
  const name = auth.currentUser?.name || "A"
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
})

function closeSidebar() {
  sidebarOpen.value = false
}

function handleLogout() {
  auth.logout()
  toast.open("Logged out successfully")
  router.push("/login")
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #0f1115;
  color: #e8e8e8;
  display: flex;
}

/* ========== TOPBAR (mobile) ========== */
.admin-topbar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #16181d;
  border-bottom: 1px solid #252830;
  z-index: 100;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
}

.menu-toggle {
  background: transparent;
  color: #fff;
  font-size: 22px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.08);
}

.admin-logo {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
}

.admin-logo span {
  color: var(--primary);
}

.admin-logo small {
  font-size: 11px;
  font-weight: 500;
  opacity: 0.6;
  margin-left: 4px;
}

.topbar-actions {
  display: flex;
  gap: 8px;
}

.view-store,
.logout-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  background: transparent;
  font-size: 18px;
}

.view-store:hover,
.logout-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* ========== SIDEBAR ========== */
.admin-sidebar {
  width: 260px;
  background: #16181d;
  border-right: 1px solid #252830;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 90;
  transition: transform 0.3s ease;
}

.sidebar-brand {
  padding: 28px 24px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-brand a {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
}

.sidebar-brand span {
  color: var(--primary);
}

.sidebar-brand .badge {
  background: rgba(198, 255, 74, 0.15);
  color: var(--primary);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #a0a4ae;
  font-weight: 500;
  font-size: 15px;
  transition: 0.25s;
}

.nav-item i {
  font-size: 18px;
  width: 22px;
  text-align: center;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.router-link-active {
  background: rgba(198, 255, 74, 0.12);
  color: var(--primary);
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #252830;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--primary);
  color: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.user-info strong {
  display: block;
  font-size: 14px;
  color: #fff;
}

.user-info small {
  font-size: 12px;
  color: #888;
}

.logout-full {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255, 80, 80, 0.1);
  color: #ff6b6b;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.logout-full:hover {
  background: rgba(255, 80, 80, 0.2);
}

/* ========== MAIN ========== */
.admin-main {
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
  padding: 32px 36px 60px;
  background: #0f1115;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .admin-topbar {
    display: flex;
  }

  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar.open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 80;
  }

  .admin-main {
    margin-left: 0;
    padding: 80px 18px 40px;
  }
}

@media (max-width: 576px) {
  .admin-main {
    padding: 76px 14px 32px;
  }
}
</style>
