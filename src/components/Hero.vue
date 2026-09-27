<template>
  <section class="hero" :style="{ background: hero.config.backgroundColor || '#121212' }">
    <div class="container hero-grid">
      <div class="hero-left">
        <span class="tag anim-fade-up">
          {{ hero.config.tag }}
        </span>

        <h1 class="anim-fade-up anim-delay-1">
          <template v-for="(line, i) in titleLines" :key="i">
            {{ line }}<br v-if="i < titleLines.length - 1" />
          </template>
        </h1>

        <p class="anim-fade-up anim-delay-2">
          {{ hero.config.subtitle }}
        </p>

        <div class="buttons anim-fade-up anim-delay-3">
          <button class="primary" @click="go(hero.config.primaryBtnLink)">
            {{ hero.config.primaryBtnText }}
          </button>

          <button class="secondary" @click="go(hero.config.secondaryBtnLink)">
            {{ hero.config.secondaryBtnText }}
          </button>
        </div>
      </div>

      <div class="hero-right anim-scale-in anim-delay-2">
        <img
          class="anim-float"
          :src="hero.config.image"
          alt="Hero product"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick } from "vue"
import { useRouter, useRoute } from "vue-router"
import { hero } from "../stores/hero"

const router = useRouter()
const route = useRoute()

const titleLines = computed(() => {
  return (hero.config.title || "").split("\n").filter(Boolean)
})

/**
 * Supports:
 * - /shop, /about          → normal route
 * - #featured              → scroll to section on current page
 * - /#featured             → go home then scroll to #featured
 * - /#categories           → go home then scroll to #categories
 * - https://...            → external
 */
function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    return true
  }
  return false
}

async function go(path) {
  if (!path) return
  const raw = String(path).trim()

  // External
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    window.open(raw, "_blank")
    return
  }

  // Hash only: #featured
  if (raw.startsWith("#")) {
    const id = raw.slice(1)
    if (!scrollToId(id)) {
      // Not on a page that has this section — go home with hash
      await router.push({ path: "/", hash: raw })
      await nextTick()
      setTimeout(() => scrollToId(id), 80)
    }
    return
  }

  // Path with hash: /#featured or /shop#something
  if (raw.includes("#")) {
    const [pathname, hash] = raw.split("#")
    const targetPath = pathname || "/"
    const hashId = hash

    if (route.path === targetPath || (targetPath === "/" && route.path === "/")) {
      scrollToId(hashId)
    } else {
      await router.push({ path: targetPath || "/", hash: "#" + hashId })
      await nextTick()
      // Wait for page render
      setTimeout(() => scrollToId(hashId), 100)
    }
    return
  }

  // Normal internal path
  router.push(raw.startsWith("/") ? raw : "/" + raw)
}
</script>

<style scoped>
.hero {
  background: #121212;
  padding-top: 140px;
  padding-bottom: 80px;
  color: white;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
}

.tag {
  display: inline-block;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  margin-bottom: 25px;
}

h1 {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 25px;
}

p {
  font-size: 18px;
  color: #c9c9c9;
  max-width: 480px;
  margin-bottom: 35px;
}

.buttons {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.primary,
.secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}

.primary {
  background: var(--primary);
  padding: 15px 34px;
  border-radius: 50px;
  font-weight: 700;
  border: none;
  color: #121212;
  transition: 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(198, 255, 74, 0.35);
}

.secondary {
  background: transparent;
  border: 1px solid white;
  padding: 15px 34px;
  border-radius: 50px;
  color: white;
  transition: 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.hero-right {
  display: flex;
  justify-content: center;
}

.hero-right img {
  width: 100%;
  max-width: 620px;
  height: auto;
  transition: 0.4s;
}

.hero-right img:hover {
  transform: scale(1.05);
}

@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 60px;
  }

  h1 {
    font-size: 56px;
  }

  p {
    margin: 0 auto 35px;
  }

  .buttons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 120px;
    padding-bottom: 60px;
  }

  h1 {
    font-size: 42px;
  }

  p {
    font-size: 16px;
  }

  .primary,
  .secondary {
    padding: 13px 26px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 32px;
  }

  .tag {
    font-size: 13px;
    padding: 6px 14px;
  }
}
</style>
