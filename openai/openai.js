// define your environment variables in the .env file
let yjs_url =
  process.env.YJS_ENV == "REMOTE"
    ? process.env.YJS_REMOTE_URL
    : process.env.YJS_LOCAL_URL;
let yjs_room = process.env.YJS_MARKET_ROOM;

console.log("yjs_url:", yjs_url, "\tyjs_room:", yjs_room);

// https://socket.io/how-to/use-with-express-session
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

// import session from "express-session";

import { YjsConnector } from "../src/yjsConnector/index.js";

import {ChatCompletionResponse} from "./ChatCompletionResponse/index.js";


const port = process.env.PORT || 5678;

const app = express();
const httpServer = createServer(app);

//const allowedOrigins = ['http://localhost:*', "http://127.0.0.1:*", "app://obsidian.md"];
const allowedOrigins = ["*"];

const cors_options = {
  origin: allowedOrigins,
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
};
let yjs = new YjsConnector(options);

let openai_server_id = uuidv4();

yjs.awareness.setLocalStateField("agent", {
  id: openai_server_id,
  name: options.name,
  style: options.style,
  type: options.type,
  state: options.state,
  date: Date.now(),
});

yjs.wsProvider.on("status", (event) => {
  console.log("Websocket provider", event.status); // logs "connected" or "disconnected"
});

// const workspace = doc.getMap("workspace");
let doc = yjs.doc;
const todos = doc.getMap("todos");
const prepared = doc.getMap("prepared");
const doing = doc.getMap("doing");
const done = doc.getMap("done");

doc.on("update", (/*update*/) => {
  console.log("todo", todos.toJSON());
  console.log("prepared", prepared.toJSON());
  console.log("doing", doing.toJSON());
  console.log("done", done.toJSON());
});

app.get("/", (req, res) => {
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

app.get("/v1/models", (req, res) => {
  let models = {
    object: "list",
    data: [
      {
        id: "./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf",
        object: "model",
        owned_by: "me",
        permissions: [],
      },
    ],
  };
  res.write(JSON.stringify(models));
  res.end();
});


app.post("/v1/chat/completions", express.json(), async (req, res) => {
  console.log("received", req.body);
  res.writeHead(200, {
    "Cache-Control": "no-store",
    // "Content-Type": "text/plain",
    "Content-Type": "text/event-stream",
    "Transfer-Encoding": "chunked",
  });


let chatCompletionChunkReponse = {
  id: "chatcmpl-" + uuidv4(),
  object: "chat.completion.chunk",
  created: Date.now() / 1000,
  model: req.body.model,
  system_fingerprint: "fp_44709d6fcb",
  choices: [
    {
      index: 0,
      delta: {
        role: "assistant",
        content: "ONE Hello "+Date.now()/1000,
      },
      logprobs: null,
      finish_reason: null,
    },
  ],
  usage: {
    prompt_tokens: 0,
    completion_tokens: 0,
    total_tokens: 0,
  },
}


let chatCompletionReponse = new ChatCompletionResponse(req.body)

console.log("chatCompletionReponse", chatCompletionReponse);


let count=0;
let intervalId = setInterval(function() {
  let d = Math.floor(Date.now() / 1000)
  console.log("Hello World! "+d);
  chatCompletionReponse.updateContent(" Content --"+count+"--"+d)
  res.write("data: "+chatCompletionReponse.toString()+"\n\n");
  if(count >= 4) {
    clearInterval(intervalId);
    // let d = Math.floor(Date.now() / 1000)
    // console.log("Hello World! "+d);
    // chatCompletionChunkReponse.created= d
    // chatCompletionChunkReponse.choices[0].delta.content = "{}"
    // chatCompletionChunkReponse.finish_reason = "stop";
    // res.write("data: "+JSON.stringify(chatCompletionChunkReponse)+"\n\n");
    chatCompletionReponse.finish("stop")
    // chatCompletionReponse.updateContent(" Content --"+count+"--"+d)
    res.write("data: "+chatCompletionReponse.toString()+"\n\n");

    res.end();
  
  
  }
  count++;
}, 1000);




// setTimeout(function () {
//   // response.setHeader('Connection', 'Transfer-Encoding');
//   // response.setHeader('Content-Type', 'text/html; charset=utf-8');
//   // response.setHeader('Transfer-Encoding', 'chunked');
//   // res.write("event: ping\n")
//   res.write("data: "+JSON.stringify(chatCompletionChunkReponse)+"\n\n");
//   console.log("send one");
//   // res.write(' BIM ');
//   // res.end();
// }, 1000);

//   setTimeout(function () {
//   chatCompletionReponse.choices[0].message.content = "TWO Hello "+Date.now()/1000;
//   //chatCompletionReponse.choices[0].finish_reason = "stop";
//   res.write("data: "+JSON.stringify(chatCompletionChunkReponse)+"\n\n");
//   console.log("send two");
// }, 1000);

//   setTimeout(function () {
//     chatCompletionReponse.choices[0].message.content = {}
//     chatCompletionReponse.choices[0].finish_reason = "stop";
//     res.write("data: "+JSON.stringify(chatCompletionChunkReponse)+"\n\n");
//     console.log("send three");
//     console.log("send done");
//     res.write("data:[DONE]\n\n");
//     res.end();
//     console.log("end");
//   }, 1000);

});



app.post("/v1/chat/completions1", express.json(), async (req, res) => {
  console.log("received", req.body);
  //   const session = req.session;
  //   session.count = (session.count || 0) + 1;

  let id = "chatcmpl-" + uuidv4();
  let model = req.body.model;

  let todo = {
    //id: req.body.id, //id,
    id: id,
    asker: openai_server_id, // should be client id
    type: "text",
    // systemPrompt should comme from client
    systemPrompt: `Tu es un assistant chargé de répondre au mieux à la demande de l'utilisateur`,
    //prompt:
    messages: req.body.messages,
    state: "todo",
    model: model,
    // seed: options.seed || 0,
    temperature: req.body.temperature || 0,
    date: Date.now(),
  };
  console.log(todo);
  todos.set(todo.id, todo);

  // reponse inspirée de https://cookbook.openai.com/examples/how_to_stream_completions
  let response = {
    id: id,
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
        model: model, //"gpt-3.5-turbo", //"vicuna-7b-v1.5-16k.Q2_K.gguf"
        created: Date.now() / 1000, //  1703395008
        object: "chat.completion",
        system_fingerprint: "None",
        usage: { completion_tokens: 299, prompt_tokens: 36, total_tokens: 335 },
      },
    ],
  };

  // stream https://github.com/hyperonym/basaran/blob/a73dc6e712a6b5e672fe80cdc12a25451ef2c0ce/basaran/__main__.py#L176
  if (req.body.stream == true) {
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    });

    // FIRST
    res.write(
      JSON.stringify({
        id: id,
        object: "chat.completion.chunk",
        created: Date.now() / 1000,
        model: model,
        system_fingerprint: "fp_44709d6fcb",
        choices: [
          {
            index: 0,
            delta: { role: "assistant", content: "" },
            logprobs: null,
            finish_reason: null,
          },
        ],
      })
    );



    doing.observeDeep((events, transaction) => {
      //this.log("events", events, transaction)
      // this.prepare();
      let chunky = doing.get(id);
      console.log("chunky", chunky)

      res.write(
        JSON.stringify({
          id: id,
          object: "chat.completion.chunk",
          created: Date.now() / 1000,
          model: model,
          system_fingerprint: "fp_44709d6fcb",
          choices: [
            {
              index: 0,
              delta: chunky.delta,
              logprobs: null,
              finish_reason: null,
            },
          ],
        })
      ) + "\n";
    })

    let chunks = 2;

    // if (chunks > 100) chunks = 100;

    var count = 1;

    while (count <= chunks) {
      // res.write(
      //   JSON.stringify({
      //     type: "stream",
      //     chunk: count++,
      //   }) + "\n"
      // );

      // res.write(
      //   JSON.stringify({
      //     type: "stream",
      //     chunk: count++,
      //   }) + "\n"
      // );

      // CHUNK
      count++;
      res.write(
        JSON.stringify({
          id: id,
          object: "chat.completion.chunk",
          created: Date.now() / 1000,
          model: model,
          system_fingerprint: "fp_44709d6fcb",
          choices: [
            {
              index: 0,
              delta: { content: "Hello" },
              logprobs: null,
              finish_reason: null,
            },
          ],
        })
      ) + "\n";
    }

    // END

    res.write(
      JSON.stringify({
        id: id,
        object: "chat.completion.chunk",
        created: Date.now() / 1000,
        model: model,
        system_fingerprint: "fp_44709d6fcb",
        choices: [
          { index: 0, delta: {}, logprobs: null, finish_reason: "stop" },
        ],
      })
    );

    res.end();
    // res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // res.setHeader('Transfer-Encoding', 'chunked');

    // res.write("Thinking...");
    // sendAndSleep(res, 1);
    //   res.writeHead(200, {
    //     "Content-Type": "text/event-stream",
    //     "Cache-Control": "no-cache",
    //     Connection: "keep-alive",
    //   });
    //   res.write("data: " + JSON.stringify(response) + "\n\n");
    //   res.flush();
  } else {
    let textPromise = new Promise((resolve, reject) => {
      let timer = setInterval(async function () {
        let check = done.get(todo.id);
        if (check != undefined) {
          console.log("PROMISE DONE", check);
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
    //console.log("RETURN RESULT", result);
    response.choices[0].message.content = result.response.trim();
    //   stream.write(JSON.stringify(result) + "\r\n");
    console.log("response", response);
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
