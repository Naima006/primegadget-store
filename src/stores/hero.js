import { reactive } from "vue"

const STORAGE_KEY = "primegadget_hero"

// Resolve local asset correctly in Vite (dev + build)
const defaultHeroImage = new URL(
  "../assets/images/hero-headphone.webp",
  import.meta.url
).href

const defaultHero = {
  tag: "NEW ARRIVAL",
  title: "IMMERSIVE SOUND\nFOR THE DIGITAL\nGENERATION",
  subtitle:
    "Experience premium wireless technology with elegant design and crystal-clear audio.",
  image: defaultHeroImage,
  primaryBtnText: "Shop Now",
  primaryBtnLink: "/shop",
  secondaryBtnText: "Explore",
  secondaryBtnLink: "/#featured",
  backgroundColor: "#121212",
}

function loadHero() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      // If saved image was the old broken path, fall back to default
      if (
        parsed.image &&
        (parsed.image.includes("/src/assets/") || parsed.image === "")
      ) {
        parsed.image = defaultHeroImage
      }
      return { ...defaultHero, ...parsed }
    } catch {
      return { ...defaultHero }
    }
  }
  return { ...defaultHero }
}

function saveHero() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hero.config))
}

export const hero = reactive({
  config: loadHero(),

  update(data) {
    hero.config = { ...hero.config, ...data }
    saveHero()
  },

  reset() {
    hero.config = { ...defaultHero }
    saveHero()
  },
})
