import { reactive } from "vue"

const savedUser = JSON.parse(localStorage.getItem("currentUser"))

export const ADMIN_EMAIL = "admin@primegadget.com"
const ADMIN_PASSWORD = "admin123"

export const auth = reactive({
  currentUser: savedUser,
  isLoggedIn: !!savedUser,
  isAdmin: !!(savedUser && savedUser.role === "admin"),

  login(user) {
    this.currentUser = user
    this.isLoggedIn = true
    this.isAdmin = user.role === "admin"
    localStorage.setItem("currentUser", JSON.stringify(user))
    // Lazy import to avoid circular dependency issues at module init
    import("./cart").then((m) => m.reloadCart())
    import("./orders").then((m) => m.reloadOrders())
    import("./favorites").then((m) => m.reloadFavorites())
  },

  logout() {
    this.currentUser = null
    this.isLoggedIn = false
    this.isAdmin = false
    localStorage.removeItem("currentUser")
    import("./cart").then((m) => m.reloadCart())
    import("./orders").then((m) => m.reloadOrders())
    import("./favorites").then((m) => m.reloadFavorites())
  },

  isReservedAdminEmail(email) {
    return (email || "").trim().toLowerCase() === ADMIN_EMAIL
  },

  adminLogin(email, password) {
    if (
      (email || "").trim().toLowerCase() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      const adminUser = {
        id: 0,
        name: "Store Owner",
        email: ADMIN_EMAIL,
        role: "admin",
      }
      this.login(adminUser)
      return true
    }
    return false
  },

  userLogin(email, password) {
    const cleanEmail = (email || "").trim().toLowerCase()
    const cleanPassword = password || ""

    if (this.adminLogin(cleanEmail, cleanPassword)) {
      return { success: true, isAdmin: true }
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const found = users.find(
      (u) =>
        (u.email || "").toLowerCase() === cleanEmail &&
        u.password === cleanPassword
    )

    if (found) {
      this.login({ ...found, role: "user" })
      return { success: true, isAdmin: false }
    }

    return { success: false, isAdmin: false }
  },
})
