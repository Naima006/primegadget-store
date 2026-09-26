import { reactive } from "vue"
import { auth } from "./auth"

function storageKey() {
  const id = auth.currentUser?.email || auth.currentUser?.id || "guest"
  return `primegadget_favorites_${id}`
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(storageKey())) || []
  } catch {
    return []
  }
}

function save() {
  localStorage.setItem(storageKey(), JSON.stringify(favorites.ids))
}

export const favorites = reactive({
  ids: load(),
})

export function reloadFavorites() {
  favorites.ids = load()
}

export function isFavorite(id) {
  return favorites.ids.includes(id)
}

// keep method on object for existing ProductCard
favorites.isFavorite = isFavorite

favorites.toggle = function (id) {
  const index = favorites.ids.indexOf(id)
  if (index === -1) {
    favorites.ids.push(id)
  } else {
    favorites.ids.splice(index, 1)
  }
  save()
}
