<template>
  <AdminLayout>
    <div class="dashboard">
      <header class="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {{ auth.currentUser?.name || "Admin" }}. Here's what's happening.</p>
        </div>
        <RouterLink to="/" class="btn-outline">
          <i class="bi bi-shop"></i> View Store
        </RouterLink>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon products">
            <i class="bi bi-box-seam"></i>
          </div>
          <div>
            <span class="stat-value">{{ products.items.length }}</span>
            <span class="stat-label">Total Products</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon categories">
            <i class="bi bi-tags"></i>
          </div>
          <div>
            <span class="stat-value">{{ products.categories.length }}</span>
            <span class="stat-label">Categories</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon orders">
            <i class="bi bi-receipt"></i>
          </div>
          <div>
            <span class="stat-value">{{ ordersCount }}</span>
            <span class="stat-label">Orders</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon hero">
            <i class="bi bi-image"></i>
          </div>
          <div>
            <span class="stat-value">Live</span>
            <span class="stat-label">Hero Status</span>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <RouterLink to="/admin/products" class="action-card">
            <i class="bi bi-plus-circle"></i>
            <span>Add Product</span>
          </RouterLink>
          <RouterLink to="/admin/categories" class="action-card">
            <i class="bi bi-folder-plus"></i>
            <span>Manage Categories</span>
          </RouterLink>
          <RouterLink to="/admin/orders" class="action-card">
            <i class="bi bi-receipt"></i>
            <span>Manage Orders</span>
          </RouterLink>
          <RouterLink to="/admin/hero" class="action-card">
            <i class="bi bi-pencil-square"></i>
            <span>Edit Hero Section</span>
          </RouterLink>
          <RouterLink to="/shop" class="action-card">
            <i class="bi bi-eye"></i>
            <span>Preview Shop</span>
          </RouterLink>
        </div>
      </div>

      <div class="recent-section">
        <h2>Recent Products</h2>
        <div class="table-wrap">
          <table v-if="recentProducts.length">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in recentProducts" :key="p.id">
                <td>
                  <div class="product-cell">
                    <img :src="p.image" :alt="p.name" />
                    <span>{{ p.name }}</span>
                  </div>
                </td>
                <td><span class="cat-badge">{{ p.category }}</span></td>
                <td class="price">${{ p.price }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="empty">No products yet. Add your first product!</p>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed } from "vue"
import AdminLayout from "../../layouts/AdminLayout.vue"
import { auth } from "../../stores/auth"
import { products } from "../../stores/products"
import { getAllOrders } from "../../stores/orders"

const ordersCount = computed(() => getAllOrders().length)

const recentProducts = computed(() => {
  return [...products.items].slice(-5).reverse()
})
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 36px;
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

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border: 1px solid #333;
  border-radius: 50px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  transition: 0.25s;
  white-space: nowrap;
}

.btn-outline:hover {
  border-color: var(--primary);
  color: var(--primary);
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 40px;
}

.stat-card {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 18px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: 0.25s;
}

.stat-card:hover {
  border-color: #333;
  transform: translateY(-3px);
}

.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.stat-icon.products {
  background: rgba(198, 255, 74, 0.12);
  color: var(--primary);
}
.stat-icon.categories {
  background: rgba(100, 180, 255, 0.12);
  color: #64b4ff;
}
.stat-icon.orders {
  background: rgba(255, 180, 80, 0.12);
  color: #ffb450;
}
.stat-icon.hero {
  background: rgba(200, 120, 255, 0.12);
  color: #c878ff;
}

.stat-value {
  display: block;
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: #888;
}

/* Quick Actions */
.quick-actions {
  margin-bottom: 40px;
}

.quick-actions h2,
.recent-section h2 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 18px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.action-card {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  color: #ccc;
  font-weight: 600;
  font-size: 14px;
  transition: 0.25s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.action-card i {
  font-size: 26px;
  color: var(--primary);
}

.action-card:hover {
  border-color: var(--primary);
  background: rgba(198, 255, 74, 0.05);
  transform: translateY(-4px);
  color: #fff;
}

/* Recent table */
.table-wrap {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 18px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 14px 20px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #777;
  border-bottom: 1px solid #252830;
  background: #12141a;
}

td {
  padding: 14px 20px;
  border-bottom: 1px solid #1e2128;
  font-size: 14px;
  color: #ddd;
}

tr:last-child td {
  border-bottom: none;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-cell img {
  width: 42px;
  height: 42px;
  object-fit: contain;
  border-radius: 10px;
  background: #222;
}

.cat-badge {
  background: rgba(198, 255, 74, 0.1);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.price {
  font-weight: 700;
  color: #fff;
}

.empty {
  padding: 40px;
  text-align: center;
  color: #666;
}

/* Responsive */
@media (max-width: 1100px) {
  .stats-grid,
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .page-header h1 {
    font-size: 26px;
  }

  .stats-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 18px;
  }

  th,
  td {
    padding: 12px 14px;
  }

  .product-cell span {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
