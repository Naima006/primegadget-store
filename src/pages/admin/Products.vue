<template>
  <AdminLayout>
    <div class="products-page">
      <header class="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your inventory. Changes appear instantly on the storefront.</p>
        </div>
        <button class="btn-primary" @click="openModal()">
          <i class="bi bi-plus-lg"></i> Add Product
        </button>
      </header>

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input v-model="search" placeholder="Search products..." />
        </div>
        <select v-model="filterCategory">
          <option value="All">All Categories</option>
          <option v-for="c in products.categories" :key="c.id" :value="c.name">
            {{ c.name }}
          </option>
        </select>
      </div>

      <!-- Desktop table -->
      <div class="table-wrap desktop-only">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in filtered" :key="p.id">
              <td>
                <div class="product-cell">
                  <img :src="p.image" :alt="p.name" />
                  <div>
                    <strong>{{ p.name }}</strong>
                    <small v-if="p.description">{{ truncate(p.description) }}</small>
                  </div>
                </div>
              </td>
              <td><span class="cat-badge">{{ p.category }}</span></td>
              <td class="price">${{ p.price }}</td>
              <td>
                <div class="row-actions">
                  <button class="icon-btn edit" @click="openModal(p)" title="Edit">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="icon-btn delete" @click="confirmDelete(p)" title="Delete">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="4" class="empty">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="mobile-cards mobile-only">
        <div v-for="p in filtered" :key="p.id" class="mobile-card">
          <img :src="p.image" :alt="p.name" />
          <div class="mobile-info">
            <strong>{{ p.name }}</strong>
            <span class="cat-badge">{{ p.category }}</span>
            <span class="price">${{ p.price }}</span>
          </div>
          <div class="row-actions">
            <button class="icon-btn edit" @click="openModal(p)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="icon-btn delete" @click="confirmDelete(p)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
        <p v-if="!filtered.length" class="empty">No products found.</p>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <header class="modal-header">
            <h2>{{ editing ? "Edit Product" : "Add Product" }}</h2>
            <button class="close-btn" @click="closeModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </header>

          <form @submit.prevent="saveProduct" class="modal-body">
            <div class="form-group">
              <label>Product Name *</label>
              <input v-model="form.name" required placeholder="e.g. Sony WH-1000XM5" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Category *</label>
                <select v-model="form.category" required>
                  <option value="" disabled>Select category</option>
                  <option v-for="c in products.categories" :key="c.id" :value="c.name">
                    {{ c.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Price (USD) *</label>
                <input
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="229"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Image URL *</label>
              <input
                v-model="form.image"
                required
                placeholder="https://example.com/image.jpg"
              />
              <div v-if="form.image" class="img-preview">
                <img :src="form.image" alt="Preview" @error="imgError = true" />
                <span v-if="imgError" class="img-error">Image failed to load</span>
              </div>
            </div>

            <div class="form-group">
              <label>Description (optional)</label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Short product description..."
              ></textarea>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-ghost" @click="closeModal">Cancel</button>
              <button type="submit" class="btn-primary">
                {{ editing ? "Update Product" : "Add Product" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import AdminLayout from "../../layouts/AdminLayout.vue"
import { products } from "../../stores/products"
import { toast } from "../../stores/toast"

const search = ref("")
const filterCategory = ref("All")
const showModal = ref(false)
const editing = ref(null)
const imgError = ref(false)

const form = ref({
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
})

const filtered = computed(() => {
  return products.items.filter((p) => {
    const q = search.value.toLowerCase()
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    const matchCat =
      filterCategory.value === "All" || p.category === filterCategory.value
    return matchSearch && matchCat
  })
})

function truncate(str, len = 40) {
  if (!str) return ""
  return str.length > len ? str.slice(0, len) + "…" : str
}

function openModal(product = null) {
  imgError.value = false
  if (product) {
    editing.value = product
    form.value = {
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description || "",
    }
  } else {
    editing.value = null
    form.value = {
      name: "",
      category: products.categories[0]?.name || "",
      price: "",
      image: "",
      description: "",
    }
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editing.value = null
}

function saveProduct() {
  if (editing.value) {
    products.updateProduct(editing.value.id, { ...form.value })
    toast.open("Product updated successfully")
  } else {
    products.addProduct({ ...form.value })
    toast.open("Product added successfully")
  }
  closeModal()
}

function confirmDelete(p) {
  if (confirm(`Delete "${p.name}"? This cannot be undone.`)) {
    products.deleteProduct(p.id)
    toast.open("Product deleted")
  }
}

watch(
  () => form.value.image,
  () => {
    imgError.value = false
  }
)
</script>

<style scoped>
.products-page {
  max-width: 1200px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
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

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary);
  color: #121212;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 50px;
  font-size: 14px;
  transition: 0.25s;
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(198, 255, 74, 0.3);
}

/* Toolbar */
.toolbar {
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 200px;
  position: relative;
}

.search-box i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-box input {
  width: 100%;
  padding: 13px 16px 13px 44px;
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary);
}

.toolbar select {
  padding: 13px 16px;
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  min-width: 160px;
}

/* Table */
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
  padding: 14px 18px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #777;
  background: #12141a;
  border-bottom: 1px solid #252830;
}

td {
  padding: 14px 18px;
  border-bottom: 1px solid #1e2128;
  font-size: 14px;
  color: #ddd;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 14px;
}

.product-cell img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 10px;
  background: #222;
  flex-shrink: 0;
}

.product-cell strong {
  display: block;
  color: #fff;
  font-size: 14px;
}

.product-cell small {
  color: #777;
  font-size: 12px;
}

.cat-badge {
  background: rgba(198, 255, 74, 0.1);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.price {
  font-weight: 700;
  color: #fff;
}

.row-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  transition: 0.2s;
}

.icon-btn.edit {
  background: rgba(100, 180, 255, 0.12);
  color: #64b4ff;
}
.icon-btn.edit:hover {
  background: rgba(100, 180, 255, 0.25);
}

.icon-btn.delete {
  background: rgba(255, 80, 80, 0.1);
  color: #ff6b6b;
}
.icon-btn.delete:hover {
  background: rgba(255, 80, 80, 0.22);
}

.empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

/* Mobile cards */
.mobile-only {
  display: none;
}
.desktop-only {
  display: block;
}

.mobile-card {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.mobile-card img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 12px;
  background: #222;
  flex-shrink: 0;
}

.mobile-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-info strong {
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 24px 0;
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #aaa;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.modal-body {
  padding: 22px 24px 28px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #999;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 13px 16px;
  background: #0f1115;
  border: 1px solid #2a2e38;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.img-preview {
  margin-top: 12px;
  width: 100%;
  max-width: 180px;
  border-radius: 12px;
  overflow: hidden;
  background: #222;
  border: 1px solid #333;
}

.img-preview img {
  width: 100%;
  height: 120px;
  object-fit: contain;
}

.img-error {
  display: block;
  padding: 8px;
  font-size: 12px;
  color: #ff6b6b;
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn-ghost {
  padding: 12px 22px;
  border-radius: 50px;
  background: transparent;
  border: 1px solid #333;
  color: #ccc;
  font-weight: 600;
  font-size: 14px;
}

.btn-ghost:hover {
  border-color: #555;
  color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: block;
  }

  .page-header h1 {
    font-size: 26px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
