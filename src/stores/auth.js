import { reactive } from "vue"

const savedUser = JSON.parse(localStorage.getItem("currentUser"))

// Reserved admin credentials (demo / portfolio)
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
  },

  logout() {
    this.currentUser = null
    this.isLoggedIn = false
    this.isAdmin = false
    localStorage.removeItem("currentUser")
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

  /**
   * Login priority:
   * 1. Always try admin credentials first (even if a regular user
   *    previously registered with the same email).
   * 2. Then fall back to registered users.
   */
  userLogin(email, password) {
    const cleanEmail = (email || "").trim().toLowerCase()
    const cleanPassword = password || ""

    // 1. Admin takes priority
    if (this.adminLogin(cleanEmail, cleanPassword)) {
      return { success: true, isAdmin: true }
    }

    // 2. Registered users
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const found = users.find(
      (u) =>
        (u.email || "").toLowerCase() === cleanEmail &&
        u.password === cleanPassword
    )

    if (found) {
      // Never grant admin role to a self-registered account
      this.login({ ...found, role: "user" })
      return { success: true, isAdmin: false }
    }

    return { success: false, isAdmin: false }
  },
})
