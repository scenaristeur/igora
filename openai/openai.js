// define your environment variables in the .env file
let yjs_url =
  process.env.YJS_ENV == "REMOTE"
    ? process.env.YJS_REMOTE_URL
    : process.env.YJS_LOCAL_URL;
let yjs_room = process.env.YJS_MARKET_ROOM;
console.log("yjs_url:", yjs_url, "\tyjs_room:", yjs_room);

// https://socket.io/how-to/use-with-express-session
// import session from "express-session";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { YjsConnector } from "../src/yjsConnector/index.js";
import { ChatCompletionResponse } from "./ChatCompletionResponse/index.js";

const port = process.env.PORT || 5678;
const app = express();
const httpServer = createServer(app);
const allowedOrigins = ["*"]; //const allowedOrigins = ['http://localhost:*', "http://127.0.0.1:*", "app://obsidian.md"];
const cors_options = {
  origin: allowedOrigins,
};
app.use(cors(cors_options));
let openai_server_id = uuidv4();
let options = {
  name: "openai",
  yjs_url: yjs_url,
  yjs_room: yjs_room,
  type: "client",
  style: "openai_compatible_endpoint",
  state: "ready",
  debug: true,
};
let yjs = new YjsConnector(options);
yjs.awareness.setLocalState({
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

// doc.on("update", (/*update*/) => {
//   console.log("todo", todos.toJSON());
//   console.log("prepared", prepared.toJSON());
//   console.log("doing", doing.toJSON());
//   console.log("done", done.toJSON());
// });

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
// app.post("/v1/completions", express.json(), async (req, res) => {
  console.log("received", req.body);

  // CREATE RESPONSE
  let chatCompletionReponse = new ChatCompletionResponse(req.body);
  console.log("chatCompletionReponse", chatCompletionReponse);

  if (req.body.prompt && req.body.messages == undefined) {
    req.body.messages = [];
    req.body.messages.push({
      role: "user",
      content: req.body.prompt,
    });
  }

  // CREATE TODO
  let model = req.body.model;
  let todo = {
    //id: req.body.id, //id,
    id: chatCompletionReponse.id,
    asker: openai_server_id, // should be client id
    style: "text",
    // systemPrompt should comme from client
    systemPrompt: `Tu es un assistant chargé de répondre au mieux à la demande de l'utilisateur`,
    //prompt:
    messages: req.body.messages,
    state: "todo",
    model: model,
    // seed: options.seed || 0,
    temperature: req.body.temperature || 0,
    date: Date.now(),
    clientID: yjs.awareness.clientID,
  };
  // CREATE LISTENERS
  if (req.body.stream == true) {
    res.writeHead(200, {
      "Cache-Control": "no-store",
      // "Content-Type": "text/plain",
      "Content-Type": "text/event-stream",
      "Transfer-Encoding": "chunked",
    });

    doing.observeDeep((events, transaction) => {
      let current_doing = doing.get(chatCompletionReponse.id);
      if (
        current_doing != undefined &&
        current_doing.delta != undefined &&
        current_doing.delta.content != undefined &&
        current_doing.chunkDate != chatCompletionReponse.chunkDate
      ) {
        console.log("\n CURENT DOING ", current_doing.delta.content);
        chatCompletionReponse.updateContent(
          current_doing.delta.content,
          current_doing.chunkDate
        );
        res.write("data: " + chatCompletionReponse.toString() + "\n\n");
      }
    });
    done.observeDeep((events, transaction) => {
      let current_done = done.get(chatCompletionReponse.id);
      if (current_done != undefined) {
        console.log("\n CURRENT done", current_done);

        chatCompletionReponse.finish("stop");
        // Done ne fonctionne pas avec autogen
        // res.write("data: " + chatCompletionReponse.toString() + "\n\n[DONE]\n\n");
        res.write("data: " + chatCompletionReponse.toString());
        res.end();
        // console.log("FINISH", chatCompletionReponse.toString() )
      }
    });
    todos.set(todo.id, todo);
    console.log("new stream todo", todo.id);
  } else {
    let response = {
      id: todo.id,
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
          usage: {
            completion_tokens: 0,
            prompt_tokens: 0,
            total_tokens: 0,
          },
        },
      ],
    };

    // console.log("streaming is false ", todo);

    // console.log(todo);
    todos.set(todo.id, todo);
    console.log("new normal todo", todo.id);

    let textPromise = new Promise((resolve, reject) => {
      let timer = setInterval(async function () {
        let check = done.get(todo.id);
        if (check != undefined) {
          console.log("PROMISE DONE", check);
          clearInterval(timer); // Stop the timer
          resolve(check); // Résoudre la promesse avec le texte
        }
      }, 1000);
    });

    const result = await textPromise; // Attendre que la promesse soit résolue
    response.choices[0].message.content = result.response.trim();
    console.log("response", response);
    res.status(200).json(response);
  }
});

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
