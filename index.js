import { Broker } from "./src/broker/index.js";
import { Worker } from "./src/worker/index.js";

// define your environment variables in the .env file 
let yjs_url = process.env.YJS_ENV== "remote" ? process.env.YJS_REMOTE_URL : process.env.YJS_LOCAL_URL
//'wss://ylm-websocket.glitch.me'// "ws://localhost:1234"
let yjs_room = process.env.YJS_MARKET_ROOM

let options = {

    yjs_url: yjs_url,
    yjs_room: yjs_room
}

console.log("OPTIONS", options)

let broker = new Broker({
    name: "Broker",
    yjs_url: yjs_url,
    yjs_room: yjs_room,
    
})


 let worker1 = new Worker({
     name: "worker1",
     yjs_url: yjs_url,
     yjs_room: yjs_room,
     modelName: "dolphin-2.2.1-mistral-7b.Q2_K.gguf"
    
 })

// let worker2 = new Worker({
//     name: "worker2",
//     yjs_url: yjs_url,
//     yjs_room: yjs_room,
    
// })