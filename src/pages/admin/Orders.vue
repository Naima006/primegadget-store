<template>
  <AdminLayout>
    <div class="orders-page">
      <header class="page-header">
        <div>
          <h1>Orders</h1>
          <p>View and manage customer orders. Update status as they progress.</p>
        </div>
        <select v-model="statusFilter" class="filter-select">
          <option value="All">All Statuses</option>
          <option v-for="s in STATUS_STEPS" :key="s" :value="s">{{ s }}</option>
        </select>
      </header>

      <div class="stats-row">
        <div class="mini-stat" v-for="s in statusCounts" :key="s.label">
          <span class="num">{{ s.count }}</span>
          <span class="lbl">{{ s.label }}</span>
        </div>
      </div>

      <div v-if="!filtered.length" class="empty">
        <i class="bi bi-receipt"></i>
        <p>No orders yet.</p>
      </div>

      <div v-else class="orders-list">
        <div v-for="order in filtered" :key="order.id" class="order-card">
          <div class="order-top">
            <div>
              <strong class="order-id">#{{ order.id }}</strong>
              <span class="date">{{ order.date }}</span>
            </div>
            <span class="status-badge" :class="statusClass(order.status)">
              {{ order.status }}
            </span>
          </div>

          <div class="order-meta">
            <div>
              <small>Customer</small>
              <p>{{ order.userName || order.customer?.name || "—" }}</p>
            </div>
            <div>
              <small>Email</small>
              <p>{{ order.userEmail || order.customer?.email || "—" }}</p>
            </div>
            <div>
              <small>Payment</small>
              <p>{{ order.customer?.payment || "—" }}</p>
            </div>
            <div>
              <small>Total</small>
              <p class="total">${{ order.total }}</p>
            </div>
          </div>

          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="item-row">
              <img :src="item.image" :alt="item.name" />
              <span class="name">{{ item.name }}</span>
              <span class="qty">×{{ item.quantity }}</span>
              <span class="price">${{ item.price * item.quantity }}</span>
            </div>
          </div>

          <div v-if="order.customer?.address" class="address">
            <i class="bi bi-geo-alt"></i>
            {{ order.customer.address }}
            <span v-if="order.customer.phone"> · {{ order.customer.phone }}</span>
          </div>

          <div class="order-actions">
            <label>Update status</label>
            <select
              :value="order.status"
              @change="onStatusChange(order.id, $event.target.value)"
            >
              <option v-for="s in STATUS_STEPS" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import AdminLayout from "../../layouts/AdminLayout.vue"
import { getAllOrders, updateOrderStatus, STATUS_STEPS } from "../../stores/orders"
import { toast } from "../../stores/toast"

const allOrders = ref([])
const statusFilter = ref("All")

function refresh() {
  allOrders.value = getAllOrders()
}

onMounted(refresh)

const filtered = computed(() => {
  if (statusFilter.value === "All") return allOrders.value
  return allOrders.value.filter((o) => o.status === statusFilter.value)
})

const statusCounts = computed(() => {
  const list = allOrders.value
  return [
    { label: "Total", count: list.length },
    { label: "Pending", count: list.filter((o) => o.status === "Pending").length },
    { label: "Shipped", count: list.filter((o) => o.status === "Shipped").length },
    { label: "Delivered", count: list.filter((o) => o.status === "Delivered").length },
  ]
})

function statusClass(s) {
  const map = {
    Pending: "pending",
    Confirmed: "confirmed",
    Packed: "packed",
    Shipped: "shipped",
    Delivered: "delivered",
    Cancelled: "cancelled",
  }
  return map[s] || "pending"
}

function onStatusChange(id, status) {
  if (updateOrderStatus(id, status)) {
    toast.open(`Order #${id} → ${status}`)
    refresh()
  }
}
</script>

<style scoped>
.orders-page {
  max-width: 1100px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 6px;
}

.page-header p {
  color: #888;
  font-size: 15px;
}

.filter-select {
  padding: 12px 16px;
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.mini-stat {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 14px;
  padding: 16px;
  text-align: center;
}

.mini-stat .num {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
}

.mini-stat .lbl {
  font-size: 12px;
  color: #888;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty i {
  font-size: 48px;
  margin-bottom: 12px;
  display: block;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 18px;
  padding: 22px;
}

.order-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
}

.order-id {
  color: #fff;
  font-size: 16px;
  margin-right: 12px;
}

.date {
  color: #777;
  font-size: 13px;
}

.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.status-badge.pending { background: rgba(255, 180, 80, 0.15); color: #ffb450; }
.status-badge.confirmed { background: rgba(100, 180, 255, 0.15); color: #64b4ff; }
.status-badge.packed { background: rgba(180, 120, 255, 0.15); color: #b478ff; }
.status-badge.shipped { background: rgba(80, 200, 255, 0.15); color: #50c8ff; }
.status-badge.delivered { background: rgba(74, 222, 128, 0.15); color: #4ade80; }
.status-badge.cancelled { background: rgba(255, 80, 80, 0.15); color: #ff6b6b; }

.order-meta {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.order-meta small {
  color: #666;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.order-meta p {
  color: #ddd;
  font-size: 14px;
  margin-top: 2px;
  word-break: break-word;
}

.order-meta .total {
  font-weight: 800;
  color: var(--primary);
  font-size: 16px;
}

.order-items {
  border-top: 1px solid #252830;
  border-bottom: 1px solid #252830;
  padding: 12px 0;
  margin-bottom: 12px;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
}

.item-row img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
  background: #222;
}

.item-row .name {
  flex: 1;
  color: #ccc;
  font-size: 13px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-row .qty {
  color: #888;
  font-size: 13px;
}

.item-row .price {
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  min-width: 60px;
  text-align: right;
}

.address {
  font-size: 13px;
  color: #888;
  margin-bottom: 14px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.order-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.order-actions label {
  font-size: 13px;
  color: #888;
  font-weight: 600;
}

.order-actions select {
  padding: 10px 14px;
  background: #0f1115;
  border: 1px solid #2a2e38;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  min-width: 160px;
}

@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .order-meta {
    grid-template-columns: 1fr 1fr;
  }
  .page-header h1 {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .order-meta {
    grid-template-columns: 1fr;
  }
}
</style>
