import { Broker } from "./src/broker/index.js";
import { Worker } from "./src/worker/index.js";


let yjs_url = 'wss://ylm-websocket.glitch.me'// "ws://localhost:1234"
let yjs_room = "market"

let broker = new Broker({
    name: "Broker",
    yjs_url: yjs_url,
    yjs_room: yjs_room,
    
})


let worker1 = new Worker({
    name: "worker1",
    yjs_url: yjs_url,
    yjs_room: yjs_room,
    
})

let worker2 = new Worker({
    name: "worker2",
    yjs_url: yjs_url,
    yjs_room: yjs_room,
    
})