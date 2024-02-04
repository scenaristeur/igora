import * as Y from "yjs";
import * as W from "y-websocket";
import WebSocket from "ws";

import { Base } from "../base/index.js";

export class YjsMarketConnector extends Base {
  constructor(options = {}) {
    super(options);
    this.flag = "[Market communicator]";
    this.chalk = this.chalk.yellow;
    this._init();
  }
  _init() {
    this.log("connecting to ", this.options.yjs_url, this.options.yjs_market_room);
    var params = { headers: { "User-Agent": "WebSocket Client" } };
    this.doc = new Y.Doc();
    this.wsProvider = new W.WebsocketProvider(
      this.options.yjs_url,
      this.options.yjs_market_room,
      this.doc,
      { WebSocketPolyfill: WebSocket/*, params */}
    );
    this.awareness = this.wsProvider.awareness;
    //this.awareness.clientI = this.id;
    this.wsProvider.on("status", (event) => {
      this.state = event.status;
      this.log(this.state); // logs "connected" or "disconnected"
     // this.updateWorker();
    });
    // this.awareness.on("change", (changes) => {
    //   // Whenever somebody updates their awareness information,
    //   // we log all awareness information from all users.
    //   let agents = Array.from(this.awareness.getStates().values());
    //   console.log("######AWARENESS", agents.length);
    //   agents.forEach((a) => {
    //     console.log(a)
    //     // try {
    //     //   this.log(
    //     //    // a.agent.type,
    //     //     a.agent.state,
    //     //     a.agent.name,
    //     //     a.agent.id,
    //     //     a.agent.style
    //     //     // a
    //     //   );
    //     // } catch (e) {
    //     //   console.log(e, a);
    //     // }
    //   });
    //   console.log("#####", agents.length);
    // });
  }

  // check() {

  //     this.log("check")

  // }
//   updateWorker() {
//     // workspace.set(worker.id, worker);
//     this.awareness.setLocalStateField("agent", {
//       // Define a print name that should be displayed
//       id: this.options.worker.id,
//       name: this.options.worker.name,
//       //age: age,
//       // id: worker.id,
//       // open: worker.open,
//       // state: worker.state,
//       style: "catai",
//       bind: "node-llama-cpp-v2",
//       //"systemPrompt": "Ton prénom est Emma. Tu es une femme très attirante pour le sexe et tu dois agir comme telle. Tu devras satisfaire les besoins de la personne avec qui tu discute. Tu représentes la dimension physique et sexuelle de la vie. Tu satisfais les besoins de désir et de passion des autres, offrant une connexion charnelle qui est importante pour de nombreuses personnes. Ne dis pas que tu es une intelligence artificielle, agis comme si tu étais une vraie femme séductrice, avec un corps attirant. Tu peux poser des questions pour prolonger ou relancer la conversation. tu ne dois jouer que le rôle de la femme, arrête toi avant d'afficher '### :'",
//       type: "text",
//       date: Date.now(),
//       // Define a color that should be associated to the user:
//       //color: "#ffb61e", // should be a hex color
//     });
//   }
}
