// define your environment variables in the .env file
let yjs_url =
  process.env.YJS_ENV == "remote"
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
import { v4 as uuidv4 } from 'uuid';
// import session from "express-session";

const port = process.env.PORT || 5678;

const app = express();
const httpServer = createServer(app);

// const sessionMiddleware = session({
//   secret: "changeit",
//   resave: true,
//   saveUninitialized: true,
// });

// app.use(sessionMiddleware);

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
  

app.post("/v1/chat/completions", express.json(), (req, res) => {
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
