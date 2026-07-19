<template>
  <header class="navbar">
    <div class="container nav-wrapper">

      <button class="menu-btn" @click="toggleMenu">
        <i :class="mobileMenu ? 'bi bi-x-lg' : 'bi bi-list'"></i>
      </button>

      <RouterLink to="/" class="logo" @click="closeMenu">
        Prime<span>Gadget</span>
      </RouterLink>

      <nav :class="{ active: mobileMenu }">
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/shop" @click="closeMenu">Shop</RouterLink>
        <RouterLink to="/about" @click="closeMenu">About</RouterLink>
      </nav>

      <div class="actions">
        
        <RouterLink class="icon-btn cart" to="/cart">
          <i class="bi bi-cart3"></i>
          <span v-if="cart.items.length" class="badge">
            {{ cart.items.length }}
          </span>
        </RouterLink>

        <RouterLink class="login-btn" to="/profile">
          <i class="bi bi-person-circle"></i>
          <span>Profile</span>
        </RouterLink>

        </div>
    </div>

    <div v-if="mobileMenu" class="overlay" @click="toggleMenu"></div>
    
  </header>
</template>

<script setup>

import { ref } from "vue"
import { cart } from "../stores/cart"


const mobileMenu = ref(false)

function toggleMenu(){

    mobileMenu.value = !mobileMenu.value

}

function closeMenu(){

    mobileMenu.value = false

}

</script>

<style scoped>

.navbar{

position:fixed;

top:0;

left:0;

width:100%;

z-index:999;

background:rgba(18,18,18,.88);

backdrop-filter:blur(18px);

padding:18px 0;

}

.nav-wrapper{

display:flex;

justify-content:space-between;

align-items:center;

}

.logo{

font-size:30px;

font-weight:800;

color:white;

}

.logo span{

color:var(--primary);

}

nav{

display:flex;

gap:35px;

}

nav a{

color:white;

font-weight:500;

transition:.3s;

}

nav a.router-link-active{

color:var(--primary);

}

nav a:hover{

color:var(--primary);

}

.actions{

display:flex;

align-items:center;

gap:15px;

}

.icon-btn{

position:relative;

background:none;

color:white;

font-size:22px;

}

.badge{

position:absolute;

top:-8px;

right:-8px;

background:var(--primary);

color:black;

width:20px;

height:20px;

border-radius:50%;

font-size:12px;

display:flex;

justify-content:center;

align-items:center;

font-weight:700;

}

.login-btn {
  background: var(--primary);
  padding: 10px 22px;
  border-radius: 50px;
  font-weight: 600;
  color: black;
  /* Add the following 3 lines: */
  display: flex;
  align-items: center;
  gap: 8px; /* Adjust this value to increase/decrease the space */
}

.login-btn:hover{

transform:translateY(-2px);

}

.menu-btn{

display:none;

background:none;

color:white;

font-size:30px;

}

@media(max-width:992px){

.menu-btn{

display:block;

z-index:1002;

}

nav{

position:fixed;

top:0;

left:-280px;

width:260px;

height:100vh;

background:#111;

padding:120px 30px;

display:flex;

flex-direction:column;

gap:30px;

transition:.35s;

z-index:1001;

}

nav.active{

left:0;

}

.overlay{

position:fixed;

top:0;

left:0;

width:100%;

height:100vh;

background:rgba(0,0,0,.45);

backdrop-filter:blur(4px);

z-index:1000;

}

.actions{

gap:12px;

}

.login-btn span {
    display: none;
  }

  .login-btn {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Add the following two lines to fix the stretching: */
    padding: 0; 
    width: 42px; 
    height: 42px;
  }
}

@media(max-width:576px){

.logo{

font-size:24px;

}

.actions{

gap:8px;

}

.icon-btn{

font-size:20px;

}

}

</style>