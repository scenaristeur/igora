import { Base } from "../base/index.js";

import { YjsConnector } from "../yjsConnector/index.js";

export class Broker extends Base {
  constructor(options = {}) {
    super(options);
    this.options.type="broker"
    this.options.style="normal"
    this.flag = "[BROKER][" + this.options.name + "]";
    this.chalk = this.chalk.blue;
    this.yjs = new YjsConnector(this.options);
    this.listenAwareness()
    this.updateAwareness();
  }

  listenAwareness() {
    let awareness = this.yjs.awareness;
    awareness.on("change", (changes) => {
        let agents = Array.from(awareness.getStates().values());
        console.log("######BROKER AWARENESS", agents.length);
        agents.forEach((a) => {
          try {
            this.log(
              a.agent.name, a.agent.type
              // a.agent.type,
              // a.agent.state,
              // a.agent.name,
              // a.agent.id,
              // a.agent.style
             // JSON.stringify(a.agent.id)
            );
          } catch (e) {
            console.log(e, a);
          }
        });
        console.log("#####", agents.length);
      });
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
