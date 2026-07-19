<template>

<MainLayout>

<section class="checkout">

<div class="container">

<div class="title">

<h1>Checkout</h1>

<p>Complete your order information.</p>

</div>

<div class="checkout-grid">

<div class="form-section">

<h2>Customer Information</h2>

<input
v-model="customer.name"
placeholder="Full Name"
/>

<input
v-model="customer.email"
placeholder="Email"
/>

<input
v-model="customer.phone"
placeholder="Phone Number"
/>

<textarea
v-model="customer.address"
placeholder="Delivery Address"
></textarea>

<h2>Payment Method</h2>

<label>

<input
type="radio"
value="Cash on Delivery"
v-model="customer.payment"
/>

Cash on Delivery

</label>

<label>

<input
type="radio"
value="Card"
v-model="customer.payment"
/>

Credit / Debit Card

</label>

<label>

<input
type="radio"
value="Bkash"
v-model="customer.payment"
/>

Bkash

</label>

<button
class="place-order"
@click="placeOrder"
>

Place Order

</button>

</div>

<div class="summary">

<h2>Order Summary</h2>

<div
v-for="item in cart.items"
:key="item.id"
class="summary-item"
>

<span>

{{ item.name }}

x{{ item.quantity }}

</span>

<span>

${{ item.price * item.quantity }}

</span>

</div>

<hr>

<div class="total">

<span>Total</span>

<span>${{ total }}</span>

</div>

</div>

</div>

</div>

</section>

</MainLayout>

</template>

<script setup>

import { reactive, computed } from "vue"

import { useRouter } from "vue-router"

import MainLayout from "../layouts/MainLayout.vue"

import { cart } from "../stores/cart"

import { addOrder } from "../stores/orders"

import { toast } from "../stores/toast"

const router = useRouter()

const customer = reactive({

name:"",

email:"",

phone:"",

address:"",

payment:"Cash on Delivery"

})

const total = computed(()=>{

return cart.items.reduce(

(sum,item)=>

sum + item.price*item.quantity

,0)

})

function placeOrder() {

    if (
        !customer.name ||
        !customer.email ||
        !customer.phone ||
        !customer.address
    ) {

        toast.open("Please complete all fields.", "error")

        return

    }

    addOrder({

        id: Date.now(),

        customer: { ...customer },

        items: [...cart.items],

        total: total.value,

        date: new Date().toLocaleString()

    })

    toast.open("Order placed successfully!", "success")

    cart.items = []

    localStorage.removeItem("cart")

    router.push("/profile")

}
</script>

<style scoped>

.checkout{

padding:140px 0;

background:#f6f7f9;

}

.title{

margin-bottom:40px;

}


.checkout-grid{

display:grid;

grid-template-columns:2fr 1fr;

gap:40px;

}

.form-section{

background:white;

padding:35px;

border-radius:20px;

}

.form-section h2{
    padding-bottom: 25px;
}

.form-section input,

.form-section textarea{

width:100%;

padding:15px;

margin-bottom:20px;

border:1px solid #ddd;

border-radius:12px;

}

textarea{

height:120px;

resize:none;

}

label {
    display: flex;      
    align-items: center; 
    gap: 12px;
    margin-bottom: 20px;
    cursor: pointer;
}

/* Optional: Ensure the radio button doesn't shrink */
label input[type="radio"] {
    width: auto;
    margin-bottom: 0;
}

.place-order{

margin-top:25px;

width:100%;

padding:16px;

background:var(--primary);

border-radius:50px;

font-weight:700;

}

.summary{

background:white;

padding:30px;

border-radius:20px;

height:fit-content;

position:sticky;

top:120px;

}

.summary-item{

display:flex;

justify-content:space-between;

margin:15px 0;

}

.total{

display:flex;

justify-content:space-between;

font-size:22px;

font-weight:700;

margin-top:20px;

}

@media(max-width:900px){

.checkout-grid{

grid-template-columns:1fr;

}

.summary{

position:static;

}

}

</style>