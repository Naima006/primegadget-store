import { reactive } from "vue"
import initialProducts from "../assets/data/products.json"

const STORAGE_KEY = "primegadget_products"
const CATEGORIES_KEY = "primegadget_categories"

// Default categories derived from initial products + a few extras
const defaultCategories = [
  { id: 1, name: "Headphones", icon: "bi-headphones" },
  { id: 2, name: "Earbuds", icon: "bi-earbuds" },
  { id: 3, name: "Laptop", icon: "bi-laptop" },
  { id: 4, name: "Phone", icon: "bi-phone" },
  { id: 5, name: "Watch", icon: "bi-smartwatch" },
  { id: 6, name: "Accessories", icon: "bi-mouse" },
  { id: 7, name: "Consoles", icon: "bi-controller" },
]

function loadProducts() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return [...initialProducts]
    }
  }
  return [...initialProducts]
}

function loadCategories() {
  const saved = localStorage.getItem(CATEGORIES_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return [...defaultCategories]
    }
  }
  return [...defaultCategories]
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products.items))
}

function saveCategories() {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(products.categories))
}

export const products = reactive({
  items: loadProducts(),
  categories: loadCategories(),

  // Products CRUD
  addProduct(product) {
    const newId = products.items.length
      ? Math.max(...products.items.map((p) => p.id)) + 1
      : 1
    products.items.push({
      id: newId,
      name: product.name,
      category: product.category,
      price: Number(product.price),
      image: product.image || "https://via.placeholder.com/400x300?text=Product",
      description: product.description || "",
      featured: !!product.featured,
    })
    saveProducts()
    return newId
  },

  updateProduct(id, data) {
    const index = products.items.findIndex((p) => p.id === id)
    if (index === -1) return false
    products.items[index] = {
      ...products.items[index],
      ...data,
      price: Number(data.price ?? products.items[index].price),
    }
    saveProducts()
    return true
  },

  deleteProduct(id) {
    products.items = products.items.filter((p) => p.id !== id)
    saveProducts()
  },

  getProduct(id) {
    return products.items.find((p) => p.id === id)
  },

  // Categories CRUD
  addCategory(cat) {
    const newId = products.categories.length
      ? Math.max(...products.categories.map((c) => c.id)) + 1
      : 1
    products.categories.push({
      id: newId,
      name: cat.name,
      icon: cat.icon || "bi-tag",
    })
    saveCategories()
    return newId
  },

  updateCategory(id, data) {
    const index = products.categories.findIndex((c) => c.id === id)
    if (index === -1) return false
    products.categories[index] = { ...products.categories[index], ...data }
    saveCategories()
    return true
  },

  deleteCategory(id) {
    products.categories = products.categories.filter((c) => c.id !== id)
    saveCategories()
  },

  // Helpers
  getCategoryNames() {
    return products.categories.map((c) => c.name)
  },

  resetToDefaults() {
    products.items = [...initialProducts]
    products.categories = [...defaultCategories]
    saveProducts()
    saveCategories()
  },
})
