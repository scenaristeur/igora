import { v4 as uuidv4 } from "uuid";
import { Base } from "../base/index.js";
// import { CataiConnector } from "../cataiConnector/index.js";
import { YjsConnector } from "../yjsConnector/index.js";
import { McConnector } from "../mcConnector/index.js";
import { TodoList } from "../todolist/index.js";
// import {Broker} from '../broker/index.js'

export class Worker extends Base {
  constructor(options = {}) {
    super(options);
    this.options = options;
    this.id = uuidv4();
    this.options.worker = this;
    this.flag = "[WORKER][" + this.options.name + "]";
    this.chalk = this.options.color || this.chalk.blue;
    //this.name = options.name || "inconnu";
    this.numberOfKOMax = 12;
    this.options.type= "text"
    this.options.style ="igora"
    this.options.bind= "node-llama-cpp-v2"
    // this.catai_url = options.catai_url || "ws://localhost:3000";
    // this.yjs_url = options.yjs_url || "ws://localhost:1234";
    // this.yjs_room = options.yjs_room || "my-roomname";
    this._init();
  }
  _init() {
    this.log("Salut, je suis", this.options.name);
    this.log("Mon job est", this.options.job);
    if (this.options.yjs_url && this.options.yjs_room) {
      this.log("YjsConnector to", this.options.yjs_url, this.options.yjs_room);
      this.yjs = new YjsConnector(this.options);
    } else {
      this.log(
        "!!! yjs_url NOT SET ! see https://github.com/scenaristeur/catay/blob/main/server/index.js"
      );
    }
    // if (this.options.catai_url) {
    //   this.log("CataiConnector to", this.options.catai_url);
    //   this.cataiConnector = new CataiConnector(this.options);
    // } else {
    //   this.log(
    //     "!!! catai_url NOT SET ! see https://github.com/scenaristeur/catay/blob/main/server/index.js"
    //   );
    // }
    if (this.options.multi_channel) {
      this.log("MultiChannelConnector to", this.options.multi_channel);
      this.mcConnector = new McConnector(this.options);
    } else {
      this.log(
        "!!! multiChannel NOT SET ! see https://github.com/scenaristeur/catay/blob/main/server/index.js"
      );
    }
    this.healthCheckRunner = setInterval(
      this.healthCheck.bind(this),
      this.options.healthCheckInterval || 5000
    );
  }

  // createBroker() {
  //   this.broker =new Broker(this.options)
  //   this.broker.check()
  // }

  healthCheck() {
 
    if (
      ((this.cataiConnector && this.cataiConnector.state == "ready") ||
        (this.mcConnector && this.mcConnector.state == "ready")) &&
      this.yjs &&
      this.yjs.state == "connected"
    ) {
      // this.log(
      //   "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!FAKE TEST IN DEVELOP WITH ONLY YJS"
      // );
      // if (this.yjs && this.yjs.state == "connected") {
      this.state = "ok";
      //this.options.healthCheckInterval = 60000
// if(!this.broker){
//   this.createBroker();
// }


      this.log("state", this.state);
      this.numberOfKOMax = 12;
      if (!this.todolist) {
        this.todolist = new TodoList(this.options);
        this.todos = this.todolist.todos;
        this.doing = this.todolist.doing;
        this.done = this.todolist.done;

        this.processList();
      }
    } else {
      this.numberOfKOMax--;
      this.state = "ko " + this.numberOfKOMax;
      this.log("state", this.state);
      if (this.numberOfKOMax < 0) {
        this.log("worker KO", this.flag);
        clearInterval(this.healthCheckRunner);
      }
    }
    this.log(
      "health check",
      "with McConnector state : '",
      this.mcConnector && this.mcConnector.state,
      "' and cataiConnector state : '",
      this.cataiConnector && this.cataiConnector.state,
      "' and YJSConnector state : '",
      this.yjs && this.yjs.state,
      "'."
    );
  }

  processList() {
    // this.prepare();
    // this.yjs.doc.on("update", (update) => {
    //   this.prepare();
    // });
    this.todos.observeDeep((events, transaction) => {
    //  console.log("events", events, transaction)
      this.prepare();
    
    })

    // this.doing.observeDeep((events, transaction) => {
    //    this.log("events in doing", events, transaction)
    //     //this.prepare();
      
    //   })
  }

  prepare() {
//this.broker.check()
    this.checkObsoletes();
    if (this.state == "ok") {
      let delay = Math.random() * 1000; // wait less tha 1 second to avoid that many workers get the job at the same time

      setTimeout(() => {
        this.log("PREPARE " + delay + "ms");
      }, Math.floor(delay));

      let id = Array.from(this.todos.keys())[0];
      let current = this.todos.get(id);
      console.log("current", current);
      if (
        current != undefined &&
        current.state === "todo" &&
        current.worker === undefined
      ) {
        current.worker = this.id;
        current.state = "doing";
        this.state = "working";
        current.attemps = 1;
        current.start = Date.now();
        // if (Math.random() < 0.5) {    // si ramdom necessaire
        if (!this.doing.has(id)) {
          this.doing.set(id, current);
          this.todos.delete(id);
          if (this.cataiConnector && this.cataiConnector.state == "ready") {
            this.process_doing_catai(id);
          }
          if (this.mcConnector && this.mcConnector.state == "ready") {
            this.process_doing_mc(id);
          }
        }

        // }else{
        //     prepare()
        // }
      }
      this.logList("PREPARED todo");
    }
  }

  checkObsoletes() {
    for (const key of this.doing.keys()) {
      let item = this.doing.get(key);

      let duration = Date.now() - item.start;
      this.log("check doing", item.id, duration);

      //si plus de 6 minutes
      if (duration > 360000) {
        // TODO : ADD or asker not in awareness anymore
        item.state = "todo";
        delete item.worker;
        delete item.start;
        item.attemps = item.attemps + 1;
        this.doing.delete(item.id);
        //item.id = "todo";
        this.todos.set(item.id, item);
        this.log("revert doing", item.id, duration);
      }
    }
  }

  async process_doing_mc(id) {
    let current = this.doing.get(id);
    this.log("process_doing_mc", id, current, this.mcConnector.state);
    current.response = "";
    const response = await this.mcConnector.chat(current, (token) => {
      process.stdout.write(token);
      current.response += token;
      this.doing.set(current.id, current);
    });

    this.log(`\nTotal text length: ${current.response.length}`);

    current.end = Date.now();

    current.state = "done";
    current.duration = current.end - current.start;
    console.log("done", current);
    this.done.set(current.id, current);
    this.doing.delete(current.id);
    this.state = "ok";
    this.logList("DONE");
    this.prepare();
  }

  async process_doing_catai(id) {
    let current = this.doing.get(id);
    let result = "";
    const response = await this.cataiConnector.catai.prompt(
      current.prompt,
      (token) => {
        process.stdout.write(token);
        result += token;
      }
    );

    this.log(`\nTotal text length: ${response.length}`);

    current.end = Date.now();
    current.result = result;
    current.state = "done";
    current.duration = current.end - current.start;
    console.log("done", current);
    this.done.set(current.id, current);
    this.doing.delete(current.id);
    this.state = "ok";
    this.logList("DONE");
    this.prepare();
  }

  logList(step) {
    let { todos, doing, done } = {
      todos: this.todolist.todos,
      doing: this.todolist.doing,
      done: this.todolist.done,
    };
    this.log(
      "### ",
      step,
      " ###",
      Array.from(todos.keys()).length,
      Array.from(doing.keys()).length,
      Array.from(done.keys()).length
    );
  }
}
