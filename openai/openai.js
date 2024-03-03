// define your environment variables in the .env file 
let yjs_url = process.env.YJS_ENV== "remote" ? process.env.YJS_REMOTE_URL : process.env.YJS_LOCAL_URL
let yjs_room = process.env.YJS_MARKET_ROOM


console.log("yjs_url:",yjs_url, "\tyjs_room:", yjs_room)



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
// import session from "express-session";

const port = process.env.PORT || 3000;

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

app.post("/incr", (req, res) => {
  const session = req.session;
  session.count = (session.count || 0) + 1;
  res.status(200).end("" + session.count);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
console.log("connexion", socket.id)
  socket.on("message", (data) => {
    console.log("message",data)
    socket.emit("message", data)
  });
  socket.on("*", (data) => {
    console.log("*",data)
  });

  socket.on("disconnect", (reason) => {
    console.log("deconnexion ", reason,socket.id)
  })

})




httpServer.listen(port, () => {
  console.log(`application is running at: http://localhost:${port}`);
});