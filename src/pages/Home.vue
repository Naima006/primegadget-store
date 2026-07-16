<template>

<MainLayout>

<Hero />

<Categories />

<FeaturedProducts
title="Featured Products"
subtitle="Premium gadgets carefully selected for you."
/>

<WhyChoose />

</MainLayout>

</template>

<script setup>

import MainLayout from "../layouts/MainLayout.vue"

import Hero from "../components/Hero.vue"

import FeaturedProducts from "../components/FeaturedProducts.vue"

import WhyChoose from "../components/WhyChoose.vue"

import Categories from "../components/Categories.vue"

</script>