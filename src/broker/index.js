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
    /**
     * Méthode pour écouter les changements d'état dans l'awareness
     */
    this.listenAwareness();
    /**
     * Méthode pour mettre à jour l'état de l'awareness
     */
    this.updateAwareness();
    /**
     * Map de todos pour les tâches en attente
     * @type {Y.Map<String, Task>}
     */
    this.todos = this.yjs.doc.getMap("todos");
    /**
     * Map de prepared pour les tâches prêtes à être exécutées
     * @type {Y.Map<String, Task>}
     */
    this.prepared = this.yjs.doc.getMap("prepared");
    /**
     * Méthode pour écouter les changements sur la map todos
     */
    this.listenTodos();
  }
  /**
   * Méthode pour écouter les changements sur la map todos
   */
  listenTodos() {
    this.todos.observeDeep((events, transaction) => {
      // console.log("events", events, transaction)
      this.prepare();
    });
  }

  /**
   * Méthode pour préparer les tâches en attente
   */
  prepare() {
    if (this.activeBroker.get("active") == this.id) {
      //if this broker is the active broker
      let todos = Array.from(this.todos.values());
      console.log("TODOS tasks", todos.length, todos);

      todos.forEach((todo) => {
        let job = this.todos.get(todo.id);
        console.log("job", job);
        let workers = Array.from(
          this.yjs.awareness.getStates().values()
        ).filter((a) => {
          return a.agent.type == job.type && a.agent.state == "ready";
        });
        console.log("workers", workers.length, workers);
        if (workers.length > 0) {
          job.worker = workers[0].agent.id;
          job.state = "prepared";
          job.worker = workers[0].agent.id;
          job.attemps = 1;
          job.start = Date.now();
          this.prepared.set(job.id, job);
          this.todos.delete(job.id);
          console.log(job);
          this.log("prepare job", job.id, "for worker ", workers[0].agent.id);
        } else {
          this.log("no workers for job", job.id);
        }
      });
    }
  }

  /**
   * Méthode pour écouter les changements d'état des agents
   */
  listenAwareness() {
    this.activeBroker = this.yjs.doc.getMap("activeBroker");
    let awareness = this.yjs.awareness;
    awareness.on("change", (changes) => {
      console.log(changes)
      let agents = Array.from(awareness.getStates().values());
      this.log("######BROKER AWARENESS", agents.length, "agents");
      let brokers = [];
      agents.forEach((a) => {
        try {
          this.log(
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

      if (this.activeBroker.get("active") != active) {
        this.activeBroker.set("active", active);
      }
      this.log("active broker", brokers[0].id + " " + brokers[0].name);
      this.log("######BROKER AWARENESS", brokers.length, "brokers");
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


