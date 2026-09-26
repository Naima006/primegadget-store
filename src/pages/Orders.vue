<template>
  <MainLayout>
    <section class="orders">
      <div class="container">
        <h1>My Orders</h1>
        <p class="subtitle">Your recent purchases.</p>

        <div v-if="orders.items.length">
          <div class="order-card" v-for="order in orders.items" :key="order.id">
            <div class="top">
              <h3>Order #{{ order.id }}</h3>
              <span>{{ order.date }}</span>
            </div>

            <div class="status-row">
              <span
                class="status"
                :class="statusClass(order.status)"
              >
                {{ order.status || "Pending" }}
              </span>
            </div>

            <!-- Tracking steps -->
            <div v-if="order.tracking?.length" class="tracking">
              <div
                v-for="(step, i) in order.tracking"
                :key="i"
                class="track-step"
                :class="{ done: step.completed }"
              >
                <span class="dot"></span>
                <span class="label">{{ step.title }}</span>
              </div>
            </div>

            <div class="product" v-for="item in order.items" :key="item.id">
              {{ item.name }} × {{ item.quantity }}
            </div>

            <div class="total">Total: ${{ order.total }}</div>
          </div>
        </div>

        <div v-else class="empty">
          <i class="bi bi-box"></i>
          <h2>No Orders Yet</h2>
          <p>Your completed purchases will appear here.</p>
          <RouterLink to="/shop" class="shop-btn">Start Shopping</RouterLink>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { onMounted } from "vue"
import MainLayout from "../layouts/MainLayout.vue"
import { orders, reloadOrders } from "../stores/orders"

onMounted(() => {
  // Always refresh from localStorage so admin status updates appear
  reloadOrders()
})

function statusClass(s) {
  return (s || "Pending").toLowerCase().replace(/\s+/g, "-")
}
</script>

<style scoped>
.orders {
  padding: 140px 0;
  background: #f6f7f9;
  min-height: 100vh;
}

.subtitle {
  margin-bottom: 35px;
  color: #777;
}

.order-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 8px;
}

.top h3 {
  font-size: 18px;
  font-weight: 700;
}

.top span {
  color: #888;
  font-size: 13px;
}

.status-row {
  margin-bottom: 16px;
}

.status {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  background: #fff3cd;
  color: #856404;
}

.status.confirmed {
  background: #cfe2ff;
  color: #084298;
}
.status.packed {
  background: #e2d5f1;
  color: #5a2d82;
}
.status.shipped {
  background: #cff4fc;
  color: #055160;
}
.status.delivered {
  background: #d1e7dd;
  color: #0f5132;
}
.status.cancelled {
  background: #f8d7da;
  color: #842029;
}
.status.pending {
  background: #fff3cd;
  color: #856404;
}

.tracking {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-bottom: 16px;
  padding: 12px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.track-step {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #bbb;
}

.track-step .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
}

.track-step.done {
  color: #1a9b3d;
  font-weight: 600;
}

.track-step.done .dot {
  background: #1a9b3d;
}

.product {
  color: #555;
  margin: 6px 0;
  font-size: 14px;
}

.total {
  margin-top: 14px;
  font-weight: 800;
  font-size: 18px;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}

.empty i {
  font-size: 48px;
  margin-bottom: 12px;
  display: block;
}

.shop-btn {
  display: inline-block;
  margin-top: 18px;
  background: var(--primary);
  color: #121212;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 700;
}

@media (max-width: 576px) {
  .order-card {
    padding: 20px;
  }
  .top h3 {
    font-size: 16px;
  }
}
</style>
