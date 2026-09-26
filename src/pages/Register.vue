<template>

<MainLayout>

<section class="auth">

<div class="container auth-grid">

<div class="left">

<span class="tag">

Premium Gadget Store

</span>

<h1>

Create Your Account

</h1>

<p>

Join PrimeGadget to discover premium gadgets,
track your orders, and enjoy a seamless shopping
experience.

</p>

<img
src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
alt="Register"
/>

</div>

<div class="right">

<div class="card">

<h2>Create Account</h2>

<p>

Sign up and start shopping today.

</p>

<form @submit.prevent="registerUser">

<input
v-model="name"
type="text"
placeholder="Full Name"
required
/>

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

<input
v-model="confirmPassword"
type="password"
placeholder="Confirm Password"
required
/>

<button>

Create Account

</button>

<hr class="divider">

<div class="or">

<span>OR</span>

</div>

<div class="google-wrapper">

<GoogleLogin />

</div>

<RouterLink
to="/login"
class="register"
>

Already have an account?

Login

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
import { auth, ADMIN_EMAIL } from "../stores/auth"

const router = useRouter()

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const errors = ref({})

onMounted(() => {
  if (auth.isLoggedIn) {
    router.push(auth.isAdmin ? "/admin" : "/profile")
  }
})

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validate() {
  const e = {}
  const n = name.value.trim()
  const em = email.value.trim().toLowerCase()
  const pw = password.value
  const cpw = confirmPassword.value

  if (n.length < 2) {
    e.name = "Name must be at least 2 characters."
  } else if (n.length > 50) {
    e.name = "Name is too long."
  }

  if (!em) {
    e.email = "Email is required."
  } else if (!isValidEmail(em)) {
    e.email = "Please enter a valid email address."
  } else if (auth.isReservedAdminEmail(em)) {
    e.email = "This email is reserved for the store owner. Please use a different email."
  }

  if (!pw) {
    e.password = "Password is required."
  } else if (pw.length < 6) {
    e.password = "Password must be at least 6 characters."
  } else if (pw.length > 64) {
    e.password = "Password is too long."
  }

  if (!cpw) {
    e.confirmPassword = "Please confirm your password."
  } else if (pw !== cpw) {
    e.confirmPassword = "Passwords do not match."
  }

  errors.value = e
  return Object.keys(e).length === 0
}

function registerUser() {
  if (!validate()) {
    const first = Object.values(errors.value)[0]
    toast.open(first, "error")
    return
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const em = email.value.trim().toLowerCase()
  const n = name.value.trim()

  if (users.some((u) => (u.email || "").toLowerCase() === em)) {
    errors.value = { email: "Email already registered." }
    toast.open("Email already registered. Please login instead.", "error")
    return
  }

  const newUser = {
    id: Date.now(),
    name: n,
    email: em,
    password: password.value,
    provider: "local",
    role: "user",
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))

  toast.open("Account created successfully! Please login.")
  router.push("/login")
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

animation:fadeUp .7s ease;

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

display:block;

text-align:center;

margin-top:25px;

color:var(--primary);

font-weight:600;

transition:.3s;

}

.register:hover{

opacity:.8;

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