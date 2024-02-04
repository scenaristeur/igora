import { Base } from "../base/index.js";

import { YjsConnector } from "../yjsConnector/index.js";

export class Worker extends Base {
  constructor(options = {}) {
    super(options);
    this.options.type = "text";
    this.options.style = "node_llama_cpp";
    this.options.state = "ready";
    this.flag = "[WORKER][" + this.options.name + "]";
    this.chalk = this.chalk.yellow;
    this.yjs = new YjsConnector(this.options);
    this.updateAwareness();
    this.doing = this.yjs.doc.getMap("doing");
    this.listenDoing()
  }

listenDoing(){
  this.doing.observeDeep((events, transaction) => {
    //this.log("events", events, transaction)
    this.prepare();
  })
}

  prepare() {
     let  tasks = Array.from(this.doing.values())
     .filter(
        (a) => {
            a.worker == this.id
        }
      )
      console.log("tasks", tasks.length, tasks)
  }

  updateAwareness() {
    this.yjs.awareness.setLocalStateField("agent", {
      id: this.id,
      name: this.options.name,
      style: this.options.style,
      type: this.options.type,
      state: this.options.state,
      date: Date.now(),
    });
  }
}
