import { Base } from "../base/index.js";

export class TodoList extends Base {
  constructor(options = {}) {
    super(options);
    this.flag = "[LIST]";
    this.chalk = this.chalk.hex("#DEAD");
    this.doc = options.worker.yjs.doc;

    this._init();
  }
  async _init() {
    this.log("init");
    this.todos = this.doc.getMap("todos");
    this.doing = this.doc.getMap("doing");
    this.done = this.doc.getMap("done");
  }
  async test() {}
}
