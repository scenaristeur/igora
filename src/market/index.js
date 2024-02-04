import { Base } from "../base/index.js";

export class Market extends Base {
  constructor(options = {}) {
    super(options);
    this.flag = "[LIST]";
    this.chalk = this.chalk.hex("#DEAD");
    this.doc = options.communicator.doc;

    this._init();
  }
  async _init() {
    this.log("init");
    this.broker = this.doc.getMap("broker");
    this.workers = this.doc.getMap("workers");
    this.clients = this.doc.getMap("clients");
    this.tasks = this.doc.getMap("tasks");
  }
  async checkActiveBroker(b) {
    let awareness = this.awareness = this.options.communicator.awareness
    let mainBroker = null


console.log(b)

    awareness.on("change", (changes) => {
      // Whenever somebody updates their awareness information,
      // we log all awareness information from all users.
      let agents = Array.from(awareness.getStates().values());
      console.log("######Brokers", agents.length);
      agents.forEach((a) => {
        console.log(a)
        if (this.broker.size == 0 && a.broker.type =="broker"){
          b.promote()
          this.broker.set("main", b.id)
// mainBroker = a
// awareness.setLocalStateField("state", "main")
// console.log("mainBroker1", mainBroker)
        }
        // try {
        //   this.log(
        //    // a.agent.type,
        //     a.agent.state,
        //     a.agent.name,
        //     a.agent.id,
        //     a.agent.style
        //     // a
        //   );
        // } catch (e) {
        //   console.log(e, a);
        // }
      });
      console.log("#####", agents.length);
      this.log("mainBroker", JSON.stringify(this.broker.toJSON()))
    });

    


  }
}
