<template>

<section class="hero">

<div class="container hero-grid">

<div class="hero-left">

<span class="tag">

NEW ARRIVAL

</span>

<h1>

IMMERSIVE SOUND

FOR THE DIGITAL

GENERATION

</h1>

<p>

Experience premium wireless technology with elegant design and crystal-clear audio.

</p>

<div class="buttons">

<button
  class="primary"
  @click="router.push('/shop')"
>
  Shop Now
</button>

<button
  class="secondary"
  @click="router.push('/about')"
>
  Explore
</button>

</div>

</div>

<div class="hero-right">

<img
src="../assets/images/hero-headphone.webp"
alt="Headphone"
/>

</div>

</div>

</section>

</template>
<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<style scoped>
.hero {
  background: #121212;
  padding-top: 140px;
  padding-bottom: 80px;
  color: white;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px; /* Added gap to prevent elements from touching */
}

.tag {
  display: inline-block;
  padding: 8px 18px;
  background: rgba(255, 255, 255, .08);
  border-radius: 50px;
  margin-bottom: 25px;
}

h1 {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 25px;
}

p {
  font-size: 18px;
  color: #c9c9c9;
  max-width: 480px;
  margin-bottom: 35px;
}

.buttons {
  display: flex;
  gap: 18px;
}

.primary,
.secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}

.primary {
  background: var(--primary);
  padding: 15px 34px;
  border-radius: 50px;
  font-weight: 700;
  border: none; /* Added to normalize button */
}

.secondary {
  background: transparent;
  border: 1px solid white;
  padding: 15px 34px;
  border-radius: 50px;
  color: white;
}

.hero-right {
  display: flex;
  justify-content: center;
}

.hero-right img {
  width: 100%; /* Changed to make fluid */
  max-width: 620px; /* Caps the width to your original design */
  height: auto; /* Maintains aspect ratio */
  transition: .4s;
}

.hero-right img:hover {
  transform: scale(1.05);
}

/* --- Responsive Media Queries --- */

/* Tablet & Smaller Desktop */
@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr; /* Stacks the content and image */
    text-align: center; /* Centers text for a better mobile look */
    gap: 60px;
  }

  h1 {
    font-size: 56px; /* Scales down the massive headline */
  }

  p {
    margin: 0 auto 35px; /* Centers the paragraph natively */
  }

  .buttons {
    justify-content: center; /* Centers the buttons */
  }
}

/* Mobile Devices */
@media (max-width: 576px) {
  .hero {
    padding-top: 110px;
    padding-bottom: 50px;
  }

  h1 {
    font-size: 42px; /* Scales down further for small screens */
  }

  .buttons {
    flex-direction: column; /* Stacks buttons on narrow screens */
    width: 100%;
  }

  .primary, 
  .secondary {
    width: 100%; /* Makes buttons full-width on mobile */
  }
}
</style>