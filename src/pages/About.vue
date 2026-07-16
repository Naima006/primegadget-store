<template>

<MainLayout>

<section class="about">

  <div class="container">

    <div class="hero">

      <span class="tag">
        About PrimeGadget
      </span>

      <h1>
        Smart Technology.<br>
        Smarter Living.
      </h1>

      <p>
        PrimeGadget is a modern gadget store built with Vue.js,
        offering premium electronics, accessories, and smart
        devices with an elegant shopping experience.
      </p>

    </div>

    <div class="features">

      <div class="feature-card">

        <i class="bi bi-lightning-charge-fill"></i>

        <h3>Latest Technology</h3>

        <p>
          Discover the newest gadgets from leading brands.
        </p>

      </div>

      <div class="feature-card">

        <i class="bi bi-shield-check"></i>

        <h3>Trusted Quality</h3>

        <p>
          Carefully selected premium products for every customer.
        </p>

      </div>

      <div class="feature-card">

        <i class="bi bi-truck"></i>

        <h3>Fast Delivery</h3>

        <p>
          Reliable delivery with secure packaging.
        </p>

      </div>

    </div>

  </div>

</section>

</MainLayout>

</template>

<script setup>

import MainLayout from "../layouts/MainLayout.vue"

</script>

<style scoped>

.about{

padding:140px 0 80px;

background:#f6f7f9;

min-height:100vh;

}

.hero{

text-align:center;

max-width:850px;

margin:auto;

margin-bottom:70px;

}

.tag{

display:inline-block;

background:var(--primary);

padding:8px 20px;

border-radius:50px;

font-weight:600;

margin-bottom:20px;

}

.hero h1{

font-size:56px;

font-weight:800;

margin-bottom:25px;

line-height:1.2;

}

.hero p{

font-size:18px;

color:#666;

line-height:1.8;

}

.features{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(260px,1fr));

gap:30px;

}

.feature-card{

background:white;

padding:35px;

border-radius:22px;

text-align:center;

box-shadow:0 10px 30px rgba(0,0,0,.06);

transition:.35s;

}

.feature-card:hover{

transform:translateY(-10px);

}

.feature-card i{

font-size:50px;

color:var(--primary);

margin-bottom:20px;

}

.feature-card h3{

margin-bottom:15px;

}

.feature-card p{

color:#666;

}

@media(max-width:768px){

.hero h1{

font-size:42px;

}

}

</style>