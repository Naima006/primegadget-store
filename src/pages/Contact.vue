<template>
  <MainLayout>
    <section class="contact-page">
      <div class="container">
        <header class="page-hero">
          <span class="tag">Support</span>
          <h1>Contact Us</h1>
          <p>
            Questions about an order, a product, or the store?
            Send a message, we typically respond within 1–2 business days.
          </p>
        </header>

        <div class="contact-grid">
          <div class="info-cards">
            <div class="info-card">
              <div class="icon"><i class="bi bi-envelope"></i></div>
              <h3>Email</h3>
              <p>support@primegadget.com</p>
            </div>
            <div class="info-card">
              <div class="icon"><i class="bi bi-telephone"></i></div>
              <h3>Phone</h3>
              <p>+880 1714-785412</p>
            </div>
            <div class="info-card">
              <div class="icon"><i class="bi bi-geo-alt"></i></div>
              <h3>Location</h3>
              <p>Sylhet, Bangladesh</p>
            </div>
            <div class="info-card">
              <div class="icon"><i class="bi bi-clock"></i></div>
              <h3>Hours</h3>
              <p>Sat–Thu, 10:00–18:00 (GMT+6)</p>
            </div>
          </div>

          <form class="contact-form" @submit.prevent="submit">
            <h2>Send a message</h2>

            <div class="field">
              <label for="c-name">Full name</label>
              <input
                id="c-name"
                v-model="form.name"
                type="text"
                placeholder="Your name"
                autocomplete="name"
                maxlength="80"
              />
            </div>

            <div class="field">
              <label for="c-email">Email</label>
              <input
                id="c-email"
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                maxlength="120"
              />
            </div>

            <div class="field">
              <label for="c-subject">Subject</label>
              <select id="c-subject" v-model="form.subject">
                <option value="">Select a topic</option>
                <option value="order">Order status</option>
                <option value="product">Product question</option>
                <option value="return">Returns &amp; refunds</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="field">
              <label for="c-msg">Message</label>
              <textarea
                id="c-msg"
                v-model="form.message"
                rows="5"
                placeholder="How can we help?"
                maxlength="2000"
              ></textarea>
              <span class="hint">{{ form.message.length }}/2000</span>
            </div>

            <button type="submit" class="submit-btn" :disabled="sending">
              {{ sending ? "Sending…" : "Send Message" }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { reactive, ref } from "vue"
import MainLayout from "../layouts/MainLayout.vue"
import { toast } from "../stores/toast"

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
})
const sending = ref(false)

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim())
}

function submit() {
  const name = form.name.trim()
  const email = form.email.trim()
  const subject = form.subject
  const message = form.message.trim()

  if (name.length < 2) {
    toast.open("Please enter your name.", "error")
    return
  }
  if (!isValidEmail(email)) {
    toast.open("Please enter a valid email address.", "error")
    return
  }
  if (!subject) {
    toast.open("Please select a subject.", "error")
    return
  }
  if (message.length < 10) {
    toast.open("Please write a message (at least 10 characters).", "error")
    return
  }

  sending.value = true

  // Demo: persist locally so submissions aren't lost in session
  try {
    const key = "primegadget_contact_messages"
    const list = JSON.parse(localStorage.getItem(key) || "[]")
    list.unshift({
      id: Date.now(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toLocaleString(),
    })
    localStorage.setItem(key, JSON.stringify(list.slice(0, 50)))
  } catch {
    /* ignore storage errors */
  }

  setTimeout(() => {
    sending.value = false
    form.name = ""
    form.email = ""
    form.subject = ""
    form.message = ""
    toast.open("Message sent. We'll get back to you soon!")
  }, 400)
}
</script>

<style scoped>
.contact-page {
  padding: 140px 0 80px;
  background: #f6f7f9;
  min-height: 100vh;
}

.page-hero {
  text-align: center;
  margin-bottom: 48px;
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
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.55;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 32px;
  align-items: start;
}

.info-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.info-card {
  background: #fff;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.info-card .icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #121212;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 12px;
}

.info-card h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
}

.info-card p {
  font-size: 13px;
  color: #666;
  word-break: break-word;
}

.contact-form {
  background: #fff;
  border-radius: 22px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.contact-form h2 {
  font-size: 22px;
  margin-bottom: 22px;
}

.field {
  margin-bottom: 18px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1.5px solid #e5e5e5;
  font-size: 15px;
  font-family: inherit;
  background: #fafafa;
  box-sizing: border-box;
  transition: 0.2s;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(198, 255, 74, 0.2);
}

.field textarea {
  resize: vertical;
  min-height: 120px;
}

.hint {
  font-size: 11px;
  color: #999;
  display: block;
  text-align: right;
  margin-top: 4px;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  background: var(--primary);
  color: #121212;
  font-weight: 700;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: 0.25s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(198, 255, 74, 0.35);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .page-hero h1 {
    font-size: 30px;
  }
  .info-cards {
    grid-template-columns: 1fr;
  }
  .contact-form {
    padding: 22px;
  }
}
</style>
