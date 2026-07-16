<template>

<MainLayout>

<section class="auth">

<div class="container auth-grid">

<div class="left">

<span class="tag">

Premium Gadget Store

</span>

<h1>

Welcome Back

</h1>

<p>

Log in to access your orders, manage your profile, and continue shopping for the latest premium gadgets.

</p>

<img
src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900"
alt="Headphones"
/>

</div>

<div class="right">

<div class="card">

<h2>Login</h2>

<p>

Sign in to your PrimeGadget account

</p>

<form @submit.prevent="login">

<input
v-model="email"
type="email"
placeholder="Email Address"
required
/>

<input
v-model="password"
type="password"
placeholder="Password"
required
/>

<label class="remember">

<input type="checkbox">

Remember Me

</label>

<button>

Login

</button>

<RouterLink
to="/register"
class="register"
>

Don't have an account?

Create one

</RouterLink>

</form>

</div>

</div>

</div>

</section>

</MainLayout>

</template>

<script setup>

import { ref } from "vue"

import { useRouter } from "vue-router"

import MainLayout from "../layouts/MainLayout.vue"

const router = useRouter()

const email = ref("")

const password = ref("")

function login(){

localStorage.setItem("loggedIn","true")

localStorage.setItem("username","Naima Rahman")

router.push("/profile")

}

</script>

<style scoped>

.auth{

padding:140px 0 80px;

background:#0f1115;

min-height:100vh;

color:white;

}

.auth-grid{

display:grid;

grid-template-columns:1fr 1fr;

gap:70px;

align-items:center;

}

.tag{

display:inline-block;

background:rgba(255,255,255,.08);

padding:10px 18px;

border-radius:50px;

margin-bottom:25px;

}

.left h1{

font-size:60px;

line-height:1.1;

margin-bottom:20px;

}

.left p{

font-size:18px;

color:#bfbfbf;

margin-bottom:40px;

max-width:520px;

}

.left img{

width:100%;

max-width:500px;

border-radius:25px;

animation:float 4s ease-in-out infinite;

}

.card{

background:rgba(255,255,255,.06);

backdrop-filter:blur(20px);

border:1px solid rgba(255,255,255,.08);

padding:40px;

border-radius:30px;

}

.card h2{

font-size:36px;

margin-bottom:10px;

}

.card p{

color:#bfbfbf;

margin-bottom:30px;

}

input{

width:100%;

padding:16px;

margin-bottom:20px;

border-radius:15px;

border:1px solid #333;

background:#17191d;

color:white;

}

input:focus{

border-color:var(--primary);

outline:none;

}

.remember{

display:flex;

align-items:center;

gap:10px;

margin-bottom:25px;

}

.remember input{

width:auto;

margin:0;

}

button{

width:100%;

padding:16px;

border-radius:50px;

background:var(--primary);

font-weight:700;

transition:.3s;

}

button:hover{

transform:translateY(-3px);

}

.register{

display:block;

text-align:center;

margin-top:25px;

color:white;

}

@keyframes float{

0%,100%{

transform:translateY(0);

}

50%{

transform:translateY(-12px);

}

}

@media(max-width:900px){

.auth-grid{

grid-template-columns:1fr;

}

.left{

text-align:center;

}

.left img{

margin:auto;

}

}

</style>