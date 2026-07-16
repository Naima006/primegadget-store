<template>

<section class="why">

<div class="container">

<div class="section-title">

<h2>Why Choose PrimeGadget?</h2>

<p>
Premium technology backed by quality service.
</p>

</div>

<div class="cards">

<div class="card">

<i class="bi bi-truck"></i>

<h3>Fast Delivery</h3>

<p>

Free nationwide delivery on every order.

</p>

</div>

<div class="card">

<i class="bi bi-shield-check"></i>

<h3>Secure Payment</h3>

<p>

100% encrypted checkout.

</p>

</div>

<div class="card">

<i class="bi bi-patch-check"></i>

<h3>Official Warranty</h3>

<p>

Authentic products with warranty.

</p>

</div>

<div class="card">

<i class="bi bi-headset"></i>

<h3>24/7 Support</h3>

<p>

Friendly customer support anytime.

</p>

</div>

</div>

</div>

</section>

</template>

<style scoped>

.why{

padding:50px 0;

background:white;

}

.section-title{

text-align:center;

margin-bottom:60px;

}

.section-title h2{

font-size:42px;

margin-bottom:10px;

}

.section-title p{

color:gray;

}

.cards{

display:grid;

grid-template-columns:repeat(4,1fr);

gap:30px;

}

.card{

padding:40px 30px;

border-radius:20px;

background:#fafafa;

transition:.35s;

text-align:center;

}

.card:hover{

transform:translateY(-10px);

box-shadow:0 15px 40px rgba(0,0,0,.08);

}

.card i{

font-size:42px;

color:var(--primary);

margin-bottom:20px;

}

.card h3{

margin-bottom:15px;

}

.card p{

color:#777;

}

@media(max-width:992px){

.cards{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:576px){

.cards{

grid-template-columns:1fr;

}

}

</style>