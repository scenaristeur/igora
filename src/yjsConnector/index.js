import * as Y from "yjs";
import * as W from "y-websocket";
import WebSocket from "ws";

import { Base } from "../base/index.js";

export class YjsConnector extends Base {
  constructor(options = {}) {
    super(options);
    this.flag = "[YJS][" + this.options.name+ "]";
    this.chalk = this.chalk.magenta;
    this._init();
  }

  _init() {
    // this.log(
    //   this.options.name,
    //   " connecting to ",
    //   this.options.yjs_url,
    //   this.options.yjs_room
    // );
    var params = { headers: { "User-Agent": "WebSocket Client" } };
    this.doc = new Y.Doc();
    this.wsProvider = new W.WebsocketProvider(
      this.options.yjs_url,
      this.options.yjs_room,
      this.doc,
      { WebSocketPolyfill: WebSocket /*, params */ }
    );
    this.awareness = this.wsProvider.awareness;
    // this.awareness.clientId = this.id;
    this.wsProvider.on("status", (event) => {
      this.state = event.status;
      this.log(this.state); // logs "connected" or "disconnected"
     // this.updateWorker();
    });
  }
}
