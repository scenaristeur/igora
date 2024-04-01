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
    
    /**
     * Méthode pour écouter les changements d'état dans l'awareness
     */

    this.listenAwareness();
    /**
     * Méthode pour mettre à jour l'état de l'awareness
     */
    this.updateAwareness();


    this.listenTodos();
  }
  /**
   * Méthode pour écouter les changements sur la map todos
   */
  listenTodos() {
    this.todos.observeDeep((events, transaction) => {
      console.log("[broker] prepare TODOS")
      this.prepare();
    });
  }

  _recense(){
    let todos = Array.from(this.todos.values());
    let prepared = Array.from(this.prepared.values());
    let doing = Array.from(this.doing.values());
    let done = Array.from(this.done.values());
    this.log("active broker",this.activeBroker.get("active"))
    this.log(todos.length,"todos ",prepared.length,"prepared", doing.length, "doing", done.length, "done")

  }
  /**
   * Méthode pour préparer les tâches en attente
   */
  prepare() {
    this.yjs.awareness.setLocalStateField("truc", "machin")
    this.log("active broker",this.activeBroker.get("active"), "my id", this.id)

    if (this.activeBroker.get("active") == this.id) {
      //if this broker is the active broker
      this._recense()
      let todos = Array.from(this.todos.values());

      todos.forEach((todo) => {
        let job = this.todos.get(todo.id);
        this.log("job", JSON.stringify(job));
        let workers = Array.from(
          this.yjs.awareness.getStates().values()
        ).filter((a) => {
          return a.agent.type == job.type && a.agent.state == "ready";
        });
        this.log("workers", workers.length, JSON.stringify(workers));
        if (workers.length > 0) {
          job.worker = workers[0].agent.id;
          job.state = "prepared";
          job.worker = workers[0].agent.id;
          job.attemps = 1;
          job.start = Date.now();
          this.prepared.set(job.id, job);
          this.todos.delete(job.id);
          this.log(JSON.stringify(job));
          this.log("prepare job", job.id, "for worker ", workers[0].agent.id);
        } else {
          this.log("!!!!! no workers for job", job.id);
        }
      });
    }
  }

  /**
   * Méthode pour écouter les changements d'état des agents
   */
  listenAwareness() {
  
    let awareness = this.yjs.awareness;
    awareness.on("change", (changes) => {
      this.log("      ",JSON.stringify(changes))
      console.log(awareness.getStates())
      // for (let [key, value] of awareness.getStates()) {
      //   console.log(key + " = " + value);
      //   }
      // //let agents = Array.from(awareness.getStates().values());
      // //this.log("######BROKER AWARENESS", agents.length, "agents");
      let brokers = [];
      // let agents = {}
      awareness.getStates().forEach((a, clientId) => {
        console.log(clientId, a)
  
        try {
          // agents[a.agent.type== undefined]? agents[a.agent.type] = []: null
          // agents[a.agent.type].push({clientId: a})
          this.log(
            clientId,
            a.agent.name,
            a.agent.type,
            // a.agent.type,
            a.agent.state
            // a.agent.name,
            // a.agent.id,
            // a.agent.style
            // JSON.stringify(a.agent.id)
          );
          if (a.agent.type == "broker") {
            brokers.push({
              id: a.agent.id,
              clientId: clientId,
              //name: a.agent.name,
              date: a.agent.date,
             // type: a.agent.type,
            });
          }
        } catch (e) {
          this.log(e, a);
        }
      });
      brokers = brokers.sort((a, b) => a.date - b.date);
       console.log("brokers", brokers);
      let active = brokers[0].id;

      if (this.activeBroker.get("active") != active) {
        this.activeBroker.set("active", active);
      }
      this.log("active broker", brokers[0].id);
      this.log("######BROKER AWARENESS", brokers.length, "brokers");
      this._recense()
      // this.log("######BROKER agents", agents);
    });
  }

  /**
   * Méthode pour mettre à jour l'état local de l'agent dans l'awareness
   */
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


