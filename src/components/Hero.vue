<template>
  <section class="hero" :style="{ background: hero.config.backgroundColor || '#121212' }">
    <div class="container hero-grid">
      <div class="hero-left">
        <span class="tag">
          {{ hero.config.tag }}
        </span>

        <h1>
          <template v-for="(line, i) in titleLines" :key="i">
            {{ line }}<br v-if="i < titleLines.length - 1" />
          </template>
        </h1>

        <p>
          {{ hero.config.subtitle }}
        </p>

        <div class="buttons">
          <button class="primary" @click="go(hero.config.primaryBtnLink)">
            {{ hero.config.primaryBtnText }}
          </button>

          <button class="secondary" @click="go(hero.config.secondaryBtnLink)">
            {{ hero.config.secondaryBtnText }}
          </button>
        </div>
      </div>

      <div class="hero-right">
        <img
          :src="hero.config.image"
          alt="Hero product"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { hero } from "../stores/hero"

const router = useRouter()

const titleLines = computed(() => {
  return (hero.config.title || "").split("\n").filter(Boolean)
})

function go(path) {
  if (!path) return
  if (path.startsWith("http")) {
    window.open(path, "_blank")
  } else {
    router.push(path)
  }
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
}

.secondary {
  background: transparent;
  border: 1px solid white;
  padding: 15px 34px;
  border-radius: 50px;
  color: white;
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

/* Responsive */
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
