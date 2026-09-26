<template>
  <div class="product-card">
    <!-- Favorite button -->
    <button
      class="fav-btn"
      :class="{ active: isFav }"
      @click.stop="toggleFav"
      :title="isFav ? 'Remove from favorites' : 'Add to favorites'"
      aria-label="Toggle favorite"
    >
      <i :class="isFav ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
    </button>

    <img :src="product.image" :alt="product.name" loading="lazy" />

    <span class="category">{{ product.category }}</span>

    <h3>{{ product.name }}</h3>

    <!-- Star rating (demo / static with slight variation by id) -->
    <div class="rating" aria-label="Product rating">
      <i
        v-for="n in 5"
        :key="n"
        :class="n <= stars ? 'bi bi-star-fill' : 'bi bi-star'"
      ></i>
      <span class="rating-count">({{ reviewCount }})</span>
    </div>

    <h4 class="price">${{ product.price }}</h4>

    <div class="actions">
      <div class="stepper">
        <button @click="decrease" aria-label="Decrease quantity">−</button>
        <span>{{ quantity }}</span>
        <button @click="increase" aria-label="Increase quantity">+</button>
      </div>

      <button class="cart-btn" @click="handleAdd">
        Add to Cart
      </button>
    </div>

    <button class="buy-btn" @click="handleBuyNow">
      Buy Now
    </button>

    <Transition name="fade">
      <p v-if="added" class="success">✓ Added to Cart</p>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { addToCart } from "../stores/cart"
import { favorites } from "../stores/favorites"

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const quantity = ref(1)
const added = ref(false)

const isFav = computed(() => favorites.isFavorite(props.product.id))

// Deterministic demo rating based on product id (looks real, no backend needed)
const stars = computed(() => {
  const base = 3 + (props.product.id % 3) // 3, 4 or 5
  return base
})

const reviewCount = computed(() => {
  return 12 + (props.product.id * 7) % 90
})

function toggleFav() {
  favorites.toggle(props.product.id)
}

function increase() {
  if (quantity.value < 99) quantity.value++
}

function decrease() {
  if (quantity.value > 1) quantity.value--
}

function handleAdd() {
  for (let i = 0; i < quantity.value; i++) {
    addToCart(props.product)
  }
  added.value = true
  setTimeout(() => {
    added.value = false
  }, 1500)
}

function handleBuyNow() {
  // Ensure at least one is in cart then go to checkout
  const existing = JSON.parse(localStorage.getItem("cart") || "[]")
  const found = existing.find((i) => i.id === props.product.id)
  if (!found) {
    for (let i = 0; i < quantity.value; i++) {
      addToCart(props.product)
    }
  }
  router.push("/checkout")
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: 0.35s;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.14);
}

/* Favorite */
.fav-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #999;
  z-index: 2;
  transition: 0.25s;
}

.fav-btn:hover {
  transform: scale(1.08);
  color: #ff4d6d;
}

.fav-btn.active {
  color: #ff4d6d;
  background: #fff0f3;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  display: block;
  transition: 0.4s;
  margin-bottom: 14px;
}

.product-card:hover img {
  transform: scale(1.08);
}

.category {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  background: rgba(198, 255, 74, 0.15);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 8px;
  width: fit-content;
}

h3 {
  margin: 4px 0 6px;
  min-height: 48px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  color: #111;
}

/* Rating */
.rating {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 10px;
}

.rating i {
  font-size: 14px;
  color: #f5b400;
}

.rating .bi-star {
  color: #ddd;
}

.rating-count {
  margin-left: 6px;
  font-size: 12px;
  color: #999;
  font-weight: 500;
}

.price {
  font-size: 22px;
  font-weight: 800;
  color: #111;
  margin-bottom: 14px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.stepper {
  display: flex;
  align-items: center;
  background: #f4f4f4;
  border-radius: 50px;
  padding: 5px;
}

.stepper button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  font-size: 16px;
  font-weight: bold;
  transition: 0.25s;
  color: #333;
}

.stepper button:hover {
  background: var(--primary);
}

.stepper span {
  width: 32px;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
}

.cart-btn {
  flex: 1;
  padding: 11px 12px;
  border-radius: 50px;
  background: var(--primary);
  font-weight: 700;
  font-size: 13px;
  transition: 0.3s;
  color: #121212;
}

.cart-btn:hover {
  transform: translateY(-2px);
}

.cart-btn:active {
  transform: scale(0.97);
}

.buy-btn {
  width: 100%;
  padding: 11px;
  border-radius: 50px;
  background: #121212;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  transition: 0.3s;
  margin-top: 2px;
}

.buy-btn:hover {
  background: #2a2a2a;
  transform: translateY(-2px);
}

.success {
  min-height: 22px;
  margin-top: 10px;
  color: #1a9b3d;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* Responsive tweaks */
@media (max-width: 576px) {
  .product-card {
    padding: 18px;
  }

  .product-card img {
    height: 160px;
  }

  h3 {
    font-size: 16px;
    min-height: 40px;
  }

  .price {
    font-size: 18px;
  }

  .cart-btn,
  .buy-btn {
    font-size: 12px;
    padding: 10px;
  }

  .fav-btn {
    width: 36px;
    height: 36px;
    font-size: 16px;
    top: 12px;
    right: 12px;
  }
}
</style>
