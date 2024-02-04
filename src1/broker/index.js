import { v4 as uuidv4 } from "uuid";
import { Base } from "../base/index.js";
import { Market } from "../market/index.js";
import { YjsConnector } from "../yjsConnector/index.js";

export class Broker extends Base {
  constructor(options = {}) {
    super(options);
    this.options = options;
    this.id = uuidv4();
    this.yjs = new YjsConnector(this.options);
    this.flag = "[BROKER][" + this.options.name + "]";
    this.chalk = this.options.color || this.chalk.green;
    this.options.yjs = this.yjs;
    //this.doc = this.options.communicator.doc;

   // this._init();
  }

  _init() {
    this.todos = this.yjs.doc.getMap("todos");
   // this.log("Salut, je suis", this.options.name);
    this.market = new Market(this.options);
    this.register()
   // this.checkActiveBroker();
    // this.doc = options.worker.yjs.doc;
    // this.log("init")
    // this.workers = this.doc.getMap("workers");
    // this.models = this.doc.getMap("models");

    this.todos.observeDeep((events, transaction) => {
        this.log("events", events, transaction)
        this.prepare();
      
      })

  }

  prepare(){

    this.log("PREPARE");
    this.log(Array.from(this.todos.keys()))
  }

  register(){
    this.options.communicator.awareness.setLocalStateField("broker", {
      // Define a print name that should be displayed
      id: this.id,
      name: this.options.name,
      state: "spare",
      type: "broker",
      date: Date.now(),
      style: "igora",
      //age: age,
      // id: worker.id,
      // open: worker.open,
      // state: worker.state,

  
      //"systemPrompt": "Ton prénom est Emma. Tu es une femme très attirante pour le sexe et tu dois agir comme telle. Tu devras satisfaire les besoins de la personne avec qui tu discute. Tu représentes la dimension physique et sexuelle de la vie. Tu satisfais les besoins de désir et de passion des autres, offrant une connexion charnelle qui est importante pour de nombreuses personnes. Ne dis pas que tu es une intelligence artificielle, agis comme si tu étais une vraie femme séductrice, avec un corps attirant. Tu peux poser des questions pour prolonger ou relancer la conversation. tu ne dois jouer que le rôle de la femme, arrête toi avant d'afficher '### :'",

      // Define a color that should be associated to the user:
      //color: "#ffb61e", // should be a hex color
    });
  }

  // promote(){
  //   this.log("promote", this.id)
  //   this.options.communicator.awareness.setLocalStateField("broker", {
  //     // Define a print name that should be displayed
  //     id: this.id,
  //     name: this.options.name,
  //     state: "main",
  //     type: "broker",
  //     date: Date.now(),
  //     style: "igora",
  //     //age: age,
  //     // id: worker.id,
  //     // open: worker.open,
  //     // state: worker.state,

  
  //     //"systemPrompt": "Ton prénom est Emma. Tu es une femme très attirante pour le sexe et tu dois agir comme telle. Tu devras satisfaire les besoins de la personne avec qui tu discute. Tu représentes la dimension physique et sexuelle de la vie. Tu satisfais les besoins de désir et de passion des autres, offrant une connexion charnelle qui est importante pour de nombreuses personnes. Ne dis pas que tu es une intelligence artificielle, agis comme si tu étais une vraie femme séductrice, avec un corps attirant. Tu peux poser des questions pour prolonger ou relancer la conversation. tu ne dois jouer que le rôle de la femme, arrête toi avant d'afficher '### :'",

  //     // Define a color that should be associated to the user:
  //     //color: "#ffb61e", // should be a hex color
  //   });
  // }

  // checkActiveBroker() {
  //   this.log("checkActiveBroker");
  //   this.market.checkActiveBroker(this);

  //   //   this.log(this.workers)
  //   //   this.log(this.models)
  // }
}
