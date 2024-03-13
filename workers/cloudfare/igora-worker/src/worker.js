/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import * as Y from "yjs";
import * as W from "y-websocket";


// @ts-ignore
// window.Buffer = Buffer;


// async function websocket(url) {
//   console.log("websocket", url)
//   // Make a fetch request including `Upgrade: websocket` header.
//   // The Workers Runtime will automatically handle other requirements
//   // of the WebSocket protocol, like the Sec-WebSocket-Key header.
//   let resp = await fetch(url, {
//     headers: {
//       Upgrade: 'websocket',
//     },
//   });
// console.log("resp", resp)
//   // If the WebSocket handshake completed successfully, then the
//   // response has a `webSocket` property.
//   let ws = resp.webSocket;
//   if (!ws) {
//     throw new Error("server didn't accept WebSocket");
//   }
//   console.log("ws",ws)

//   // Call accept() to indicate that you'll be handling the socket here
//   // in JavaScript, as opposed to returning it on to a client.
//   ws.accept();

//   // Now you can send and receive messages like before.
//   ws.send('hello');
//   ws.addEventListener('message', msg => {
//     console.log(msg.data);
//   });
// }



export default {

  

	async fetch(request, env, ctx) {
    const yjs_url = 'wss://ylm-websocket.glitch.me'
    const yjs_room = 'market'
    const doc = new Y.Doc();
		// const ws_test = new WebSocket('wss://ylm-websocket.glitch.me', ['hello']);
		// console.log(ws_test);

    // https://github.com/yjs/y-websocket/pull/173#issuecomment-1962889278
    // const WebSocketPolyfill = new WebSocketPolyfillPolyfill extends WebSocket {
    //   constructor(...args) {
    //     super(
    //       ...args, 
    //       { headers:
    //         { "User-Agent": "WebSocket Client" }
    //         })
    //   }
    // }

    //var params = { headers: { "User-Agent": "WebSocket Client" } };



   // websocket('wss://ylm-websocket.glitch.me')

  //   const doc = new Y.Doc();
    const wsProvider = new W.WebsocketProvider(
      yjs_url,
      yjs_room,
     // {protocol: "y-protocol"},
      doc,
     // { WebSocketPolyfill: WebSocket }
    );

    // console.log("wsProvider", wsProvider)
   const awareness = wsProvider.awareness;

   awareness.setLocalStateField("agent", {
    id: "this.id",
    name: "this.options.name",
    style: "this.options.style",
    type: "this.options.type",
    state: "this.options.state",
    date: Date.now(),
  });

  //   // this.awareness.clientId = this.id;
    wsProvider.on("status", (event) => {
      state = event.status;
      console.log(state)
      //this.log(this.state); // logs "connected" or "disconnected"
      // this.updateWorker();
    });

   let prepared = doc.getMap("prepared");
    let doing = doc.getMap("doing");
    let done = doc.getMap("done");
let todos = doc.getMap("todos");

todos.observeDeep((events, transaction) => {
   console.log("events", events, transaction)
     //this.prepare();
  
 })


		return new Response('Hello World!');
	},
};
