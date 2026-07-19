<template>

<MainLayout>

<section class="profile-page">

<div class="container">

<div class="profile-header">

    <div class="avatar">

        <i class="bi bi-person-circle"></i>

    </div>

    <div class="profile-info">

        <h1>

            {{ auth.isLoggedIn ? auth.currentUser?.name : "Welcome Guest 👋" }}

        </h1>

        <p>

            {{ auth.isLoggedIn
            ? auth.currentUser?.email
            : "Browse products, add items to your cart, or create an account for a personalized shopping experience." }}

        </p>

        <span
            v-if="auth.isLoggedIn"
            class="provider"
        >

            {{ auth.currentUser.provider || "Local Account" }}

        </span>

    </div>

    <div class="header-actions">

        <button
            v-if="auth.isLoggedIn"
            class="logout-btn"
            @click="logout"
        >

            <i class="bi bi-box-arrow-right"></i>

            Logout

        </button>

        <template v-else>

            <RouterLink
                to="/login"
                class="action-btn"
            >

                Login

            </RouterLink>

            <RouterLink
                to="/register"
                class="action-btn primary"
            >

                Register

            </RouterLink>

        </template>

    </div>

</div>

<div
    v-if="auth.isLoggedIn"
    class="summary-grid"
>

    <div class="summary-card">

        <h2>Orders</h2>

        <span>{{ orders.items.length }}</span>

    </div>

    <div class="summary-card">

        <h2>Cart Items</h2>

        <span>{{ cart.items.length }}</span>

    </div>

    <div class="summary-card">

        <h2>Account</h2>

        <span>

            {{ auth.currentUser?.provider || "Local Account" }}
        </span>

    </div>

</div>

<div class="dashboard-grid">

<!-- Orders -->

<RouterLink
v-if="auth.isLoggedIn"
to="/orders"
class="dashboard-card"
>

<div class="icon">

<i class="bi bi-box-seam"></i>

</div>

<h3>My Orders</h3>

<p>

Track all your placed orders.

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

import { auth } from "../stores/auth"
import { cart } from "../stores/cart"
import { orders } from "../stores/orders"
import { useRouter } from "vue-router"

const router = useRouter()

function logout(){

    auth.logout()

    router.push("/login")

}
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


.profile-info{

flex:1;

}

.header-actions{

display:flex;

gap:15px;

margin-left:auto;

}

.action-btn{

padding:12px 22px;

border-radius:50px;

background:#111;

color:white;

transition:.3s;

}

.action-btn.primary{

background:var(--primary);

color:#111;

}

.action-btn:hover{

transform:translateY(-2px);

}

.summary-grid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(220px,1fr));

gap:25px;

margin-bottom:40px;

}

.summary-card{

background:white;

padding:30px;

border-radius:20px;

box-shadow:0 10px 25px rgba(0,0,0,.06);

transition:.3s;

}

.summary-card:hover{

transform:translateY(-6px);

}

.summary-card h2{

font-size:18px;

margin-bottom:10px;

}

.summary-card span{

font-size:34px;

font-weight:700;

color:var(--primary);

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

.provider{

display:inline-block;

margin-top:8px;

padding:6px 14px;

border-radius:50px;

background:var(--primary);

font-size:13px;

font-weight:600;

color:#111;

}

.logout-btn{

margin-left:auto;

padding:12px 22px;

border-radius:50px;

background:#111;

color:white;

transition:.3s;

}

.logout-btn:hover{

background:#333;

}

@media(max-width:768px){

.profile-header{

flex-direction:column;

text-align:center;

}

.header-actions{

margin:20px 0 0;

justify-content:center;

flex-wrap:wrap;

}

.summary-grid{

grid-template-columns:1fr;

}

.dashboard-grid{

grid-template-columns:1fr;

}

}

</style>