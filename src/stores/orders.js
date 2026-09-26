import { reactive } from "vue"
import { auth } from "./auth"

const GLOBAL_KEY = "primegadget_all_orders"

function userKey() {
  const id = auth.currentUser?.email || auth.currentUser?.id || "guest"
  return `primegadget_orders_${id}`
}

function loadUserOrders() {
  try {
    return JSON.parse(localStorage.getItem(userKey())) || []
  } catch {
    return []
  }
}

function loadAllOrders() {
  try {
    return JSON.parse(localStorage.getItem(GLOBAL_KEY)) || []
  } catch {
    return []
  }
}

function saveUserOrders() {
  localStorage.setItem(userKey(), JSON.stringify(orders.items))
}

function saveAllOrders(list) {
  localStorage.setItem(GLOBAL_KEY, JSON.stringify(list))
}

function ensureTracking(order) {
  if (!order.status) order.status = "Pending"
  if (!order.tracking) {
    order.tracking = [
      { title: "Order Placed", completed: true },
      { title: "Confirmed", completed: false },
      { title: "Packed", completed: false },
      { title: "Shipped", completed: false },
      { title: "Delivered", completed: false },
    ]
  }
  return order
}

export const orders = reactive({
  items: loadUserOrders().map(ensureTracking),
})

/** All orders (for admin) */
export function getAllOrders() {
  return loadAllOrders().map(ensureTracking)
}

export function reloadOrders() {
  orders.items = loadUserOrders().map(ensureTracking)
}

export function addOrder(order) {
  order.status = order.status || "Pending"
  order.tracking = [
    { title: "Order Placed", completed: true },
    { title: "Confirmed", completed: false },
    { title: "Packed", completed: false },
    { title: "Shipped", completed: false },
    { title: "Delivered", completed: false },
  ]
  order.userEmail = auth.currentUser?.email || order.customer?.email || "guest"
  order.userName = auth.currentUser?.name || order.customer?.name || "Guest"

  orders.items.unshift(order)
  saveUserOrders()

  // Also store in global list for admin
  const all = loadAllOrders()
  all.unshift(order)
  saveAllOrders(all)
}

const STATUS_STEPS = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"]

export function updateOrderStatus(orderId, newStatus) {
  const all = loadAllOrders()
  const idx = all.findIndex((o) => o.id === orderId)
  if (idx === -1) return false

  all[idx].status = newStatus
  // Sync tracking steps
  const stepIndex = STATUS_STEPS.indexOf(newStatus)
  if (stepIndex >= 0 && newStatus !== "Cancelled") {
    all[idx].tracking = all[idx].tracking || []
    const titles = ["Order Placed", "Confirmed", "Packed", "Shipped", "Delivered"]
    all[idx].tracking = titles.map((title, i) => ({
      title,
      completed: i <= stepIndex,
    }))
  }
  saveAllOrders(all)

  // Update current user's list if it belongs to them
  const uIdx = orders.items.findIndex((o) => o.id === orderId)
  if (uIdx !== -1) {
    orders.items[uIdx] = { ...all[idx] }
    saveUserOrders()
  }
  return true
}

export { STATUS_STEPS }
