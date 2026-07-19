import { reactive } from "vue"

const savedUser = JSON.parse(localStorage.getItem("currentUser"))

export const auth = reactive({

    currentUser: savedUser,

    isLoggedIn: !!savedUser,

    login(user){

        this.currentUser = user

        this.isLoggedIn = true

        localStorage.setItem("currentUser", JSON.stringify(user))

    },

    logout(){

        this.currentUser = null

        this.isLoggedIn = false

        localStorage.removeItem("currentUser")

    }

})