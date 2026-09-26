<template>
  <MainLayout>
    <ShopHero />

    <FeaturedProducts
      section-id="shop-products"
      title="All Products"
      subtitle=""
      :enable-pagination="true"
      :page-size="8"
    /> <!--subtitle="Browse our full collection of premium gadgets."-->
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layouts/MainLayout.vue"
import ShopHero from "../components/ShopHero.vue"
import FeaturedProducts from "../components/FeaturedProducts.vue"
</script>
