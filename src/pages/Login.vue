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

<div class="password-field">
<input
v-model="password"
:type="showPassword ? 'text' : 'password'"
placeholder="Password"
required
autocomplete="current-password"
/>
<button type="button" class="toggle-pw" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
</button>
</div>

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
const showPassword = ref(false)
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
.auth {
  padding: 140px 0 80px;
  background: #0f1115;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
}

.auth-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.tag {
  display: inline-block;
  background: rgba(255, 255, 255, 0.08);
  padding: 10px 18px;
  border-radius: 50px;
  margin-bottom: 25px;
}

.left h1 {
  font-size: 60px;
  line-height: 1.1;
  margin-bottom: 20px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.left p {
  font-size: 18px;
  color: #bfbfbf;
  margin-bottom: 40px;
  max-width: 520px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.left img {
  width: 100%;
  max-width: 500px;
  border-radius: 25px;
  animation: float 4s ease-in-out infinite;
}

.card {
  background: rgba(255, 255, 255, 0.06);
  animation: fadeUp 0.7s ease;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 40px;
  border-radius: 30px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.card h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.card p {
  color: #bfbfbf;
  margin-bottom: 30px;
}

input {
  width: 100%;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 15px;
  border: 1px solid #333;
  background: #17191d;
  color: white;
  box-sizing: border-box;
  max-width: 100%;
}

input:focus {
  border-color: var(--primary);
  outline: none;
}

.password-field {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
}

.password-field input {
  width: 100%;
  padding: 16px 48px 16px 16px;
  margin-bottom: 0;
  border-radius: 15px;
  border: 1px solid #333;
  background: #17191d;
  color: white;
  box-sizing: border-box;
}

.password-field input:focus {
  border-color: var(--primary);
  outline: none;
}

.toggle-pw {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #888;
  font-size: 18px;
  padding: 4px;
  width: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
}

.toggle-pw:hover {
  color: var(--primary);
  transform: translateY(-50%);
  box-shadow: none;
}

.remember {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
}

.remember input {
  width: auto;
  margin: 0;
}

.divider {
  margin: 25px 0;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.or {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  color: #aaa;
  font-size: 14px;
}

.google-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

button {
  width: 100%;
  padding: 16px;
  border-radius: 50px;
  background: var(--primary);
  font-weight: 700;
  transition: 0.3s ease;
  box-sizing: border-box;
  max-width: 100%;
}

button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 25px rgba(152, 255, 0, 0.25);
}

.register {
  display: block;
  text-align: center;
  margin-top: 25px;
  color: var(--primary);
  font-weight: 600;
  transition: 0.3s;
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
  word-break: break-word;
  overflow-wrap: anywhere;
  box-sizing: border-box;
  max-width: 100%;
}

.admin-hint strong {
  color: var(--primary);
  font-weight: 600;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

/* Override global .container only inside auth — equal side padding */
.auth :deep(.container),
.auth .container {
  width: 100% !important;
  max-width: 1300px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  box-sizing: border-box !important;
}

.right {
  width: 100%;
  max-width: 100%;
  min-width: 0; /* critical: lets grid child shrink instead of overflow */
}

.left {
  min-width: 0;
}

/* Tablet */
@media (max-width: 992px) {
  .auth {
    padding: 110px 0 40px;
  }

  .auth-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .left {
    text-align: center;
  }

  .left img {
    display: none;
  }

  .left h1 {
    font-size: 42px;
  }

  .left p {
    font-size: 16px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8px;
  }

  .card {
    padding: 28px 22px;
    border-radius: 24px;
  }

  input,
  .password-field input {
    padding: 14px 16px;
    font-size: 15px;
  }

  .password-field input {
    padding-right: 48px;
  }

  button {
    padding: 15px;
  }
}

/* Phone */
@media (max-width: 576px) {
  .auth :deep(.container),
  .auth .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .auth {
    padding: 100px 0 28px;
  }

  .left h1 {
    font-size: 32px;
  }

  .left p {
    font-size: 14px;
  }

  .card {
    padding: 22px 16px;
    border-radius: 20px;
  }

  .card h2 {
    font-size: 26px;
  }

  .tag {
    font-size: 12px;
    padding: 7px 12px;
  }

  .admin-hint {
    font-size: 12px;
    padding: 9px 12px;
  }
}

/* Very narrow (< 445) — the breakpoint that was breaking */
@media (max-width: 445px) {
  .auth :deep(.container),
  .auth .container {
    padding-left: 14px !important;
    padding-right: 14px !important;
  }

  .card {
    padding: 18px 14px;
  }

  .left h1 {
    font-size: 28px;
  }

  input,
  .password-field input {
    font-size: 14px;
    padding: 13px 14px;
  }

  .password-field input {
    padding-right: 44px;
  }
}
</style>
