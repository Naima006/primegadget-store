<template>
  <section id="categories" class="categories">
    <div class="container">
      <div class="section-header">
        <h2>Shop by Category</h2>
        <p>Discover premium gadgets across our most popular collections.</p>
      </div>

      <div class="category-grid">
        <div
          v-for="cat in products.categories"
          :key="cat.id"
          class="category-card"
          @click="goToShop(cat.name)"
        >
          <i :class="cat.icon || 'bi bi-tag'"></i>
          <h3>{{ cat.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router"
import { products } from "../stores/products"

const router = useRouter()

function goToShop(category) {
  router.push({ path: "/shop", query: { category } })
}
</script>

<style scoped>
.categories {
  padding: 50px 0;
  background: #f7f8fa;
  scroll-margin-top: 100px;
}

.section-header {
  text-align: center;
  margin-bottom: 55px;
}

.section-header h2 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 12px;
}

.section-header p {
  color: #777;
  max-width: 650px;
  margin: auto;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
}

.category-card {
  background: white;
  border-radius: 22px;
  padding: 40px 20px;
  text-align: center;
  transition: 0.35s;
  cursor: pointer;
  border: 1px solid #ececec;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
}

.category-card i {
  font-size: 52px;
  color: var(--primary);
  margin-bottom: 20px;
  display: block;
}

.category-card h3 {
  font-size: 20px;
  font-weight: 600;
}

@media (max-width: 1100px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 32px;
  }

  .category-card {
    padding: 28px 16px;
  }

  .category-card i {
    font-size: 40px;
  }

  .category-card h3 {
    font-size: 16px;
  }
}

@media (max-width: 500px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}
</style>
