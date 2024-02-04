
import { Base } from "../base/index.js";

import { YjsConnector } from "../yjsConnector/index.js";

export class Worker extends Base {
  constructor(options = {}) {
    super(options);
    this.options.type="text"
    this.options.style="node_llama_cpp"
    this.flag = "[WORKER]["+this.options.name+"]";
    this.chalk = this.chalk.yellow;
    this.yjs = new YjsConnector(this.options);
    this.updateAwareness();
  }

  updateAwareness() {
    this.yjs.awareness.setLocalStateField("agent", {
      name: this.options.name,
      style: this.options.style,
      type: this.options.type,
      date: Date.now(),
    });
  }
}