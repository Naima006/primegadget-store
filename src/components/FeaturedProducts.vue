<template>

<section class="products">

<div class="container">

<div class="heading">

<h2>Featured Products</h2>

<p>Premium gadgets carefully selected for you.</p>

</div>

<div class="toolbar">

<input
v-model="search"
placeholder="Search gadgets..."
>

<select v-model="category">

<option>All</option>

<option>Headphones</option>

<option>Earbuds</option>

<option>Laptop</option>

<option>Phone</option>

<option>Watch</option>

<option>Accessories</option>

</select>

</div>

<div class="grid">

<ProductCard
v-for="product in filteredProducts"
:key="product.id"
:product="product"
@add-cart="addToCart"
/>

</div>

</div>

</section>

</template>

<script setup>

import { ref, computed } from "vue"

import ProductCard from "./ProductCard.vue"

import products from "../assets/data/products.json"

import { addToCart } from "../stores/cart";

const search = ref("")

const category = ref("All")

const filteredProducts = computed(() => {

return products.filter(product=>{

const matchesSearch=product.name.toLowerCase().includes(search.value.toLowerCase())

const matchesCategory=category.value==="All"||product.category===category.value

return matchesSearch&&matchesCategory

})

})


</script>

<style scoped>

.products{

padding:100px 0;

}

.heading{

text-align:center;

margin-bottom:50px;

}

.heading h2{

font-size:42px;

margin-bottom:10px;

}

.heading p{

color:gray;

}

.toolbar{

display:flex;

justify-content:space-between;

margin-bottom:40px;

gap:20px;

}

input,select{

padding:14px 18px;

border-radius:12px;

border:1px solid #ddd;

font-size:16px;

}

.grid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(260px,1fr));

gap:30px;

}

</style>