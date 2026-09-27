/**
 * Shared cart/checkout pricing so totals stay consistent everywhere.
 * Tax: 5% of subtotal (rounded). Shipping: free for this demo store.
 */

export const TAX_RATE = 0.05
export const SHIPPING_COST = 0

/**
 * @param {Array<{ price: number, quantity: number }>} items
 * @returns {{ subtotal: number, tax: number, shipping: number, total: number, shippingLabel: string }}
 */
export function computeOrderTotals(items = []) {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  )
  const tax = Math.round(subtotal * TAX_RATE)
  const shipping = SHIPPING_COST
  const total = subtotal + tax + shipping
  return {
    subtotal,
    tax,
    shipping,
    total,
    shippingLabel: shipping === 0 ? "Free" : `$${shipping}`,
  }
}
