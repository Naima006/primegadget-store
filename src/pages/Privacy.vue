<template>
  <MainLayout>
    <section class="privacy-page">
      <div class="container narrow">
        <header class="page-hero">
          <span class="tag">Legal</span>
          <h1>Privacy Policy</h1>
          <p class="updated">Last updated: September 28, 2026</p>
        </header>

        <article class="content">
          <p class="lead">
            At PrimeGadget, we take your privacy and personal data seriously. This Privacy Policy outlines how your information is collected, utilized, and safeguarded when you explore our store, create an account, or place an order.
          </p>

          <h2>1. Information We Collect</h2>
          <p>To deliver a seamless shopping experience, we may collect and process the following information when you interact with our platform:</p>
          <ul>
            <li><strong>Account Information:</strong> Your full name, email address, and authentication credentials provided during registration or login.</li>
            <li><strong>Order & Checkout Details:</strong> Shipping address, contact phone number, order item summaries, and chosen delivery/payment preferences.</li>
            <li><strong>Shopping Preferences:</strong> Wishlist selections, active cart contents, browsing interactions, and device-level preferences.</li>
            <li><strong>Customer Support Inquiries:</strong> Any communication or feedback submitted through our contact channels.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the data collected strictly to operate and enhance store services, including:</p>
          <ul>
            <li>Fulfilling and tracking product orders and deliveries.</li>
            <li>Maintaining your authenticated account session, cart, and saved favorites across visits.</li>
            <li>Providing prompt customer care and technical support.</li>
            <li>Optimizing store performance, interface layout, and overall user experience.</li>
          </ul>

          <h2>3. Third-Party Authentication & Services</h2>
          <p>
            We offer optional single sign-on via Google Identity Services. When authenticating through Google, only your basic public profile details (such as name and verified email address) are retrieved to establish your session. PrimeGadget does not sell, rent, or trade your personal data to third-party advertisers.
          </p>

          <h2>4. Data Storage & Security</h2>
          <p>
            We utilize modern browser storage and secure local session handling to persist your cart, active sessions, and personal preferences on your client device. We do not store sensitive payment card information directly on our servers.
          </p>

          <h2>5. Your Rights & Data Choices</h2>
          <p>You maintain full control over the personal data retained by this application:</p>
          <ul>
            <li><strong>Access & Modification:</strong> Review and update your profile information anytime directly from your Account Dashboard.</li>
            <li><strong>Data Clearance:</strong> Clear your cart, saved wishlist, and local session at any point by logging out or resetting site storage in your browser settings.</li>
            <li><strong>Inquiries & Requests:</strong> Request data clarification or removal by contacting our privacy team.</li>
          </ul>

          <h2>6. Updates to This Policy</h2>
          <p>
            We may periodically review and update this Privacy Policy to reflect improvements in store features or regulatory standards. The "Last updated" date will indicate when the latest revisions took effect.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions, feedback, or concerns regarding your privacy or data practices, please reach out to us via our
            <RouterLink to="/contact">Contact Page</RouterLink>
            or email <a href="mailto:support@primegadget.com">support@primegadget.com</a>.
          </p>
        </article>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layouts/MainLayout.vue"
</script>

<style scoped>
.privacy-page {
  padding: 140px 0 80px;
  background: #f6f7f9;
  min-height: 100vh;
}

.narrow {
  max-width: 760px;
}

.page-hero {
  margin-bottom: 32px;
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
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 8px;
}

.updated {
  color: #888;
  font-size: 14px;
}

.content {
  background: #fff;
  border-radius: 22px;
  padding: 36px 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  line-height: 1.65;
  color: #333;
}

.lead {
  font-size: 16px;
  margin-bottom: 28px;
  color: #444;
}

.content h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 28px 0 10px;
  color: #111;
}

.content p,
.content ul {
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
}

.content ul {
  padding-left: 20px;
}

.content li {
  margin-bottom: 6px;
}

.content a {
  color: #3a5a00;
  font-weight: 600;
  text-decoration: underline;
}

@media (max-width: 576px) {
  .page-hero h1 {
    font-size: 28px;
  }
  .content {
    padding: 24px 20px;
  }
}
</style>
