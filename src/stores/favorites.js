import { reactive } from "vue"

const STORAGE_KEY = "primegadget_favorites"

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.ids))
}

export const favorites = reactive({
  ids: load(),

  isFavorite(id) {
    return favorites.ids.includes(id)
  },

  toggle(id) {
    const index = favorites.ids.indexOf(id)
    if (index === -1) {
      favorites.ids.push(id)
    } else {
      favorites.ids.splice(index, 1)
    }
    save()
  },
})
