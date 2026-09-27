<template>

<MainLayout>

<section class="cart-page">

<div class="container">

<div class="page-title">

<h1>Shopping Cart</h1>

<p>Your selected gadgets are ready for checkout.</p>

</div>

<div
v-if="cart.items.length"
class="cart-layout"
>

<div class="cart-items">

<div
class="cart-card"
v-for="item in cart.items"
:key="item.id"
>

<img
:src="item.image"
:alt="item.name"
/>

<div class="details">

<h3>{{ item.name }}</h3>

<p>{{ item.category }}</p>

<h4>${{ item.price }}</h4>

</div>

<div class="quantity">

<button @click="decreaseQuantity(item.id)">
-
</button>

<span>

{{ item.quantity }}

</span>

<button @click="increaseQuantity(item.id)">
+
</button>

</div>

<div class="price">

${{ item.price * item.quantity }}

</div>

<button
class="remove"

@click="removeFromCart(item.id)"
>

<i class="bi bi-trash"></i>

</button>

</div>

</div>

<div class="summary">

<h2>Order Summary</h2>

<div class="row">

<span>Subtotal</span>

<span>${{ subtotal }}</span>

</div>

<div class="row">

<span>Shipping</span>

<span>Free</span>

</div>

<div class="row">

<span>Tax</span>

<span>${{ tax }}</span>

</div>

<hr>

<div class="row total">

<span>Total</span>

<span>${{ total }}</span>

</div>

<RouterLink
to="/shop"
class="continue"
>

Continue Shopping

</RouterLink>

<RouterLink
to="/checkout"
class="checkout"
>

Proceed to Checkout

</RouterLink>

</div>

</div>

<div
v-else
class="empty"
>

<i class="bi bi-cart-x"></i>

<h2>Your cart is empty</h2>

<p>

Looks like you haven't added any gadgets yet.

</p>

<RouterLink
to="/shop"
class="shop-btn"
>

Go Shopping

</RouterLink>

</div>

</div>

</section>

</MainLayout>

</template>

<script setup>

import { computed } from "vue"

import MainLayout from "../layouts/MainLayout.vue"

import {

cart,

removeFromCart,

increaseQuantity,

decreaseQuantity

}

from "../stores/cart"
import { computeOrderTotals } from "../utils/pricing"

const totals = computed(() => computeOrderTotals(cart.items))
const subtotal = computed(() => totals.value.subtotal)
const tax = computed(() => totals.value.tax)
const total = computed(() => totals.value.total)

</script>

<style scoped>

.cart-page{

padding:140px 0 80px;

background:#f6f7f9;

min-height:100vh;

}

.page-title{

margin-bottom:40px;

}

.page-title h1{

font-size:44px;

margin-bottom:10px;

}

.page-title p{

color:#777;

}

.cart-layout{

display:grid;

grid-template-columns:2fr 1fr;

gap:35px;

align-items:start;

}

.cart-items{

display:flex;

flex-direction:column;

gap:25px;

}

.cart-card{

background:white;

border-radius:20px;

padding:25px;

display:grid;

grid-template-columns:120px 1fr auto auto auto;

align-items:center;

gap:25px;

box-shadow:0 8px 25px rgba(0,0,0,.06);

}

.cart-card img{

width:120px;

height:120px;

object-fit:contain;

}

.details p{

color:#777;

margin:8px 0;

}

.quantity{

display:flex;

align-items:center;

gap:12px;

}

.quantity button{

width:40px;

height:40px;

border-radius:50%;

background:var(--primary);

font-weight:700;

}

.price{

font-size:20px;

font-weight:700;

}

.remove{

background:#ff4d4d;

color:white;

padding:12px;

border-radius:12px;

}

.summary{

background:white;

padding:30px;

border-radius:20px;

position:sticky;

top:120px;

box-shadow:0 10px 30px rgba(0,0,0,.06);

}

.summary h2{

margin-bottom:25px;

}

.row{

display:flex;

justify-content:space-between;

margin:18px 0;

}

.total{

font-size:22px;

font-weight:700;

}

.checkout{

display:block;

text-align:center;

width:100%;

margin-top:25px;

padding:16px;

background:var(--primary);

border-radius:50px;

font-weight:700;

color:#000;

text-decoration:none;

}

.continue{

display:block;

margin-top:20px;

text-align:center;

color:#666;

}

.empty{

text-align:center;

padding:100px 0;

}

.empty i{

font-size:90px;

color:#bbb;

margin-bottom:20px;

}

.shop-btn{

display:inline-block;

margin-top:25px;

padding:15px 35px;

background:var(--primary);

border-radius:50px;

font-weight:700;

}

@media(max-width:1000px){

.cart-layout{

grid-template-columns:1fr;

}

.summary{

position:static;

}

.cart-card{

grid-template-columns:1fr;

text-align:center;

}

}

</style>