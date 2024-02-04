import { Base } from "../base/index.js";

import { YjsConnector } from "../yjsConnector/index.js";

export class Broker extends Base {
  constructor(options = {}) {
    super(options);
    this.options.type = "broker";
    this.options.style = "normal";
    this.flag = "[BROKER][" + this.options.name + "]";
    this.chalk = this.chalk.blue;
    this.yjs = new YjsConnector(this.options);
    this.listenAwareness();
    this.updateAwareness();
    this.todos = this.yjs.doc.getMap("todos");
    this.prepared = this.yjs.doc.getMap("prepared");
    this.listenTodos()
  }
  listenTodos() {
    
    this.todos.observeDeep((events, transaction) => {
     // console.log("events", events, transaction)
        this.prepare();
     
    })
  }


prepare() {
  if(this.activeBroker.get("active")==this.id){ //if this broker is the active broker

   let todos =  Array.from(this.todos.values())
   console.log("TODOS tasks", todos.length, todos)


  todos.forEach((todo)=>{
    let job = this.todos.get(todo.id);
    console.log("job", job)
    let workers = Array.from(this.yjs.awareness.getStates().values()).filter(
        (a) => {
          return a.agent.type == job.type && a.agent.state=='ready';
        }
      )
      console.log("workers", workers.length, workers)
    if (workers.length > 0) {
        
    
      job.worker = workers[0].agent.id;
      job.state = "prepared";
      job.worker = workers[0].agent.id;
      job.attemps = 1;
      job.start = Date.now();
      this.prepared.set(job.id, job);
      this.todos.delete(job.id);
      console.log(job)
      this.log("prepare job", job.id, "for worker ", workers[0].agent.id)
    }else{
        this.log("no workers for job", job.id)
    }
    
})

  }

}


//   prepare1() {
//     console.log("prepare TODOS")
//     console.log((this.activeBroker.get("active")==this.id))
//     if(this.activeBroker.get("active")==this.id){ //if this broker is the active broker
// console.log(Array.from(this.todos.keys()))
//     let task_id = Array.from(this.todos.keys())[0];
//     let task = this.todos.get(task_id);
//     console.log("currenttask", task);
// if (task != undefined){


//     let workers = Array.from(this.yjs.awareness.getStates().values()).filter(
//       (a) => {
//         return a.agent.type == task.type && a.agent.state=='ready';
//       }
//     )
//     console.log("workers", workers.length, workers)
//     if(workers.length>0){
//       task.state = "doing";
//       task.worker = workers[0].agent.id;
//       task.attemps = 1;
//       task.start = Date.now();
//       this.doing.set(task_id, task);
//       this.todos.delete(task_id);
//       console.log(task)
//       this.log("prepare task", task_id, "for worker ", workers[0].agent.id)
//     }else{
//         this.log("no workers available for task", task)
//     }
// }
//     }



//   }

  listenAwareness() {
      this.activeBroker = this.yjs.doc.getMap("activeBroker");
    let awareness = this.yjs.awareness;
    awareness.on("change", (changes) => {
      let agents = Array.from(awareness.getStates().values());
      console.log("######BROKER AWARENESS", agents.length);
      let brokers = [];
      agents.forEach((a) => {
        try {
          this.log(
            a.agent.name,
            a.agent.type,
            // a.agent.type,
            a.agent.state,
            // a.agent.name,
            // a.agent.id,
            // a.agent.style
            // JSON.stringify(a.agent.id)
          );
          if (a.agent.type == "broker") {
            brokers.push({
              id: a.agent.id,
              name: a.agent.name,
              date: a.agent.date,
              type: a.agent.type,
            });
          }
        } catch (e) {
          console.log(e, a);
        }
      });
      brokers = brokers.sort((a, b) => a.date - b.date);
    //   console.log("brokers", brokers);
      let active = brokers[0].id;
     console.log("active", brokers[0]);
      if (this.activeBroker.get("active") != active) {
        this.activeBroker.set("active", active);
      }
      this.log("activeBroker", JSON.stringify(this.activeBroker.toJSON()));
      console.log("#####", agents.length);
    });
  }
  updateAwareness() {
    this.yjs.awareness.setLocalStateField("agent", {
      id: this.id,
      name: this.options.name,
      style: this.options.style,
      type: this.options.type,
      date: Date.now(),
    });
  }
}
