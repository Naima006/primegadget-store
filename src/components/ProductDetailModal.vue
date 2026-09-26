<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="product" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal" role="dialog" aria-modal="true">
          <button class="close-btn" @click="$emit('close')" aria-label="Close">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="modal-grid">
            <div class="modal-image">
              <img :src="product.image" :alt="product.name" />
            </div>

            <div class="modal-info">
              <span class="category">{{ product.category }}</span>
              <h2>{{ product.name }}</h2>

              <div class="rating">
                <i
                  v-for="n in 5"
                  :key="n"
                  :class="n <= stars ? 'bi bi-star-fill' : 'bi bi-star'"
                ></i>
                <span class="rating-count">({{ reviewCount }} reviews)</span>
              </div>

              <p class="price">${{ product.price }}</p>

              <p class="desc">
                {{
                  product.description ||
                  "Premium quality gadget designed for everyday excellence. Experience cutting-edge technology with elegant design and reliable performance."
                }}
              </p>

              <div class="qty-row">
                <span>Quantity</span>
                <div class="stepper">
                  <button @click="qty > 1 && qty--">−</button>
                  <span>{{ qty }}</span>
                  <button @click="qty < 99 && qty++">+</button>
                </div>
              </div>

              <div class="actions">
                <button class="cart-btn" @click="add">
                  <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
                <button class="buy-btn" @click="buy">Buy Now</button>
              </div>

              <button
                class="fav-row"
                :class="{ active: isFav }"
                @click="toggleFav"
              >
                <i :class="isFav ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                {{ isFav ? "Saved to Favorites" : "Add to Favorites" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRouter } from "vue-router"
import { addToCart } from "../stores/cart"
import { favorites } from "../stores/favorites"
import { toast } from "../stores/toast"

const props = defineProps({
  product: { type: Object, default: null },
})
const emit = defineEmits(["close"])

const router = useRouter()
const qty = ref(1)

watch(
  () => props.product,
  () => {
    qty.value = 1
  }
)

const stars = computed(() => {
  if (!props.product) return 4
  return 3 + (props.product.id % 3)
})

const reviewCount = computed(() => {
  if (!props.product) return 0
  return 12 + (props.product.id * 7) % 90
})

const isFav = computed(() =>
  props.product ? favorites.isFavorite(props.product.id) : false
)

function toggleFav() {
  if (!props.product) return
  favorites.toggle(props.product.id)
}

function add() {
  for (let i = 0; i < qty.value; i++) addToCart(props.product)
  toast.open("Added to cart")
}

function buy() {
  for (let i = 0; i < qty.value; i++) addToCart(props.product)
  emit("close")
  router.push("/checkout")
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  backdrop-filter: blur(6px);
}

.modal {
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 860px;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.35);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #333;
  font-size: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #e0e0e0;
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.modal-image {
  background: #f6f7f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  border-radius: 24px 0 0 24px;
}

.modal-image img {
  max-width: 100%;
  max-height: 360px;
  object-fit: contain;
}

.modal-info {
  padding: 40px 32px 32px;
}

.category {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #121212;
  background: var(--primary);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}

h2 {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 1.25;
  color: #111;
}

.rating {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 14px;
}

.rating i {
  font-size: 15px;
  color: #f5b400;
}

.rating .bi-star {
  color: #ddd;
}

.rating-count {
  margin-left: 8px;
  font-size: 13px;
  color: #888;
}

.price {
  font-size: 28px;
  font-weight: 800;
  color: #111;
  margin-bottom: 14px;
}

.desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 22px;
}

.qty-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  font-weight: 600;
  font-size: 14px;
}

.stepper {
  display: flex;
  align-items: center;
  background: #f4f4f4;
  border-radius: 50px;
  padding: 4px;
}

.stepper button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: white;
  font-size: 16px;
  font-weight: bold;
}

.stepper button:hover {
  background: var(--primary);
}

.stepper span {
  width: 36px;
  text-align: center;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.cart-btn,
.buy-btn {
  flex: 1;
  padding: 13px 12px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.cart-btn {
  background: var(--primary);
  color: #121212;
}

.buy-btn {
  background: #121212;
  color: #fff;
}

.cart-btn:hover {
  transform: translateY(-2px);
}

.buy-btn:hover {
  background: #2a2a2a;
  transform: translateY(-2px);
}

.fav-row {
  width: 100%;
  padding: 12px;
  border-radius: 50px;
  background: transparent;
  border: 1px solid #e0e0e0;
  color: #666;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.fav-row.active {
  color: #ff4d6d;
  border-color: #ffc0cb;
  background: #fff5f7;
}

.fav-row:hover {
  border-color: #ff4d6d;
  color: #ff4d6d;
}

/* transitions */
.modal-enter-active,
.modal-leave-active {
  transition: 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.95) translateY(12px);
}

@media (max-width: 720px) {
  .modal-grid {
    grid-template-columns: 1fr;
  }
  .modal-image {
    border-radius: 24px 24px 0 0;
    padding: 28px 20px;
  }
  .modal-image img {
    max-height: 220px;
  }
  .modal-info {
    padding: 24px 20px 28px;
  }
  h2 {
    font-size: 22px;
  }
  .actions {
    flex-direction: column;
  }
}
</style>
