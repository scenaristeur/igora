import * as Y from "yjs";
import * as W from "y-websocket";
import WebSocket from "ws";

import { Base } from "../base/index.js";


// to work with gltch.me that need a user agent https://github.com/yjs/y-websocket/pull/173#issuecomment-1962889278
const headers = {"headers": {"User-Agent" :"Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0"} }
class WebSocketPolyfillPolyfill extends WebSocket {
  constructor(...args) {
    super(...args, headers)
  }
}





export class YjsConnector extends Base {
  constructor(options = {}) {
    super(options);
    this.flag = "[YJS][" + this.options.name + "]";
    this.chalk = this.chalk.magenta;
    this._init();
  }

  _init() {
    this.log(" connecting to ", this.options.yjs_url, this.options.yjs_room);
    var params = { headers: { "User-Agent": "WebSocket Client" } };
    this.doc = new Y.Doc();
    this.wsProvider = new W.WebsocketProvider(
      this.options.yjs_url,
      this.options.yjs_room,
      this.doc,
      { WebSocketPolyfill: WebSocketPolyfillPolyfill /*, params */ }
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
