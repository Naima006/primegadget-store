<template>
  <AdminLayout>
    <div class="categories-page">
      <header class="page-header">
        <div>
          <h1>Categories</h1>
          <p>Organize products into categories. New ones appear on the homepage.</p>
        </div>
        <button class="btn-primary" @click="openModal()">
          <i class="bi bi-plus-lg"></i> Add Category
        </button>
      </header>

      <div class="cat-grid">
        <div
          v-for="c in products.categories"
          :key="c.id"
          class="cat-card"
        >
          <div class="cat-icon">
            <i :class="c.icon || 'bi bi-tag'"></i>
          </div>
          <div class="cat-info">
            <strong>{{ c.name }}</strong>
            <small>{{ productCount(c.name) }} products</small>
          </div>
          <div class="cat-actions">
            <button class="icon-btn edit" @click="openModal(c)" title="Edit">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="icon-btn delete" @click="confirmDelete(c)" title="Delete">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <button class="cat-card add-card" @click="openModal()">
          <i class="bi bi-plus-lg"></i>
          <span>Add Category</span>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <header class="modal-header">
            <h2>{{ editing ? "Edit Category" : "Add Category" }}</h2>
            <button class="close-btn" @click="closeModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </header>

          <form @submit.prevent="saveCategory" class="modal-body">
            <div class="form-group">
              <label>Category Name *</label>
              <input
                v-model="form.name"
                required
                placeholder="e.g. Consoles"
              />
            </div>

            <div class="form-group">
              <label>Icon (Bootstrap Icons class)</label>
              <input
                v-model="form.icon"
                placeholder="bi-controller"
              />
              <p class="hint">
                Browse icons at
                <a href="https://icons.getbootstrap.com" target="_blank" rel="noopener">
                  icons.getbootstrap.com
                </a>
                — use class like <code>bi-controller</code>
              </p>
              <div class="icon-preview">
                <i :class="form.icon || 'bi bi-tag'"></i>
                <span>Preview</span>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-ghost" @click="closeModal">Cancel</button>
              <button type="submit" class="btn-primary">
                {{ editing ? "Update" : "Add Category" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue"
import AdminLayout from "../../layouts/AdminLayout.vue"
import { products } from "../../stores/products"
import { toast } from "../../stores/toast"

const showModal = ref(false)
const editing = ref(null)

const form = ref({
  name: "",
  icon: "bi-tag",
})

function productCount(name) {
  return products.items.filter((p) => p.category === name).length
}

function openModal(cat = null) {
  if (cat) {
    editing.value = cat
    form.value = { name: cat.name, icon: cat.icon || "bi-tag" }
  } else {
    editing.value = null
    form.value = { name: "", icon: "bi-tag" }
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editing.value = null
}

function saveCategory() {
  const name = form.value.name.trim()
  if (!name) return

  if (editing.value) {
    products.updateCategory(editing.value.id, {
      name,
      icon: form.value.icon || "bi-tag",
    })
    toast.open("Category updated")
  } else {
    // prevent duplicate names
    if (products.categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      toast.open("Category already exists", "error")
      return
    }
    products.addCategory({
      name,
      icon: form.value.icon || "bi-tag",
    })
    toast.open("Category added")
  }
  closeModal()
}

function confirmDelete(c) {
  const count = productCount(c.name)
  const msg =
    count > 0
      ? `"${c.name}" has ${count} product(s). Delete category anyway?`
      : `Delete category "${c.name}"?`
  if (confirm(msg)) {
    products.deleteCategory(c.id)
    toast.open("Category deleted")
  }
}
</script>

<style scoped>
.categories-page {
  max-width: 1100px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
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

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.cat-card {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 18px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: 0.25s;
}

.cat-card:hover {
  border-color: #333;
}

.cat-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(198, 255, 74, 0.12);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.cat-info {
  flex: 1;
  min-width: 0;
}

.cat-info strong {
  display: block;
  color: #fff;
  font-size: 16px;
  margin-bottom: 2px;
}

.cat-info small {
  color: #777;
  font-size: 13px;
}

.cat-actions {
  display: flex;
  gap: 6px;
}

.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
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

.add-card {
  border-style: dashed;
  justify-content: center;
  color: #666;
  cursor: pointer;
  flex-direction: column;
  gap: 8px;
  min-height: 100px;
}

.add-card i {
  font-size: 28px;
}

.add-card:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(198, 255, 74, 0.04);
}

/* Modal (same pattern as Products) */
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
  max-width: 440px;
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

.form-group input {
  width: 100%;
  padding: 13px 16px;
  background: #0f1115;
  border: 1px solid #2a2e38;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
}

.hint {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  line-height: 1.5;
}

.hint a {
  color: var(--primary);
}

.hint code {
  background: #222;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.icon-preview {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #0f1115;
  border-radius: 12px;
  border: 1px solid #2a2e38;
}

.icon-preview i {
  font-size: 28px;
  color: var(--primary);
}

.icon-preview span {
  color: #888;
  font-size: 13px;
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

@media (max-width: 600px) {
  .page-header h1 {
    font-size: 26px;
  }

  .cat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
