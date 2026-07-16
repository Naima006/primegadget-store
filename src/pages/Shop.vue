<template>

<MainLayout>

<ShopHero />

<FeaturedProducts
title="Featured Products"
subtitle="Premium gadgets carefully selected for you."
/>

</MainLayout>

</template>

<script setup>

import MainLayout from "../layouts/MainLayout.vue"

import ShopHero from "../components/ShopHero.vue"

import FeaturedProducts from "../components/FeaturedProducts.vue"

</script>