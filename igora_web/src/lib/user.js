import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { v4 as uuidv4 } from 'uuid'

 import store from '@/store';



// import { handleAction } from './helper'

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider(
  //'ws://localhost:9999',
  //'ws://localhost:1234',
  'wss://ylm-websocket.glitch.me',
  'market',
  doc
)

wsProvider.on('status', (event) => {
  console.log('Websocket provider', event.status) // logs "connected" or "disconnected"
})

// const workspace = doc.getMap("workspace");
const todos = doc.getMap('todos')
const prepared = doc.getMap('prepared')
const doing = doc.getMap('doing')
const done = doc.getMap('done')

export class User {
  constructor({ name = 'inconnu'}) {
    this.name = name
// this.callbacks = callbacks
    // console.log("store", store)
//handleAction("one")
    this.id = uuidv4()
    this.listening = []
    this.awareness = null
    this.connect()
  }

  log() {
    console.log(this.name)
    console.log(
      '#####todos doing done#####',
      Array.from(todos.keys()).length,
      Array.from(prepared.keys()).length,
      Array.from(doing.keys()).length,
      Array.from(done.keys()).length
    )
  }

  connect() {
    let user = this
    console.log('connect')
    this.awareness = wsProvider.awareness
    this.awareness.clientId = this.id
    this.awareness.on('change', (changes) => {
      // Whenever somebody updates their awareness information,
      // we log all awareness information from all users.
      let agents = Array.from(user.awareness.getStates().values())
      console.log('######AWARENESS', agents.length)
      store.commit("core/setAwareness", this.awareness )
      //this.callbacks.awarenessChanged(null, user.awareness)

      agents.forEach((a) => {
        try {
          console.log(a.agent.type, a.agent.state, a.agent.name, a.agent.id, a.agent.style, a)
        } catch (e) {
          console.log(e, a)
        }
      })
      console.log('#####', agents.length)
    })

    wsProvider.on('status', (event) => {
      console.log('wsProvider', event.status) // logs "connected" or "disconnected"
      user.state = event.status
      this.updateWorker()
    })

    doc.on('update', (update) => {
      //console.log(update)
      // let date = workspace.get("date");
      // console.log("date", date);
      //console.log("array", yarray.toArray() )
      // console.log("todo", todos.toJSON());
      // this.prepare();
      this.log()
      console.log('todo', todos.toJSON())
      console.log('prepared', prepared.toJSON())
      console.log('doing', doing.toJSON())
      console.log('done', done.toJSON())

      if (doing.size > 0) {
        console.log('doing', doing.entries())
        for (const value of doing.values()) {
          console.log('doing', value)
        }
      }

      // console.log("doing", doing.keys(), this.listening)

      //  Array.from(doing.toJSON()).forEach(doing_task => {
      //    console.log("doing", doing_task)
      //  })

      // let task = doing.get([this.listening[0]])
      // console.log("TASK0", task)
      // console.log("done", done)
      // Y.applyUpdate(doc2, update)
    })
  }

  updateWorker() {
    // workspace.set(worker.id, worker);

    let ui_client = {
      // Define a print name that should be displayed
      name: this.name,
      //age: age,
      id: this.id,
      //open: worker.open,
      state: this.state,
      style: 'catay:vue3:v1.0.0',
      // bind: "node-llama-cpp-v2",
      //"systemPrompt": "Ton prénom est Emma. Tu es une femme très attirante pour le sexe et tu dois agir comme telle. Tu devras satisfaire les besoins de la personne avec qui tu discute. Tu représentes la dimension physique et sexuelle de la vie. Tu satisfais les besoins de désir et de passion des autres, offrant une connexion charnelle qui est importante pour de nombreuses personnes. Ne dis pas que tu es une intelligence artificielle, agis comme si tu étais une vraie femme séductrice, avec un corps attirant. Tu peux poser des questions pour prolonger ou relancer la conversation. tu ne dois jouer que le rôle de la femme, arrête toi avant d'afficher '### :'",
      type: 'client'
      //date: Date.now(),
      // Define a color that should be associated to the user:
      //color: "#ffb61e", // should be a hex color
    }

    this.awareness.setLocalStateField('agent', ui_client)
  }

  addTodo(options) {
    let id = uuidv4()
    let todo = {
      id: id,
      asker: this.id,
      type: 'text',
      systemPrompt: options.systemPrompt || `Tu es un assistant chargé de répondre au mieux à la demande de l'utilisateur`,
      prompt: options.prompt || 'prompt',
      state: 'todo',
      seed: options.seed || 0,
      temperature: options.temperature || 0,
      date: Date.now()
    }
    console.log(todo)
    todos.set(id, todo)
    this.listening.push(id)
  }
  clean() {
    this.cleanTodos()
    this.cleanPrepared()
    this.cleanDoing()
    this.cleanDone()
  }
  cleanTodos() {
    for (const key of todos.keys()) {
      todos.delete(key)
    }
  }

  cleanPrepared() {
    for (const key of prepared.keys()) {
      prepared.delete(key)
    }
  }

  cleanDoing() {
    for (const key of doing.keys()) {
      doing.delete(key)
    }
  }

  cleanDone() {
    for (const key of done.keys()) {
      done.delete(key)
    }
  }
}
