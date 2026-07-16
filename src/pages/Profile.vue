<template>

<MainLayout>

<section class="profile-page">

<div class="container">

<div class="profile-header">

<div class="avatar">

<i class="bi bi-person-circle"></i>

</div>

<div>

<h1>My Account</h1>

<p>Welcome to your PrimeGadget dashboard.</p>

</div>

</div>

<div class="dashboard-grid">

<!-- Orders -->

<RouterLink
to="/orders"
class="dashboard-card"
>

<div class="icon">

<i class="bi bi-box-seam"></i>

</div>

<h3>My Orders</h3>

<p>

View all your placed orders.

</p>

</RouterLink>

<!-- Wishlist -->

<div class="dashboard-card disabled">

<div class="icon">

<i class="bi bi-heart"></i>

</div>

<h3>Wishlist</h3>

<p>

Coming Soon

</p>

</div>

<!-- Settings -->

<div class="dashboard-card disabled">

<div class="icon">

<i class="bi bi-gear"></i>

</div>

<h3>Settings</h3>

<p>

Coming Soon

</p>

</div>

<!-- About -->

<div class="dashboard-card disabled">

<div class="icon">

<i class="bi bi-info-circle"></i>

</div>

<h3>About PrimeGadget</h3>

<p>

Version 1.0

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

.profile-page{

padding:140px 0 80px;

background:#f6f7f9;

min-height:100vh;

}

.profile-header{

display:flex;

align-items:center;

gap:25px;

margin-bottom:50px;

}

.avatar{

font-size:80px;

color:var(--primary);

}

.dashboard-grid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(260px,1fr));

gap:30px;

}

.dashboard-card{

background:white;

padding:35px;

border-radius:22px;

text-decoration:none;

color:#222;

transition:.35s;

box-shadow:0 10px 25px rgba(0,0,0,.06);

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

text-align:center;

min-height:220px;

}

.dashboard-card:hover{

transform:translateY(-10px);

box-shadow:0 18px 45px rgba(0,0,0,.12);

}

.icon{

font-size:50px;

margin-bottom:20px;

color:var(--primary);

}

.dashboard-card h3{

margin-bottom:10px;

}

.dashboard-card p{

color:#777;

}

.disabled{

opacity:.65;

cursor:not-allowed;

}

.disabled:hover{

transform:none;

box-shadow:0 10px 25px rgba(0,0,0,.06);

}

</style>