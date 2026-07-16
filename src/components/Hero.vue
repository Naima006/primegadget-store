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

<button class="primary">

Shop Now

</button>

<button class="secondary">

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

<style scoped>

.hero{

background:#121212;

padding-top:140px;

padding-bottom:80px;

color:white;

overflow:hidden;

}

.hero-grid{

display:grid;

grid-template-columns:1fr 1fr;

align-items:center;

}

.tag{

display:inline-block;

padding:8px 18px;

background:rgba(255,255,255,.08);

border-radius:50px;

margin-bottom:25px;

}

h1{

font-size:72px;

font-weight:800;

line-height:1.05;

margin-bottom:25px;

}

p{

font-size:18px;

color:#c9c9c9;

max-width:480px;

margin-bottom:35px;

}

.buttons{

display:flex;

gap:18px;

}

.primary{

background:var(--primary);

padding:15px 34px;

border-radius:50px;

font-weight:700;

}

.secondary{

background:transparent;

border:1px solid white;

padding:15px 34px;

border-radius:50px;

color:white;

}

.hero-right{

display:flex;

justify-content:center;

}

.hero-right img{

width:620px;

transition:.4s;

}

.hero-right img:hover{

transform:scale(1.05);

}

</style>