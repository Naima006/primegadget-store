<template>
  <section class="products">
    <div class="container">
      <div class="heading">
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <i class="bi bi-search search-icon"></i>
          <input
            v-model="search"
            placeholder="Search gadgets..."
            aria-label="Search products"
          />
          <button
            v-if="search"
            type="button"
            class="clear-btn"
            @click="search = ''"
            aria-label="Clear search"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="select-wrap">
          <select v-model="category" aria-label="Filter by category">
            <option value="All">All Categories</option>
            <option
              v-for="c in productsStore.categories"
              :key="c.id"
              :value="c.name"
            >
              {{ c.name }}
            </option>
          </select>
          <i class="bi bi-chevron-down select-arrow"></i>
        </div>
      </div>

      <p v-if="filteredProducts.length === 0" class="no-results">
        No products match your search.
      </p>

      <div v-else class="grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @open="selected = $event"
        />
      </div>

      <ProductDetailModal
        :product="selected"
        @close="selected = null"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { products as productsStore } from "../stores/products"
import ProductCard from "./ProductCard.vue"
import ProductDetailModal from "./ProductDetailModal.vue"

const selected = ref(null)

const props = defineProps({
  title: {
    type: String,
    default: "Featured Products",
  },
  subtitle: {
    type: String,
    default: "Premium gadgets carefully selected for you.",
  },
})

const route = useRoute()
const search = ref("")
const category = ref("All")

onMounted(() => {
  if (route.query.category) {
    category.value = route.query.category
  }
})

const filteredProducts = computed(() => {
  return productsStore.items.filter((product) => {
    const keyword = search.value.toLowerCase()
    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    const matchesCategory =
      category.value === "All" || product.category === category.value
    return matchesSearch && matchesCategory
  })
})
</script>

<style scoped>
.products {
  padding: 50px 0;
}

.heading {
  text-align: center;
  margin-bottom: 50px;
}

.heading h2 {
  font-size: 42px;
  margin-bottom: 10px;
}

.heading p {
  color: gray;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  gap: 16px;
  flex-wrap: wrap;
}

/* Search */
.search-wrap {
  flex: 1;
  min-width: 200px;
  max-width: 1140px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  pointer-events: none;
}

.search-wrap input {
  width: 100%;
  padding: 14px 44px 14px 44px;
  border-radius: 14px;
  border: 1.5px solid #e5e5e5;
  font-size: 15px;
  background: #fff;
  transition: 0.25s;
  box-sizing: border-box;
}

.search-wrap input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(198, 255, 74, 0.2);
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: 0.2s;
  border: none;
  cursor: pointer;
}

.clear-btn:hover {
  background: #e0e0e0;
  color: #111;
}

/* Modern select */
.select-wrap {
  position: relative;
  min-width: 180px;
}

.select-wrap select {
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  padding: 14px 42px 14px 18px;
  border-radius: 14px;
  border: 1.5px solid #e5e5e5;
  font-size: 15px;
  font-weight: 500;
  background: #fff;
  color: #222;
  cursor: pointer;
  transition: 0.25s;
  box-sizing: border-box;
}

.select-wrap select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(198, 255, 74, 0.2);
}

.select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  font-size: 14px;
}

/* Grid — cards keep natural width, don't stretch when few results */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
  justify-content: start;
}

/* Cap card width so a single filtered result doesn't span full row */
.grid > * {
  max-width: 340px;
  width: 100%;
  justify-self: start;
}

.no-results {
  text-align: center;
  color: #888;
  padding: 40px 20px;
  font-size: 15px;
}

@media (max-width: 768px) {
  .heading h2 {
    font-size: 32px;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }

  .grid > * {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-wrap {
    max-width: 100%;
  }

  .select-wrap {
    min-width: 0;
    width: 100%;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .grid > * {
    max-width: 100%;
    justify-self: stretch;
  }
}
</style>
