<template>
  <header class="navbar">

    <div class="container nav-wrapper">

      <RouterLink
        to="/"
        class="logo"
      >
        Prime<span>Gadget</span>
      </RouterLink>

      <nav>

        <RouterLink to="/">Home</RouterLink>

        <RouterLink to="/shop">Shop</RouterLink>

        <a href="#">Categories</a>

        <a href="#">About</a>

      </nav>

      <div class="actions">

        <button class="icon-btn">
          <i class="bi bi-search"></i>
        </button>

        <RouterLink
          class="icon-btn cart"
          to="/cart"
        >

          <i class="bi bi-cart3"></i>

          <span
            v-if="cart.items.length"
            class="badge"
          >

            {{ cart.items.length }}

          </span>

        </RouterLink>

        <RouterLink
          class="login-btn"
          to="/login"
        >

          Login

        </RouterLink>

      </div>

    </div>

  </header>

</template>

<script setup>

import { cart } from "../stores/cart"

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

.login-btn{

background:var(--primary);

padding:10px 22px;

border-radius:50px;

font-weight:600;

color:black;

}

.login-btn:hover{

transform:translateY(-2px);

}

</style>