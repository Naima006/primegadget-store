/**
 * Estimated delivery helpers (business days, no weekends).
 * Default: 5 business days nationwide for this demo store.
 */

export const DEFAULT_BUSINESS_DAYS = 5

/**
 * Add N business days to a date (skips Sat/Sun).
 * @param {Date} from
 * @param {number} businessDays
 * @returns {Date}
 */
export function addBusinessDays(from, businessDays = DEFAULT_BUSINESS_DAYS) {
  const days = Math.max(0, Number(businessDays) || 0)
  const result = new Date(from.getTime())
  // Start counting from the next calendar day if order is after "today"
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    const day = result.getDay() // 0 Sun … 6 Sat
    if (day !== 0 && day !== 6) {
      added++
    }
  }
  return result
}

/**
 * @param {Date} [from=new Date()]
 * @param {number} [businessDays]
 * @returns {{ date: Date, label: string, businessDays: number, iso: string }}
 */
export function getEstimatedDelivery(
  from = new Date(),
  businessDays = DEFAULT_BUSINESS_DAYS
) {
  const date = addBusinessDays(from, businessDays)
  const label = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  return {
    date,
    label,
    businessDays,
    iso: date.toISOString().slice(0, 10),
  }
}

/** Friendly line for UI */
export function deliveryMessage(businessDays = DEFAULT_BUSINESS_DAYS) {
  const { label } = getEstimatedDelivery(new Date(), businessDays)
  return `Estimated delivery within ${businessDays} business days (by ${label})`
}
