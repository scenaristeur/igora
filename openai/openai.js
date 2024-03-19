// define your environment variables in the .env file
let yjs_url =
  process.env.YJS_ENV == "REMOTE"
    ? process.env.YJS_REMOTE_URL
    : process.env.YJS_LOCAL_URL;
let yjs_room = process.env.YJS_MARKET_ROOM;

console.log("yjs_url:", yjs_url, "\tyjs_room:", yjs_room);

// https://blog.postman.com/set-up-a-websockets-server-in-node-js-postman/
// import { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });

// https://socket.io/how-to/use-with-express-session
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
// import session from "express-session";


import { YjsConnector } from "../src/yjsConnector/index.js";

const port = process.env.PORT || 5678;

const app = express();
const httpServer = createServer(app);

//const allowedOrigins = ['http://localhost:*', "http://127.0.0.1:*", "app://obsidian.md"];
const allowedOrigins = ["*"];

const cors_options = {
  origin: allowedOrigins
};

app.use(cors(cors_options));

let options = {
  name: "openai",
  yjs_url: yjs_url,
  yjs_room: yjs_room,
  type: "openai_compatible_endpoint",
  style: "igora",
  state: "ready",
  debug: true,
}
let yjs = new YjsConnector(options);

let openai_server_id = uuidv4()


yjs.awareness.setLocalStateField("agent", {
    id: openai_server_id,
    name: options.name,
    style: options.style,
    type: options.type,
    state: options.state,
    date: Date.now(),
  });


  yjs.wsProvider.on('status', (event) => {
    console.log('Websocket provider', event.status) // logs "connected" or "disconnected"
  })
  
  // const workspace = doc.getMap("workspace");
  let doc = yjs.doc
  const todos = doc.getMap('todos')
  const prepared = doc.getMap('prepared')
  const doing = doc.getMap('doing')
  const done = doc.getMap('done')


  doc.on('update', (/*update*/) => {
    console.log('todo', todos.toJSON())
    console.log('prepared', prepared.toJSON())
    console.log('doing', doing.toJSON())
    console.log('done', done.toJSON())


  })


app.get("/", (req, res) => {
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});


var sendAndSleep = function (response, counter) {
    if (counter > 10) {
        console.log("end")
      response.end();
    } else {
        console.log("sendAndSleep", counter)
      response.write(" ;i=" + counter);
      //response.json({"text": " ;i=" + counter});
      counter++;
      setTimeout(function () {
        sendAndSleep(response, counter);
      }, 1000)
    };
  };
  

app.post("/v1/chat/completions", express.json(), async (req, res) => {
  console.log("received", req.body);
  //   const session = req.session;
  //   session.count = (session.count || 0) + 1;

  // reponse inspirée de https://cookbook.openai.com/examples/how_to_stream_completions
  let response = {
    id: "chatcmpl-" + uuidv4(),
    choices: [
      {
        message: {
          content: "Hello, World!",
          role: "assistant",
          function_call: null, // "None" ? python style ?
          tool_calls: null,
        },
        finish_reason: "stop",
        index: 0,
        logprobs: null,
        model: "gpt-3.5-turbo", //"vicuna-7b-v1.5-16k.Q2_K.gguf"
        created: Date.now(), //  1703395008
        object: "chat.completion",
        system_fingerprint: "None",
        usage: { completion_tokens: 299, prompt_tokens: 36, total_tokens: 335 },
      },
    ],
  };


// stream 
if (req.body.stream==true) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
  
    res.write("Thinking...");
    sendAndSleep(res, 1);
//   res.writeHead(200, {
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   });
//   res.write("data: " + JSON.stringify(response) + "\n\n");
//   res.flush();
}else{

    let todo = {
        //id: req.body.id, //id,
        id: "chatcmpl-" + uuidv4(),
        asker: openai_server_id, // should be client id
        type: 'text',
        // systemPrompt should comme from client
        systemPrompt: `Tu es un assistant chargé de répondre au mieux à la demande de l'utilisateur`,
        //prompt: 
        messages: req.body.messages,
        state: 'todo',
       // seed: options.seed || 0,
        temperature: req.body.temperature || 0,
        date: Date.now()
      }
      console.log(todo)
      todos.set(todo.id, todo)



      let textPromise = new Promise((resolve, reject) => {
        let timer = setInterval(async function () {
          let check = done.get(todo.id)
          if (check!= undefined) {
            console.log("PROMISE DONE", check)
            // result.end = Date.now();
            // console.log("--GENERATION\n", check.data.generations[0], "\n--");
            // let text =
            //   check.data.generations[0] && check.data.generations[0].text.trim();
  
            // console.log("----- text generated : ", text, "\n-----\n");
  
            // result.job = check.data.generations[0];
  
            clearInterval(timer); // Stop the timer
            resolve(check); // Résoudre la promesse avec le texte
          } else {
            console.log(check);
          }
        }, 1000);
      });
  
      const result = await textPromise; // Attendre que la promesse soit résolue
      //result.text = text;
      console.log("RETURN RESULT", result);
  response.choices[0].message.content = result.response.trim();
    //   stream.write(JSON.stringify(result) + "\r\n");
      res.status(200).json(response);


}
});

// function checkStatus(todo_id){
//     let isDone = done.get(todo_id)
//     console.log("isDone", isDone)
//     if (isDone) {
//         clearInterval(myInterval);
//         res.status(200).json(isDone);
//     }
    
// }




const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("connexion", socket.id);
  socket.on("message", (data) => {
    console.log("message", data);
    socket.emit("message", data);
  });
  socket.on("*", (data) => {
    console.log("*", data);
  });

  socket.on("disconnect", (reason) => {
    console.log("deconnexion ", reason, socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`application is running at: http://localhost:${port}`);
});
