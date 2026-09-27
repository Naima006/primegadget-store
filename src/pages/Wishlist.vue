<template>
  <MainLayout>
    <section class="wishlist-page">
      <div class="container">
        <div class="page-header">
          <div>
            <h1>Wishlist</h1>
            <p class="subtitle">
              Products you’ve saved for later.
            </p>
          </div>
          <RouterLink to="/shop" class="shop-link">
            Continue Shopping
            <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>

        <div v-if="!auth.isLoggedIn" class="empty">
          <i class="bi bi-heart"></i>
          <h2>Sign in to use your wishlist</h2>
          <p>Favorites are saved per account.</p>
          <RouterLink to="/login" class="cta">Login</RouterLink>
        </div>

        <div v-else-if="!wishlistProducts.length" class="empty">
          <i class="bi bi-heart"></i>
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart on any product card to save it here.</p>
          <RouterLink to="/shop" class="cta">Browse Products</RouterLink>
        </div>

        <div v-else class="grid">
          <article
            v-for="product in wishlistProducts"
            :key="product.id"
            class="wish-card"
          >
            <button
              class="remove-btn"
              @click="remove(product.id)"
              title="Remove from wishlist"
              aria-label="Remove from wishlist"
            >
              <i class="bi bi-heart-fill"></i>
            </button>

            <div class="img-wrap" @click="selected = product">
              <img :src="product.image" :alt="product.name" loading="lazy" />
            </div>

            <span class="cat">{{ product.category }}</span>
            <h3 @click="selected = product">{{ product.name }}</h3>
            <p class="price">${{ product.price }}</p>

            <div class="actions">
              <button
                class="add-btn"
                :disabled="!canBuy(product)"
                @click="add(product)"
              >
                {{ canBuy(product) ? "Add to Cart" : "Unavailable" }}
              </button>
            </div>
          </article>
        </div>

        <ProductDetailModal
          :product="selected"
          @close="selected = null"
        />
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import MainLayout from "../layouts/MainLayout.vue"
import ProductDetailModal from "../components/ProductDetailModal.vue"
import { auth } from "../stores/auth"
import { favorites, reloadFavorites } from "../stores/favorites"
import { products } from "../stores/products"
import { addToCart } from "../stores/cart"
import { toast } from "../stores/toast"

const selected = ref(null)

onMounted(() => {
  reloadFavorites()
})

const wishlistProducts = computed(() => {
  return favorites.ids
    .map((id) => products.getProduct(id) || products.items.find((p) => p.id === id))
    .filter(Boolean)
})

function canBuy(product) {
  if (!product) return false
  if (product.comingSoon) return false
  const stock = typeof product.stock === "number" ? product.stock : 50
  return stock > 0
}

function remove(id) {
  favorites.toggle(id)
  toast.open("Removed from wishlist")
}

function add(product) {
  if (!canBuy(product)) {
    toast.open("This item is unavailable.", "error")
    return
  }
  addToCart(product)
  toast.open("Added to cart")
}
</script>

<style scoped>
.wishlist-page {
  padding: 140px 0 80px;
  background: #f6f7f9;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 6px;
}

.subtitle {
  color: #777;
  font-size: 15px;
}

.shop-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #121212;
  padding: 12px 22px;
  background: var(--primary);
  border-radius: 50px;
  transition: 0.25s;
}

.shop-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(198, 255, 74, 0.35);
}

.empty {
  text-align: center;
  padding: 70px 20px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.empty i {
  font-size: 52px;
  color: #ddd;
  display: block;
  margin-bottom: 14px;
}

.empty h2 {
  font-size: 22px;
  margin-bottom: 8px;
}

.empty p {
  color: #888;
  margin-bottom: 22px;
}

.cta {
  display: inline-block;
  background: #121212;
  color: #fff;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.wish-card {
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
}

.wish-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.08);
}

.remove-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #eee;
  color: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: 0.2s;
}

.remove-btn:hover {
  background: #ffe8e8;
}

.img-wrap {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 12px;
}

.img-wrap img {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
}

.cat {
  font-size: 12px;
  font-weight: 600;
  color: #888;
  margin-bottom: 4px;
}

h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  cursor: pointer;
  line-height: 1.3;
  min-height: 42px;
}

.price {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 14px;
}

.actions {
  margin-top: auto;
}

.add-btn {
  width: 100%;
  padding: 12px;
  border-radius: 50px;
  background: var(--primary);
  color: #121212;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.25s;
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(198, 255, 74, 0.35);
}

.add-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 576px) {
  .page-header h1 {
    font-size: 28px;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .wish-card {
    padding: 14px;
  }

  .img-wrap {
    height: 110px;
  }

  h3 {
    font-size: 14px;
    min-height: 36px;
  }

  .price {
    font-size: 16px;
  }
}
</style>
