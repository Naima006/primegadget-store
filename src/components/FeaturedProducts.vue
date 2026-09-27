<template>
  <section class="products" :id="sectionId || undefined">
    <div class="container">
      <div v-if="title || subtitle" class="heading anim-fade-up">
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>

      <div class="toolbar anim-fade-up anim-delay-1">
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
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
          @open="selected = $event"
        />
      </div>

      <!-- Home: See more → Shop -->
      <div v-if="showSeeMore && filteredProducts.length > limit" class="see-more-wrap">
        <RouterLink to="/shop" class="see-more-btn">
          See All Products
          <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>

      <!-- Shop: Pagination -->
      <div v-if="enablePagination && totalPages > 1" class="pagination">
        <button
          class="page-btn"
          :disabled="currentPage <= 1"
          @click="goPage(currentPage - 1)"
          aria-label="Previous page"
        >
          <i class="bi bi-chevron-left"></i>
        </button>

        <template v-for="p in pageNumbers" :key="p">
          <span v-if="p === '...'" class="page-ellipsis">…</span>
          <button
            v-else
            class="page-btn"
            :class="{ active: p === currentPage }"
            @click="goPage(p)"
          >
            {{ p }}
          </button>
        </template>

        <button
          class="page-btn"
          :disabled="currentPage >= totalPages"
          @click="goPage(currentPage + 1)"
          aria-label="Next page"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <p v-if="enablePagination && filteredProducts.length > 0" class="page-info">
        Showing {{ rangeStart }}–{{ rangeEnd }} of {{ filteredProducts.length }}
      </p>

      <ProductDetailModal
        :product="selected"
        @close="selected = null"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
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
  /** Home: only show first N products (0 = no limit) */
  limit: {
    type: Number,
    default: 0,
  },
  /** Home: show “See All Products” button */
  showSeeMore: {
    type: Boolean,
    default: false,
  },
  /** Shop: enable pagination */
  enablePagination: {
    type: Boolean,
    default: false,
  },
  /** Products per page when pagination is on */
  pageSize: {
    type: Number,
    default: 8,
  },
  /** Section id for in-page anchor links (e.g. "featured") */
  sectionId: {
    type: String,
    default: "",
  },
})

const route = useRoute()
const search = ref("")
const category = ref("All")
const currentPage = ref(1)

onMounted(() => {
  if (route.query.category) {
    category.value = route.query.category
  }
})

watch([search, category], () => {
  currentPage.value = 1
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

const totalPages = computed(() => {
  if (!props.enablePagination) return 1
  return Math.max(1, Math.ceil(filteredProducts.value.length / props.pageSize))
})

const displayedProducts = computed(() => {
  let list = filteredProducts.value

  // Home: hard limit (top N)
  if (props.limit > 0 && !props.enablePagination) {
    return list.slice(0, props.limit)
  }

  // Shop: paginate
  if (props.enablePagination) {
    const start = (currentPage.value - 1) * props.pageSize
    return list.slice(start, start + props.pageSize)
  }

  return list
})

const rangeStart = computed(() => {
  if (!filteredProducts.value.length) return 0
  return (currentPage.value - 1) * props.pageSize + 1
})

const rangeEnd = computed(() => {
  return Math.min(
    currentPage.value * props.pageSize,
    filteredProducts.value.length
  )
})

/** Smart page numbers: 1 … 4 5 6 … 12 */
const pageNumbers = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages = []
  pages.push(1)
  if (cur > 3) pages.push("...")
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) {
    pages.push(i)
  }
  if (cur < total - 2) pages.push("...")
  pages.push(total)
  return pages
})

function goPage(p) {
  if (typeof p !== "number") return
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  // Smooth scroll to top of products section
  const el = props.sectionId
    ? document.getElementById(props.sectionId)
    : null
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}
</script>

<style scoped>
.products {
  padding: 50px 0;
  scroll-margin-top: 100px; /* offset fixed navbar when hashing here */
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
  justify-content: start;
}

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

/* See more */
.see-more-wrap {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.see-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #121212;
  color: #fff;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 15px;
  transition: 0.3s;
}

.see-more-btn:hover {
  background: #2a2a2a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.see-more-btn i {
  font-size: 16px;
  transition: 0.25s;
}

.see-more-btn:hover i {
  transform: translateX(4px);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
  flex-wrap: wrap;
}

.page-btn {
  min-width: 42px;
  height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1.5px solid #e5e5e5;
  background: #fff;
  color: #333;
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.25s;
  cursor: pointer;
}

.page-btn:hover:not(:disabled):not(.active) {
  border-color: var(--primary);
  background: rgba(198, 255, 74, 0.1);
}

.page-btn.active {
  background: #121212;
  color: #fff;
  border-color: #121212;
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-ellipsis {
  color: #999;
  font-weight: 600;
  padding: 0 4px;
}

.page-info {
  text-align: center;
  margin-top: 14px;
  font-size: 13px;
  color: #888;
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

  .page-btn {
    min-width: 38px;
    height: 38px;
    font-size: 13px;
  }
}
</style>
