<template>

<transition name="toast">

<div
v-if="toast.show"
class="toast"
:class="toast.type"
>

{{ toast.message }}

</div>

</transition>

</template>

<script setup>

import { toast } from "../stores/toast"

</script>

<style scoped>

.toast{

position:fixed;

top:90px;

right:25px;

padding:16px 24px;

border-radius:15px;

font-weight:600;

color:white;

z-index:99999;

box-shadow:0 10px 30px rgba(0,0,0,.2);

}

.success{

background:#22c55e;

}

.error{

background:#ef4444;

}

.toast-enter-active,
.toast-leave-active{

transition:.35s;

}

.toast-enter-from{

opacity:0;

transform:translateX(100px);

}

.toast-leave-to{

opacity:0;

transform:translateX(100px);

}

@media(max-width:768px){

.toast{

left:15px;

right:15px;

top:80px;

text-align:center;

}

}

</style>