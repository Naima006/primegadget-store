import { reactive } from "vue"

const savedUser = JSON.parse(localStorage.getItem("currentUser"))

// Hardcoded admin credentials for demo (portfolio-friendly)
const ADMIN_EMAIL = "admin@primegadget.com"
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

  // Simple admin login helper
  adminLogin(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
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

  // Regular user login (existing users from register) + admin support
  userLogin(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const found = users.find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      this.login({ ...found, role: found.role || "user" })
      return true
    }
    // Also allow admin via normal login form
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return this.adminLogin(email, password)
    }
    return false
  },
})
