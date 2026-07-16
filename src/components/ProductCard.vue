<template>
  <div class="product-card">

    <img :src="product.image" :alt="product.name">

    <span>{{ product.category }}</span>

    <h3>{{ product.name }}</h3>

    <h4>${{ product.price }}</h4>

    <button @click="$emit('add-cart', product)">
      Add to Cart
    </button>

  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>

<style scoped>

.product-card{

background:white;

padding:20px;

border-radius:20px;

box-shadow:0 10px 30px rgba(0,0,0,.08);

transition:.35s;

}

.product-card:hover{

transform:translateY(-8px);

}

img{

height:220px;

width:100%;

object-fit:contain;

}

span{

color:gray;

font-size:14px;

}

h3{

margin:10px 0;

}

h4{

margin-bottom:20px;

}

button{

background:var(--primary);

padding:12px 25px;

border-radius:30px;

font-weight:600;

}

</style>