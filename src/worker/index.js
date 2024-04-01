import { Base } from "../base/index.js";
import { McConnector } from "../mcConnector/index.js";
import { YjsConnector } from "../yjsConnector/index.js";

/**
 * Classe représentant un Worker
 * Un Worker est un agent qui va travailler sur des tâches en attente
 * Il est lié à un projet (McConnector) et à une liste de tâches prêtes
 * (YjsConnector)
 */
export class Worker extends Base {
  /**
   * Constructeur de la classe Worker
   * @param {Object} options Options pour initialiser le Worker
   */
  constructor(options = {}) {
    super(options);
    /**
     * Type du Worker
     * @type {String}
     */
    this.options.type = "worker";
    /**
     * Style de la console pour les logs du Worker
     * @type {String}
     */
    this.options.style = "text";
    this.options.engine = "node-llama-cpp"
    /**
     * Flag pour les logs du Worker
     * @type {String}
     */
    this.options.state = "ready";
    /**
     * Flag pour les logs du Worker
     * @type {String}
     */
    this.flag = "[WORKER][" + this.options.name + "]";
    /**
     * Couleur pour les logs du Worker
     * @type {Function}
     */
    this.chalk = this.chalk.yellow;
    /**
     * Instance de YjsConnector pour communiquer avec la liste des tâches prêtes
     * @type {YjsConnector}
     */
    this.yjs = new YjsConnector(this.options);
    /**
     * Instance de McConnector pour communiquer avec le projet lié
     * @type {McConnector}
     */
    this.mcConnector = new McConnector(this.options);
    /**
     * Méthode pour mettre à jour l'état de l'awareness
     */
    this.setLocalState();
    /**
     * Map de tâches prêtes pour être traitée
     * @type {Y.Map<String, Task>}
     */
    this.prepared = this.yjs.doc.getMap("prepared");
    /**
     * Map de tâches en cours de traitement
     * @type {Y.Map<String, Task>}
     */
    this.doing = this.yjs.doc.getMap("doing");
    /**
     * Map de tâches terminées
     * @type {Y.Map<String, Task>}
     */
    this.done = this.yjs.doc.getMap("done");
    /**
     * Méthode pour écouter les changements dans la liste des tâches prêtes
     */
    this.listenPrepared();
  }

  /**
   * Méthode pour écouter les changements dans la liste des tâches prêtes
   */
  listenPrepared() {
    this.prepared.observeDeep((events, transaction) => {
      //this.log("events", JSON.stringify(events), transaction)
      this.prepare();
    });
  }

  /**
   * Prépare les tâches prêtes pour être traitée
   * Cette fonction est appelée quand on ajoute une tâche
   * dans la liste "prepared"
   */
  prepare() {
    this.log("prepare");
    let tasks = Array.from(this.prepared.values());

    tasks.forEach((task) => {
      // console.log("task", task)
      if (task.worker == this.id) {
        this.processTask(task);
      }
    });
    //   if(tasks.length>0){
    //     this.options.state = "working";
    //     this.updateAwareness();
    //   }
  }

  /**
   * Traite une tâche, en l'ajoutant dans la liste "doing"
   * et en appelant le mcConnector pour générer la réponse
   * @param {*} task
   */
  processTask(task) {
    this.log("processTask", task.id, "llm state", this.mcConnector.state);
    if (this.mcConnector && this.mcConnector.state == "ready") {
      this.options.state = "working";
      task.state="doing"
      this._updateState("working");
      this.log("process task", task.id);
      this.doing.set(task.id, task);
      this.prepared.delete(task.id);
      this.process_doing_mc(task.id);
    }
  }

  /**
   * Traite une tâche en cours, en appelant le mcConnector
   * pour générer la réponse associée
   * @param {string} id l'id de la tâche
   */
  async process_doing_mc(id) {
    const abortController = new AbortController()
    let current = this.doing.get(id);
    
    //console.log("!!!!!! PROCESSING ", current)
    if (current.systemPrompt == undefined || current.systemPrompt.length == 0) {
      current.systemPrompt =
        this.options.systemPrompt ||
        "Tu es une petite souris et tu dois agir comme telle, en finissant toutes te phrases par 'Hi!Hi!Hi'";
    }
    //current.temperature = this.options.temperature || 0.7
    //current.seed = this.options.seed
    this.log("process_doing_mc", id, "llm state", this.mcConnector.state);
    current.response = "";
    let cpt = 0
    const response = await this.mcConnector.chat({ current: current, abortSignal: abortController.signal },  (token) => {
      //process.stdout.write(token);
      let aborted_test = this.doing.get(current.id)
    
      current.response += token;
      current.delta = { role: "assistant", content: token };
      current.chunkDate = Date.now();
   

    
      if(aborted_test!= undefined &&aborted_test.aborted == "aborted"){

        console.log("ABORTING", id)
        abortController.abort()
      }
         this.doing.set(current.id, current);
 
      // if (cpt >3){
      //   abortController.abort()
      // }else{cpt ++
      //   console.log(cpt)
      // }

    });

    //this.log(`Total text length: ${current.response.length}`);

    current.end = Date.now();

    current.state = "done";
    current.duration = current.end - current.start;
    //console.log("done", current);
    this.done.set(current.id, current);
    this.doing.delete(current.id);
    this.options.state = "ready";
    this.log("DONE", current.id);
    // this.prepare();
    this._updateState("ready");
  }

  _updateState(state){
    this.yjs.awareness.setLocalStateField("state",state)
  }
  /**
   * Met à jour les informations de l'agent dans la liste d'awareness
   */
  setLocalState() {
    this.yjs.awareness.setLocalState({
      id: this.id,
      name: this.options.name,
      style: this.options.style,
      type: this.options.type,
      engine: this.options.engine,
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
