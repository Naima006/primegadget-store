<template>

<footer>

<div class="container footer">

<div>

<h2>PrimeGadget</h2>

<p>

Smart Technology. Smarter Living.

</p>

</div>

<div>

<h4>Quick Links</h4>

<a href="#">Home</a>

<a href="#">Shop</a>

<a href="#">About</a>

</div>

<div>

<h4>Support</h4>

<a href="#">Contact</a>

<a href="#">FAQ</a>

<a href="#">Privacy</a>

</div>

<div>

<h4>Follow</h4>

<div class="socials">

<i class="bi bi-facebook"></i>

<i class="bi bi-instagram"></i>

<i class="bi bi-twitter-x"></i>

</div>

</div>

</div>

<hr>

<p class="copyright">

© 2026 PrimeGadget. All Rights Reserved.

</p>

</footer>

</template>

<style scoped>

footer{

background:#111;

color:white;

padding:80px 0 20px;

}

.footer{

display:grid;

grid-template-columns:2fr 1fr 1fr 1fr;

gap:40px;

}

.footer h2{

margin-bottom:15px;

}

.footer h4{

margin-bottom:18px;

}

.footer a{

display:block;

margin-bottom:10px;

color:#bfbfbf;

}

.footer a:hover{

color:var(--primary);

}

.socials{

display:flex;

gap:15px;

font-size:22px;

}

.socials i{

cursor:pointer;

transition:.3s;

}

.socials i:hover{

color:var(--primary);

}

hr{

margin:50px 0 20px;

border-color:#2a2a2a;

}

.copyright{

text-align:center;

color:#999;

}

@media(max-width:900px){

.footer{

grid-template-columns:1fr 1fr;

}

}

@media(max-width:600px){

.footer{

grid-template-columns:1fr;

}

}

</style>