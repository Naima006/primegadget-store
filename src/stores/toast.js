import { reactive } from "vue"

export const toast = reactive({

show:false,

message:"",

type:"success",

open(message,type="success"){

this.message=message

this.type=type

this.show=true

setTimeout(()=>{

this.show=false

},3000)

}

})