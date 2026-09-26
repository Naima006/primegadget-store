<template>
  <MainLayout>
    <Hero />

    <Categories />

    <FeaturedProducts
      section-id="featured"
      title="Featured Products"
      subtitle="Premium gadgets carefully selected for you."
      :limit="4"
      :show-see-more="true"
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
