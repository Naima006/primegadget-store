<template>

<MainLayout>

<section class="checkout">

<div class="container">

<div class="title">

<h1>Checkout</h1>

<p>Complete your order information.</p>

</div>

<div class="checkout-grid">

<div class="form-section">

<h2>Customer Information</h2>

<input
v-model="customer.name"
placeholder="Full Name"
/>

<input
v-model="customer.email"
placeholder="Email"
/>

<input
v-model="customer.phone"
placeholder="Phone Number"
/>

<textarea
v-model="customer.address"
placeholder="Delivery Address"
></textarea>

<h2>Payment Method</h2>

<label>

<input
type="radio"
value="Cash on Delivery"
v-model="customer.payment"
/>

Cash on Delivery

</label>

<label>

<input
type="radio"
value="Card"
v-model="customer.payment"
/>

Credit / Debit Card

</label>

<label>

<input
type="radio"
value="Bkash"
v-model="customer.payment"
/>

Bkash

</label>

<button
class="place-order"
@click="placeOrder"
>

Place Order

</button>

</div>

<div class="summary">

<h2>Order Summary</h2>

<div class="delivery-estimate">
  <div class="de-icon"><i class="bi bi-truck"></i></div>
  <div class="de-text">
    <strong>Estimated delivery</strong>
    <p>{{ deliveryInfo.label }}</p>
    <span>{{ deliveryInfo.businessDays }} business days nationwide</span>
  </div>
</div>

<div
v-for="item in cart.items"
:key="item.id"
class="summary-item"
>

<span>

{{ item.name }}

x{{ item.quantity }}

</span>

<span>

${{ item.price * item.quantity }}

</span>

</div>

<hr class="sum-hr" />

<div class="summary-breakdown">
  <div class="row">
    <span>Subtotal</span>
    <span>${{ subtotal }}</span>
  </div>
  <div class="row">
    <span>Shipping</span>
    <span>{{ shippingLabel }}</span>
  </div>
  <div class="row">
    <span>Tax (5%)</span>
    <span>${{ tax }}</span>
  </div>
</div>

<div class="total">
  <span>Total</span>
  <span>${{ total }}</span>
</div>

</div>

</div>

</div>

</section>

</MainLayout>

</template>

<script setup>

import { reactive, computed } from "vue"

import { useRouter } from "vue-router"

import MainLayout from "../layouts/MainLayout.vue"

import { cart, clearCart } from "../stores/cart"

import { addOrder } from "../stores/orders"
import { products } from "../stores/products"

import { toast } from "../stores/toast"
import { getEstimatedDelivery, DEFAULT_BUSINESS_DAYS } from "../utils/delivery"
import { computeOrderTotals } from "../utils/pricing"

const router = useRouter()

const customer = reactive({

name:"",

email:"",

phone:"",

address:"",

payment:"Cash on Delivery"

})

const totals = computed(() => computeOrderTotals(cart.items))
const subtotal = computed(() => totals.value.subtotal)
const tax = computed(() => totals.value.tax)
const shippingLabel = computed(() => totals.value.shippingLabel)
const total = computed(() => totals.value.total)

const deliveryInfo = computed(() => getEstimatedDelivery(new Date(), DEFAULT_BUSINESS_DAYS))

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || "").trim())
}

function placeOrder() {
  if (!cart.items.length) {
    toast.open("Your cart is empty.", "error")
    return
  }

  const name = (customer.name || "").trim()
  const email = (customer.email || "").trim()
  const phone = (customer.phone || "").trim()
  const address = (customer.address || "").trim()

  if (!name || name.length < 2) {
    toast.open("Please enter a valid full name.", "error")
    return
  }
  if (!email || !isValidEmail(email)) {
    toast.open("Please enter a valid email address.", "error")
    return
  }
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    toast.open("Please enter a valid phone number.", "error")
    return
  }
  if (!address || address.length < 8) {
    toast.open("Please enter a complete delivery address.", "error")
    return
  }
  if (!customer.payment) {
    toast.open("Please select a payment method.", "error")
    return
  }

  // Stock validation
  for (const item of cart.items) {
    const p = products.getProduct(item.id)
    const available = typeof p?.stock === "number" ? p.stock : 50
    if (!p || available < item.quantity) {
      toast.open(
        `"${item.name}" only has ${available} left in stock.`,
        "error"
      )
      return
    }
  }

  // Decrease stock
  for (const item of cart.items) {
    products.decreaseStock(item.id, item.quantity)
  }

  const eta = getEstimatedDelivery(new Date(), DEFAULT_BUSINESS_DAYS)

  addOrder({
    id: Date.now(),
    customer: {
      name,
      email,
      phone,
      address,
      payment: customer.payment,
    },
    items: [...cart.items],
    subtotal: subtotal.value,
    tax: tax.value,
    shipping: totals.value.shipping,
    shippingLabel: shippingLabel.value,
    total: total.value,
    date: new Date().toLocaleString(),
    estimatedDelivery: eta.label,
    estimatedDeliveryIso: eta.iso,
    deliveryBusinessDays: eta.businessDays,
  })

  toast.open("Order placed successfully!", "success")
  clearCart()
  router.push("/orders")
}
</script>

<style scoped>

.checkout{

padding:140px 0;

background:#f6f7f9;

}

.title{

margin-bottom:40px;

}


.checkout-grid{

display:grid;

grid-template-columns:2fr 1fr;

gap:40px;

}

.form-section{

background:white;

padding:35px;

border-radius:20px;

}

.form-section h2{
    padding-bottom: 25px;
}

.form-section input,

.form-section textarea{

width:100%;

padding:15px;

margin-bottom:20px;

border:1px solid #ddd;

border-radius:12px;

}

textarea{

height:120px;

resize:none;

}

label {
    display: flex;      
    align-items: center; 
    gap: 12px;
    margin-bottom: 20px;
    cursor: pointer;
}

/* Optional: Ensure the radio button doesn't shrink */
label input[type="radio"] {
    width: auto;
    margin-bottom: 0;
}

.place-order{

margin-top:25px;

width:100%;

padding:16px;

background:var(--primary);

border-radius:50px;

font-weight:700;

}

.summary{

background:white;

padding:30px;

border-radius:20px;

height:fit-content;

position:sticky;

top:120px;

}

.summary-item{

display:flex;

justify-content:space-between;

margin:15px 0;

}

.total{

display:flex;

justify-content:space-between;

font-size:22px;

font-weight:700;

margin-top:20px;

}

@media(max-width:900px){

.checkout-grid{

grid-template-columns:1fr;

}

.summary{

position:static;

}

}


.summary-breakdown {
  margin-bottom: 12px;
}
.summary-breakdown .row {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 14px;
  color: #555;
}
.sum-hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
}
.delivery-estimate {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #f0faf0;
  border: 1px solid #c8e6c8;
  border-radius: 16px;
  padding: 16px 18px;
  margin-bottom: 20px;
}

.de-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #121212;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.de-text strong {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  color: #222;
}

.de-text p {
  font-size: 15px;
  font-weight: 700;
  color: #1a9b3d;
  margin-bottom: 2px;
}

.de-text span {
  font-size: 12px;
  color: #666;
}
</style>