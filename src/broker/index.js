import { v4 as uuidv4 } from "uuid";
import { Base } from "../base/index.js";

export class Broker extends Base {
  constructor(options = {}) {
    super(options);
    this.options = options;
    this.id = uuidv4();
    this.doc = options.worker.yjs.doc;
    this.flag = "[BROKER][" + this.options.name + "]";
    this.chalk = this.options.color || this.chalk.green;
    this._init();
  }

_init() {
        this.log("Salut, je suis", this.options.name);
        // this.log("init")
        // this.workers = this.doc.getMap("workers");
        // this.models = this.doc.getMap("models");
}

check() {
//   this.log("check")
//   this.log(this.workers)
//   this.log(this.models)
}



}