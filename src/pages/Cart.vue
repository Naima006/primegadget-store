<template>

<Navbar />

<div class="container">

<h1>Shopping Cart</h1>

<div
v-if="cart.items.length"
>

<div
class="item"
v-for="item in cart.items"
:key="item.id"
>

<img
:src="item.image"
>

<div>

<h3>{{ item.name }}</h3>

<p>${{ item.price }}</p>

</div>

<div class="quantity">

<button
@click="decreaseQuantity(item.id)"
>

-

</button>

<span>

{{ item.quantity }}

</span>

<button
@click="increaseQuantity(item.id)"
>

+

</button>

</div>

<button
class="delete"

@click="removeFromCart(item.id)"
>

Remove

</button>

</div>

</div>

<p v-else>

Your cart is empty.

</p>

</div>

</template>

<script setup>

import Navbar from "../components/Navbar.vue"

import {

cart,

removeFromCart,

increaseQuantity,

decreaseQuantity

}

from "../stores/cart"

</script>

<style scoped>

.container{

padding:120px 0;

width:90%;

margin:auto;

}

.item{

display:flex;

justify-content:space-between;

align-items:center;

padding:20px;

margin-bottom:20px;

background:white;

border-radius:20px;

}

img{

width:120px;

height:120px;

object-fit:contain;

}

.quantity{

display:flex;

gap:15px;

align-items:center;

}

.quantity button{

width:40px;

height:40px;

border-radius:50%;

background:var(--primary);

}

.delete{

background:red;

color:white;

padding:10px 18px;

border-radius:10px;

}

</style>