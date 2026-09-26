<template>

<section class="products">

<div class="container">

<div class="heading">

<h2>{{ title }}</h2>

<p>{{ subtitle }}</p>

</div>

<div class="toolbar">

    <input
    v-model="search"
    placeholder="Search gadgets..."
    >

    <select v-model="category">
      <option value="All">All</option>
      <option
        v-for="c in productsStore.categories"
        :key="c.id"
        :value="c.name"
      >
        {{ c.name }}
      </option>
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
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import ProductCard from "./ProductCard.vue"
import { products as productsStore } from "../stores/products"
import { addToCart } from "../stores/cart"

const props = defineProps({
  title: {
    type: String,
    default: "Featured Products",
  },
  subtitle: {
    type: String,
    default: "Premium gadgets carefully selected for you.",
  },
})

const route = useRoute()
const search = ref("")
const category = ref("All")

onMounted(() => {
  if (route.query.category) {
    category.value = route.query.category
  }
})

const filteredProducts = computed(() => {
  return productsStore.items.filter((product) => {
    const keyword = search.value.toLowerCase()
    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    const matchesCategory =
      category.value === "All" || product.category === category.value
    return matchesSearch && matchesCategory
  })
})
</script>

<style scoped>

.products{

padding:50px 0;

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

input, select {
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid #ddd;
    font-size: 16px;
}

/* 1. Target the input specifically to make it wider */
input {
    flex: 1; /* Allows the search bar to stretch */
    max-width: 1200px; /* Prevents it from getting too massive on ultra-wide screens */
    width: 100%;
}

/* The select box will naturally just take up the space it needs for its text */

/* 2. Make it responsive on smaller screens */
@media (max-width: 576px) {
    .toolbar {
        flex-direction: column; /* Stacks the search bar and category dropdown */
    }
    
    input {
        max-width: 100%; /* Spans the full width of the mobile screen */
    }
    
    select {
        width: 100%; /* Makes the dropdown full width on mobile as well */
    }
}

.grid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(260px,1fr));

gap:30px;

}

</style>