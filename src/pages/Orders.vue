<template>

<MainLayout>

<section class="orders">

<div class="container">

<h1>My Orders</h1>

<p class="subtitle">

Your recent purchases.

</p>

<div
v-if="orders.items.length"
>

<div
class="order-card"
v-for="order in orders.items"
:key="order.id"
>

<div class="top">

<h3>

Order #{{ order.id }}

</h3>

<span>

{{ order.date }}

</span>

</div>

<div
class="product"
v-for="item in order.items"
:key="item.id"
>

{{ item.name }}

× {{ item.quantity }}

</div>

<div class="total">

Total: ${{ order.total }}

</div>

</div>

</div>

<div
v-else
class="empty"
>

<i class="bi bi-box"></i>

<h2>No Orders Yet</h2>

<p>

Your completed purchases will appear here.

</p>

<RouterLink
to="/shop"
class="shop-btn"
>

Start Shopping

</RouterLink>

</div>

</div>

</section>

</MainLayout>

</template>

<script setup>

import MainLayout from "../layouts/MainLayout.vue"

import { orders } from "../stores/orders"

</script>

<style scoped>

.orders{

padding:140px 0;

background:#f6f7f9;

min-height:100vh;

}

.subtitle{

margin-bottom:35px;

color:#777;

}

.order-card{

background:white;

padding:30px;

border-radius:20px;

margin-bottom:25px;

box-shadow:0 8px 20px rgba(0,0,0,.06);

}

.top{

display:flex;

justify-content:space-between;

margin-bottom:20px;

}

.product{

padding:8px 0;

color:#666;

}

.total{

margin-top:20px;

font-size:20px;

font-weight:700;

}

.empty{

text-align:center;

padding:80px 0;

}

.empty i{

font-size:70px;

color:#bbb;

margin-bottom:20px;

}

.shop-btn{

display:inline-block;

margin-top:25px;

padding:14px 30px;

background:var(--primary);

border-radius:50px;

font-weight:700;

color:#000;

text-decoration:none;

}

</style>