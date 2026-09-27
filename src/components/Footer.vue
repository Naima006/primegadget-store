<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <h2>Prime<span>Gadget</span></h2>
        <p>
          Premium gadgets crafted for the modern generation.
          Experience technology with style.
        </p>
      </div>

      <div>
        <h3>Shop</h3>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shop">Products</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>

      <div>
        <h3>Support</h3>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/faq">FAQ</RouterLink>
        <RouterLink to="/privacy">Privacy</RouterLink>
      </div>

      <div>
        <h3>Follow Us</h3>
        <div class="socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i class="bi bi-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i class="bi bi-twitter-x"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="copyright">
      © {{ year }} PrimeGadget. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #0f1115;
  color: white;
  padding: 70px 0 30px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
}

h2 {
  font-size: 28px;
  margin-bottom: 15px;
}

h2 span {
  color: var(--primary);
}

p {
  color: #bfbfbf;
  max-width: 300px;
  line-height: 1.6;
}

h3 {
  margin-bottom: 15px;
}

a {
  display: block;
  color: #bfbfbf;
  margin-bottom: 10px;
  transition: 0.3s;
  text-decoration: none;
}

a:hover {
  color: var(--primary);
}

.socials {
  display: flex;
  gap: 15px;
}

.socials a {
  font-size: 20px;
  display: inline-flex;
}

.copyright {
  text-align: center;
  margin-top: 50px;
  color: #777;
  font-size: 14px;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
