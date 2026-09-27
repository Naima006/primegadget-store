<template>
  <MainLayout>
    <section class="faq-page">
      <div class="container">
        <header class="page-hero">
          <span class="tag">Help Center</span>
          <h1>Frequently Asked Questions</h1>
          <p>Quick answers about shopping, delivery, returns, and your account.</p>
        </header>

        <div class="faq-list">
          <div
            v-for="(item, i) in faqs"
            :key="i"
            class="faq-item"
            :class="{ open: openIndex === i }"
          >
            <button
              class="faq-q"
              type="button"
              :aria-expanded="openIndex === i"
              @click="toggle(i)"
            >
              <span>{{ item.q }}</span>
              <i class="bi" :class="openIndex === i ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </button>
            <div v-show="openIndex === i" class="faq-a">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>

        <div class="cta-box">
          <p>Still need help?</p>
          <RouterLink to="/contact" class="cta">Contact Support</RouterLink>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { ref } from "vue"
import MainLayout from "../layouts/MainLayout.vue"

const openIndex = ref(0)

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are typically delivered within 5 business days nationwide. Weekends are not counted as business days. You’ll see an estimated delivery date at checkout and on your order details.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We support Cash on Delivery, credit/debit card, and bKash for this demo store. Payment is confirmed when you place the order.",
  },
  {
    q: "Can I cancel or change my order?",
    a: "While an order is still Pending or Confirmed, contact support as soon as possible. Once an order is Packed or Shipped, changes may not be possible. You can track status anytime under My Orders.",
  },
  {
    q: "What is your return policy?",
    a: "Unused products in original packaging can usually be returned within 7 days of delivery. Contact us with your order number to start a return. Defective items are handled case by case.",
  },
  {
    q: "How do I track my order?",
    a: "Log in, open Profile → My Orders. Each order shows status (Pending, Confirmed, Packed, Shipped, Delivered) and estimated delivery when available.",
  },
  {
    q: "Do I need an account to shop?",
    a: "You can browse without an account. Creating one lets you save a wishlist, keep order history, and use a per-account cart on this device.",
  },
  {
    q: "Is my data secure?",
    a: "This is a front-end portfolio demo. Data such as cart and orders is stored in your browser’s localStorage only and is not sent to a server. See our Privacy Policy for details.",
  },
  {
    q: "Shipping is free — is that always true?",
    a: "Yes for this beta version: shipping is free on all orders. A 5% tax is applied to the subtotal at checkout so totals stay consistent with your cart.",
  },
]

function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<style scoped>
.faq-page {
  padding: 140px 0 80px;
  background: #f6f7f9;
  min-height: 100vh;
}

.page-hero {
  text-align: center;
  margin-bottom: 40px;
}

.tag {
  display: inline-block;
  background: rgba(198, 255, 74, 0.2);
  color: #3a4a00;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 14px;
}

.page-hero h1 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 12px;
}

.page-hero p {
  color: #666;
  max-width: 480px;
  margin: 0 auto;
}

.faq-list {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1.5px solid transparent;
  transition: 0.25s;
}

.faq-item.open {
  border-color: rgba(198, 255, 74, 0.5);
}

.faq-q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  cursor: pointer;
  font-family: inherit;
}

.faq-q i {
  color: #888;
  flex-shrink: 0;
}

.faq-a {
  padding: 0 22px 18px;
}

.faq-a p {
  color: #555;
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
}

.cta-box {
  text-align: center;
  margin-top: 40px;
  padding: 28px;
  background: #fff;
  border-radius: 18px;
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}

.cta-box p {
  margin-bottom: 14px;
  color: #555;
  font-weight: 600;
}

.cta {
  display: inline-block;
  background: #121212;
  color: #fff;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 700;
  transition: 0.25s;
}

.cta:hover {
  background: #2a2a2a;
}

@media (max-width: 576px) {
  .page-hero h1 {
    font-size: 30px;
  }
  .faq-q {
    font-size: 15px;
    padding: 16px 18px;
  }
}
</style>
