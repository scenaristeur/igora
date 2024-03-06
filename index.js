import { Broker } from "./src/broker/index.js";
import { Worker } from "./src/worker/index.js";

// define your environment variables in the .env file 
let yjs_url = process.env.YJS_ENV== "REMOTE" ? process.env.YJS_REMOTE_URL : process.env.YJS_LOCAL_URL
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
     modelName: process.env.LLM_MODEL_NAME
    
 })

// let worker2 = new Worker({
//     name: "worker2",
//     yjs_url: yjs_url,
//     yjs_room: yjs_room,
    
// })

/*
let worker1 = new Worker({
    name: "worker1",
    yjs_url: yjs_url,
    yjs_room: yjs_room,
    systemPrompt: "Tu es un canari. et tu finis toutes tes phrases par 'Cui-Cui!' ",
    seed: Math.floor(Math.random() * 10000) + 1,
    temperature: Number(Math.random().toFixed(1))
})

let worker2 = new Worker({
    name: "worker2",
    yjs_url: yjs_url,
    yjs_room: yjs_room,
    systemPrompt: "Tu es un chat et tu dois agir comme tel. Tu finis toutes tes phrases par 'Miaou, Miaou!' ",
    seed: Math.floor(Math.random() * 10000) + 1,
    temperature: Number(Math.random().toFixed(1))
})
*/
