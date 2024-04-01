import * as Y from "yjs";
import * as W from "y-websocket";
import WebSocket from "ws";
import { Base } from "../base/index.js";

// to work with gltch.me that need a user agent https://github.com/yjs/y-websocket/pull/173#issuecomment-1962889278
// const headers = {"headers": {"User-Agent" :"Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0"} }
const headers = { headers: { "User-Agent": "WebSocket Client" } };

/**
 * YjsConnector
 * @class
 * @extends Base
 * @description
 * YjsConnector is a class that allows to connect a user to a yjs collaborative
 * document stored on a yjs websocket server. It will handle the connection
 * and will expose the yjs document and the awareness object to the application
 *
 * @param {Object} options Options for the class
 * @param {String} options.yjs_url  Yjs websocket server url.
 * @param {String} options.yjs_room Yjs websocket room name.
 * @param {String} [options.name="default"] Name of the connector.
 *
 * @example
 * const connector = new YjsConnector({
 *   yjs_url: 'wss://ylm-websocket.glitch.me',
 *   yjs_room: 'market',
 * });
 */

export class YjsConnector extends Base {
  /**
   * Constructor
   * @constructor
   * @param {Object} options Options for the class
   */
  constructor(options = {}) {
    super(options);
    /**
     * @type {String}
     * @description Flag used for logging
     * @private
     */
    this.flag = `[${this.constructor.name}][${this.options.name || "default"}]`;
    /**
     * @type {Function}
     * @description Chalk color used for logging
     * @private
     */
    this.chalk = this.chalk.magenta;
    /**
     * @type {Y.Doc}
     * @description Yjs document
     */
    this.doc = null;
    /**
     * @type {W.WebsocketProvider}
     * @description Yjs websocket provider
     */
    this.wsProvider = null;
    /**
     * @type {Y.Awareness}
     * @description Yjs awareness object
     */
    this.awareness = null;
    /**
     * @type {String}
     * @description Connection status
     */
    this.state = null;
    this._init();
  }

  /**
   * Initialize the class
   * @function
   * @private
   */
  _init() {
    this.log(" connecting to ", this.options.yjs_url, this.options.yjs_room);
    this.doc = new Y.Doc();
    this.wsProvider = new W.WebsocketProvider(
      this.options.yjs_url,
      this.options.yjs_room,
      this.doc,
      { WebSocketPolyfill: WebSocketPolyfillPolyfill, params: this._headers }
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

/**
 * WebSocketPolyfillPolyfill
 * @class
 * @extends WebSocket
 * @description
 * WebSocketPolyfillPolyfill is a class that allows to add headers to
 * websockets as a workaround for glitch.me that needs the user agent
 * in the headers.
 *
 * @see {@link https://github.com/yjs/y-websocket/pull/173#issuecomment-1962889278|Github issue}
 * @private
 */
class WebSocketPolyfillPolyfill extends WebSocket {
  /**
   * Constructor
   * @constructor
   * @param {...*} args Arguments passed to the parent class.
   */
  constructor(...args) {
    super(...args, headers);
  }
}

