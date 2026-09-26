<template>
  <div class="google-btn-wrap" ref="googleButton"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { auth } from "../stores/auth"

const googleButton = ref(null)

function parseJwt(token) {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  return JSON.parse(atob(base64))
}

function handleCredentialResponse(response) {
  const user = parseJwt(response.credential)
  auth.login({
    name: user.name,
    email: user.email,
    picture: user.picture,
    provider: "google",
  })
  window.location.href = "/"
}

function renderGoogleButton() {
  if (!window.google?.accounts?.id || !googleButton.value) return

  // Clear previous button if re-rendering
  googleButton.value.innerHTML = ""

  // Fit parent width, cap at 350, never exceed container
  const parentWidth = googleButton.value.parentElement?.clientWidth || 280
  const btnWidth = Math.min(350, Math.max(240, Math.floor(parentWidth)))

  window.google.accounts.id.initialize({
    client_id:
      "600346920352-oh0krvav97gkp55af3k8gr9fge9bhann.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  })

  window.google.accounts.id.renderButton(googleButton.value, {
    theme: "outline",
    size: "large",
    shape: "pill",
    width: btnWidth,
    text: "continue_with",
  })
}

let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(renderGoogleButton, 150)
}

onMounted(() => {
  // Wait for Google script if needed
  if (window.google?.accounts?.id) {
    renderGoogleButton()
  } else {
    const check = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(check)
        renderGoogleButton()
      }
    }, 100)
    setTimeout(() => clearInterval(check), 5000)
  }
  window.addEventListener("resize", onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize)
  clearTimeout(resizeTimer)
})
</script>

<style scoped>
.google-btn-wrap {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

/* Google injects an iframe — keep it from overflowing */
.google-btn-wrap :deep(div),
.google-btn-wrap :deep(iframe) {
  max-width: 100% !important;
}
</style>
