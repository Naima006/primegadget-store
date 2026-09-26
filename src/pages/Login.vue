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
src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900"
alt="Headphones"
/>

</div>

<div class="right">

<div class="card">

<h2>Login</h2>

<p>
  Sign in to your PrimeGadget account
</p>
<p class="admin-hint">
  Admin demo: <strong>admin@primegadget.com</strong> / <strong>admin123</strong>
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

<hr class="divider">

<div class="or">
    <span>OR</span>
</div>

<div class="google-wrapper">

<GoogleLogin />

</div>

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
import GoogleLogin from "../components/GoogleLogin.vue"
import MainLayout from "../layouts/MainLayout.vue"
import { toast } from "../stores/toast"
import { onMounted } from "vue"
import { auth } from "../stores/auth"

const router = useRouter()

const email = ref("")
const password = ref("")
const loading = ref(false)

onMounted(() => {
  if (auth.isLoggedIn) {
    router.push(auth.isAdmin ? "/admin" : "/profile")
  }
})

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || "").trim())
}

function login() {
  const em = email.value.trim()
  const pw = password.value

  if (!em) {
    toast.open("Please enter your email.", "error")
    return
  }
  if (!isValidEmail(em)) {
    toast.open("Please enter a valid email address.", "error")
    return
  }
  if (!pw) {
    toast.open("Please enter your password.", "error")
    return
  }

  loading.value = true
  const result = auth.userLogin(em, pw)
  loading.value = false

  if (!result.success) {
    toast.open("Invalid email or password.", "error")
    return
  }

  const name = auth.currentUser?.name || "User"
  toast.open("Welcome back, " + name + "!")

  if (result.isAdmin) {
    router.push("/admin")
  } else {
    router.push("/profile")
  }
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

animation:fadeUp .7s ease;

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

.divider{

margin:25px 0;

border:none;

border-top:1px solid rgba(255,255,255,.08);

}

.or{

display:flex;

justify-content:center;

margin-bottom:25px;

color:#aaa;

font-size:14px;

}


.google-wrapper{

display:flex;

justify-content:center;

margin-bottom:20px;

}

button{

width:100%;

padding:16px;

border-radius:50px;

background:var(--primary);

font-weight:700;

transition:.3s ease;

}

button:hover{

transform:translateY(-3px) scale(1.02);

box-shadow:0 10px 25px rgba(152,255,0,.25);

}

.register{
  display: block;
  text-align: center;
  margin-top: 25px;
  color: var(--primary);
  font-weight: 600;
  transition: .3s;
}

.admin-hint {
  font-size: 13px;
  color: #9a9a9a;
  background: rgba(198, 255, 74, 0.08);
  border: 1px solid rgba(198, 255, 74, 0.25);
  border-radius: 10px;
  padding: 10px 14px;
  margin: 12px 0 18px;
  line-height: 1.45;
}

.admin-hint strong {
  color: var(--primary);
  font-weight: 600;
}


@keyframes fadeUp{

from{

opacity:0;

transform:translateY(30px);

}

to{

opacity:1;

transform:translateY(0);

}

}

@keyframes float{

0%,100%{

transform:translateY(0);

}

50%{

transform:translateY(-12px);

}

}

@media (max-width: 992px){

.auth{

padding:110px 20px 40px;

}

.auth-grid{

grid-template-columns:1fr;

gap:35px;

}

.left{

text-align:center;

}

/* Hide the illustration on tablets & phones */

.left img{

display:none;

}

/* Reduce heading size */

.left h1{

font-size:42px;

}

/* Reduce paragraph size */

.left p{

font-size:16px;

max-width:100%;

margin-bottom:25px;

}

/* Make form card full width */

.card{

width:100%;

padding:30px;

border-radius:24px;

}

/* Slightly smaller inputs */

input{

padding:14px;

font-size:15px;

}

button{

padding:15px;

}

}

@media (max-width:576px){

.auth{

padding:95px 15px 30px;

}

.left h1{

font-size:34px;

}

.card{

padding:24px;

}

.card h2{

font-size:30px;

}

.tag{

font-size:13px;

padding:8px 14px;

}

}

.left h1, 
.left p {
  word-wrap: break-word; /* Allows long words to break onto the next line */
  overflow-wrap: break-word; /* Modern version of word-wrap */
  max-width: 100%; /* Ensures text never exceeds its parent container */
}

@media (max-width: 460px) {
  .left h1 {
    font-size: 28px; /* Slightly smaller for very narrow screens */
    line-height: 1.2;
  }
  
  .left p {
    font-size: 14px; /* Slightly smaller for very narrow screens */
    margin-bottom: 20px;
  }

  .auth-grid {
    max-width: 95%; /* Use more available screen space */
  }
}

.auth {
  overflow-x: hidden; /* Ensures the section itself doesn't overflow */
}

.auth-grid {
  width: 100%;
  max-width: 90%; /* Keeps it within bounds */
  margin: 0 auto;
}

@media (max-width: 460px) {
  .card {
    padding: 20px; /* Further reduce padding for tiny screens */
  }
  
  .auth {
    padding-left: 10px;
    padding-right: 10px;
  }
}


</style>