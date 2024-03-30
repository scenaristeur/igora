import { Base } from "../base/index.js";
import { McConnector } from "../mcConnector/index.js";
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
    this.mcConnector = new McConnector(this.options);
    this.updateAwareness();
    this.prepared = this.yjs.doc.getMap("prepared");
    this.doing = this.yjs.doc.getMap("doing");
    this.done = this.yjs.doc.getMap("done");
    this.listenDoing()
  }

  listenDoing() {
    this.prepared.observeDeep((events, transaction) => {
      this.log("events", events, transaction)
      this.prepare();
    })
  }

  prepare() {
    let tasks = Array.from(this.prepared.values())

    tasks.forEach((task) => {
      // console.log("task", task)
      if (task.worker == this.id) {
        this.processTask(task)
      }
    })



    //   if(tasks.length>0){
    //     this.options.state = "working";
    //     this.updateAwareness();
    //   }
  }

  processTask(task) {



    if (this.mcConnector && this.mcConnector.state == "ready") {
      this.options.state = "working";
      this.updateAwareness();
      this.log("process task", task.id)
      this.doing.set(task.id, task)
      this.prepared.delete(task.id)
      this.process_doing_mc(task.id);
    }
  }

  async process_doing_mc(id) {
    let current = this.doing.get(id);
    console.log("!!!!!! PROCESSING ", current)
    if (current.systemPrompt == undefined || current.systemPrompt.length == 0) {
      current.systemPrompt = this.options.systemPrompt || "Tu es une petite souris et tu dois agir comme telle, en finissant toutes te phrases par 'Hi!Hi!Hi'"

    }
    //current.temperature = this.options.temperature || 0.7
    //current.seed = this.options.seed
    this.log("process_doing_mc", id, current, this.mcConnector.state);
    current.response = "";
    const response = await this.mcConnector.chat(current, (token) => {
      process.stdout.write(token);
      current.response += token;
      current.delta={"role":"assistant","content":token}
      current.chunkDate = Date.now();
      this.doing.set(current.id, current);
    });

    this.log(`\nTotal text length: ${current.response.length}`);

    current.end = Date.now();

    current.state = "done";
    current.duration = current.end - current.start;
    console.log("done", current);
    this.done.set(current.id, current);
    this.doing.delete(current.id);
    this.options.state = "ready";
    this.log("DONE", current.id);
    // this.prepare();
    this.updateAwareness()
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

  //   logList(step) {
  //     let { todos, doing, done } = {
  //       todos: this.todolist.todos,
  //       prepared: this.todolist.todos,
  //       doing: this.todolist.doing,
  //       done: this.todolist.done,
  //     };
  //     this.log(
  //       "### ",
  //       step,
  //       " ###",
  //       Array.from(todos.keys()).length,
  //       Array.from(doing.keys()).length,
  //       Array.from(done.keys()).length
  //     );
  //   }
}
