import { reactive } from "vue"
import { auth } from "./auth"

function storageKey() {
  const id = auth.currentUser?.email || auth.currentUser?.id || "guest"
  return `primegadget_cart_${id}`
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(storageKey())) || []
  } catch {
    return []
  }
}

function saveCart() {
  localStorage.setItem(storageKey(), JSON.stringify(cart.items))
}

export const cart = reactive({
  items: loadCart(),
})

/** Call after login/logout so cart switches to that user's data */
export function reloadCart() {
  cart.items = loadCart()
}

export function addToCart(product) {
  const existing = cart.items.find((item) => item.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.items.push({ ...product, quantity: 1 })
  }
  saveCart()
}

export function removeFromCart(id) {
  cart.items = cart.items.filter((item) => item.id !== id)
  saveCart()
}

export function increaseQuantity(id) {
  const item = cart.items.find((p) => p.id === id)
  if (item) {
    item.quantity++
    saveCart()
  }
}

export function decreaseQuantity(id) {
  const item = cart.items.find((p) => p.id === id)
  if (!item) return
  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(id)
    return
  }
  saveCart()
}

export function clearCart() {
  cart.items = []
  saveCart()
}
