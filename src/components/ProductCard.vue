<template>
  <div class="product-card">

    <img :src="product.image" :alt="product.name">

    <span>{{ product.category }}</span>

    <h3>{{ product.name }}</h3>

    <h4>${{ product.price }}</h4>

    <div class="actions">

        <div class="stepper">

            <button @click="decrease">

            −

            </button>

            <span>

            {{ quantity }}

            </span>

            <button @click="increase">

            +

            </button>

        </div>

        <button
        class="cart-btn"
        @click="handleAdd"
        >

        Add to Cart

        </button>

    </div>

    <Transition name="fade">

    <p
    v-if="added"
    class="success"
    >

    ✓ Added to Cart

    </p>

    </Transition>

  </div>
</template>

<script setup>

import { ref } from "vue"

import { addToCart } from "../stores/cart"

const props = defineProps({
    product: Object
})

const quantity = ref(1)

const added = ref(false)

function increase(){

    quantity.value++

}

function decrease(){

    if(quantity.value>1){

        quantity.value--

    }

}

function handleAdd(){

    for(let i=0;i<quantity.value;i++){

        addToCart(props.product)

    }

    added.value=true

    setTimeout(()=>{

        added.value=false

    },1500)

}

</script>

<style scoped>

h3{
    margin:5px 0;
    min-height:56px;
    display:flex;
    align-items:center;
    font-size:20px;
    font-weight:700;
}

.product-card{
    background:white;
    border-radius:24px;
    padding:24px;
    display:flex;
    flex-direction:column;
    height:100%;
    transition:.35s;
    box-shadow:0 10px 25px rgba(0,0,0,.08);
    overflow:hidden;
    position:relative;
}

.product-card:hover{

transform:translateY(-12px);

box-shadow:0 20px 50px rgba(0,0,0,.14);

}

.product-card img{
    width:100%;
    height:220px;
    object-fit:contain;
    display:block;
    transition:.4s;
    margin-bottom:18px;
}

.product-card:hover img{

transform:scale(1.08);

}

.actions{
    margin-top:auto;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
}

.stepper{

display:flex;

align-items:center;

background:#f4f4f4;

border-radius:50px;

padding:5px;

}

.stepper button{

width:34px;

height:34px;

border-radius:50%;

background:white;

font-size:18px;

font-weight:bold;

transition:.25s;

}

.stepper button:hover{

background:var(--primary);

}

.stepper span{

width:35px;

text-align:center;

font-weight:700;

}

.cart-btn{

flex:1;

padding:12px;

border-radius:50px;

background:var(--primary);

font-weight:700;

transition:.3s;

}

.cart-btn:hover{

transform:translateY(-2px);

}

.cart-btn:active{

transform:scale(.95);

}

.success{
    min-height:24px;
    margin-top:12px;
    color:#1a9b3d;
    font-weight:600;
}

.fade-enter-active,

.fade-leave-active{

transition:.3s;

}

.fade-enter-from,

.fade-leave-to{

opacity:0;

transform:translateY(8px);

}

</style>