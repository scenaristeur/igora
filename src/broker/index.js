import { Base } from "../base/index.js";
import { YjsConnector } from "../yjsConnector/index.js";

/**
 * @class Broker
 * @classdesc Classe pour gérer un Broker dans l'application
 * @author  scenaristeur
 */
export class Broker extends Base {
  /**
   * Constructeur de la classe Broker
   * @param {Object} options Options pour initialiser le Broker
   */
  constructor(options = {}) {
    super(options);
    /**
     * Type du Broker
     * @type {String}
     */
    this.options.type = "broker";
    /**
     * Style de la console pour les logs du Broker
     * @type {String}
     */
    this.options.style = "normal";
    /**
     * Flag pour les logs du Broker
     * @type {String}
     */
    this.flag = "[BROKER][" + this.options.name + "]";
    /**
     * Couleur pour les logs du Broker
     * @type {Function}
     */
    this.chalk = this.chalk.blue;
    /**
     * Instance de YjsConnector pour communiquer avec les autres agents
     * @type {YjsConnector}
     */
    this.yjs = new YjsConnector(this.options);

    this.todos = this.yjs.doc.getMap("todos");
    this.prepared = this.yjs.doc.getMap("prepared");
    this.doing = this.yjs.doc.getMap("doing");
    this.done = this.yjs.doc.getMap("done");
    this.activeBroker = this.yjs.doc.getMap("activeBroker");
    this.agents = [];
    this.brokers = [];
    this.workers = [];
    this.clients = [];

    /**
     * Méthode pour écouter les changements d'état dans l'awareness
     */

    this.listenAwareness();
    /**
     * Méthode pour mettre à jour l'état de l'awareness
     */
    this.setLocalState();

    this.listenTodos();
  }
  /**
   * Méthode pour écouter les changements sur la map todos
   */
  listenTodos() {
    this.todos.observeDeep((events, transaction) => {
      // console.log("[broker] prepare TODOS");
      this.prepare();
    });
  }

  _recense() {
    let todos = Array.from(this.todos.values());
    let prepared = Array.from(this.prepared.values());
    let doing = Array.from(this.doing.values());
    let done = Array.from(this.done.values());
    // this.log("active broker", this.activeBroker.get("active"));
    this.log(
      todos.length,
      "todos ",
      prepared.length,
      "prepared",
      doing.length,
      "doing",
      done.length,
      "done"
    );
    // console.log("AGENTS", this.agents);
    //console.log("brokers", this.brokers)
    // this.workers.forEach((w) => {
    //   console.log("w", w.id, w.state);
    // });
    // console.log("clients", this.clients)
  }
  /**
   * Méthode pour préparer les tâches en attente
   */
  prepare() {
    // this.yjs.awareness.setLocalStateField("truc", "machin");
    // this.log(
    //   "active broker",
    //   this.activeBroker.get("active"),
    //   "my id",
    //   this.id
    // );
this._recense()
    // if (this.activeBroker.get("active") == this.id) {
    //if this broker is the active broker
    // this._recense();
    let todos = Array.from(this.todos.values());
    // console.log("todos", todos.length);

    todos.forEach((todo) => {
      let job = this.todos.get(todo.id);
      this.log("\njob", job.style, job.id, "for clientID", job.clientID);
      let workers = this.workers.filter((a) => {
        this.log("  ", a.id, a.style, a.state);
        return a.style == job.style && a.state == "ready";
      }).sort(() => Math.random() - 0.5); // shuffle workers
      this.log("candidate workers", workers.length);
      if (workers.length > 0) {
        job.worker = workers[0].id;
        job.state = "prepared";
        job.worker = workers[0].id;
        job.attemps = 1;
        job.start = Date.now();
        this.prepared.set(job.id, job);
        this.todos.delete(job.id);
       // this.log(JSON.stringify(job));
        this.log("prepare job", job.id, "for worker ", workers[0].id);
      } else {
        this.log("!!!!! no workers for job", job.id);
      }
      this._recense()
    });
    // }
  }

  /**
   * Méthode pour écouter les changements d'état des agents
   */

  listenAwareness() {
    let awareness = this.yjs.awareness;
    awareness.on("changes", (changes, tr) => {
      //console.log(tr)
      console.log("\nCHANGES", changes);
    });
    awareness.on("update", (updates, tr) => {
      // console.log(tr)
      // this._update_agents(updates);
      let agents = Array.from(this.yjs.awareness.getStates(), ([id, agent]) => {
        agent.clientID = id;
        return agent;
      }).sort((a, b) => a.date - b.date);
      if (JSON.stringify(agents) != JSON.stringify(this.agents)) {
        console.log(updates)
        this.agents = agents
        this.brokers = this.get_agents("broker");
        this.workers = this.get_agents("worker");
        this.clients = this.get_agents("client");
        this.log(
          "agents",
          this.agents.length,
          "brokers",
          this.brokers.length,
          "workers",
          this.workers.length,
          "clients",
          this.clients.length
        );

        this.workers.forEach((w) => {
          this.log("**worker***",w.clientID, w.id, w.state);
        });

        if (updates.removed.length>0){
          let todos = Array.from(this.todos.values());
          let prepared = Array.from(this.prepared.values());
          let doing = Array.from(this.doing.values());
          let done = Array.from(this.done.values());
  let tasks = [...todos, ...prepared, ...doing, ...done]
// console.log(tasks)
let that = this
tasks.forEach((task) => {
  if (updates.removed.includes(task.clientID)) {
    console.log("removing", task.clientID, task.id, task.state)
    let state = task.state
let t = that[state].get(task.id)
console.log(t)
t.aborted = "aborted"
console.log("aborted", task.id, task.aborted, t.state)
that[state].set(task.id,t)

  }
})
        }


      }
    });
  }


  get_agents(type) {
    return this.agents
      .filter((a) => a.type == type)
      .sort((a, b) => a.date - b.date);
  }

  listenAwareness1() {
    let awareness = this.yjs.awareness;
    awareness.on("update", (changes) => {
      this.log("      ", JSON.stringify(changes.updated[0]));
      // console.log(awareness.getStates());

      Array.from(awareness.getStates()).forEach((a) => {
        if (a[0] == changes.updated[0]) console.log(" updated", a);
      });

      this.agents = Array.from(awareness.getStates(), ([id, state]) => {
        state.clientId = id;
        return state;
      });

      this.brokers = this.agents
        .filter((a) => a.type == "broker")
        .sort((a, b) => a.date - b.date);
      this.workers = this.agents
        .filter((a) => a.type == "worker")
        .sort((a, b) => a.date - b.date);
      this.clients = this.agents
        .filter((a) => a.type == "client")
        .sort((a, b) => a.date - b.date);
      this._recense();
      this.prepare();

      // for (let [key, value] of awareness.getStates()) {
      //   console.log(key + " = " + value);
      //   }
      // //let agents = Array.from(awareness.getStates().values());
      // //this.log("######BROKER AWARENESS", agents.length, "agents");
      // let brokers = [];
      // // let agents = {}
      // awareness.getStates().forEach((a, clientId) => {
      //   //console.log(clientId, a)

      //   try {
      //     // agents[a.agent.type== undefined]? agents[a.agent.type] = []: null
      //     // agents[a.agent.type].push({clientId: a})
      //     this.log(
      //       clientId,
      //       a.name,
      //       a.type,
      //       // a.agent.type,
      //       a.state
      //       // a.agent.name,
      //       // a.agent.id,
      //       // a.agent.style
      //       // JSON.stringify(a.agent.id)
      //     );
      //     if (a.type == "broker") {
      //       brokers.push({
      //         id: a.id,
      //         clientId: clientId,
      //         //name: a.agent.name,
      //         date: a.date,
      //         // type: a.agent.type,
      //       });
      //     }
      //   } catch (e) {
      //     this.log(e, a);
      //   }
      // });
      // brokers = brokers.sort((a, b) => a.date - b.date);
      // console.log("brokers", brokers);
      // let active = brokers[0].id;

      // if (this.activeBroker.get("active") != active) {
      //   this.activeBroker.set("active", active);
      // }
      // this.log("active broker", brokers[0].id);
      // this.log("######BROKER AWARENESS", brokers.length, "brokers");

      // this.log("######BROKER agents", agents);
    });
  }

  /**
   * Méthode pour mettre à jour l'état local de l'agent dans l'awareness
   */
  setLocalState() {
    this.yjs.awareness.setLocalState({
      id: this.id,
      name: this.options.name,
      style: this.options.style,
      type: this.options.type,
      date: Date.now(),
    });
  }
}
