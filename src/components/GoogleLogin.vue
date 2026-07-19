<template>
  <div ref="googleButton"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { auth } from "../stores/auth"

const googleButton = ref(null)

function parseJwt(token) {

    const base64Url = token.split('.')[1]

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    return JSON.parse(atob(base64))

}

function handleCredentialResponse(response){

    const user = parseJwt(response.credential)

    auth.login({

        name: user.name,

        email: user.email,

        picture: user.picture,

        provider: "google"

    })

    window.location.href="/"

}

onMounted(()=>{

window.google.accounts.id.initialize({

client_id:"600346920352-oh0krvav97gkp55af3k8gr9fge9bhann.apps.googleusercontent.com",

callback:handleCredentialResponse

})

window.google.accounts.id.renderButton(

googleButton.value,

{

theme:"outline",

size:"large",

shape:"pill",

width:350,

text:"continue_with"

}

)

})
</script>