import { User } from '@/lib/user.js';


const state = () => ({
  user: new User({
    name: "Youri l'UI"
    // , callbacks:{
    //   awarenessChanged: mutations.test
    // }

  }),
  awareness: null,
  agents: null,
  messages: [
    // { id: 1, role: "user", content: "Bonjour" },
    // { id: 2, role: "assistant", content: "Bonjour, comment puis-je vous aider aujourd'hui ?" }
  ]
})

const mutations = {
  //   setAgents(state, agents) {
  //     console.log("agents", agents.length)
  // state.agents = agents
  //   },
  setAwareness(state, awareness) {
    state.awareness = awareness
    state.agents = Array.from(awareness.getStates().values())
    console.log('AAAAAAAAAAAAAA in store', state.agents.length)

    // // state.agents = [...agents]
    // // console.log(state.agents)
    // this.commit('core/setAgents', agents)
  },
  updateAwareness(state, data) {
    state.awareness.setLocalStateField("truc", data)

  },
  test(state, data) {
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC", data, state)
  },
  pushMessage(state, message) {
    // if (message.partial == true && message.role == "assistant") {
      state.messages = state.messages.filter(function (item) {
        return !(item.id == message.id && item.role == message.role)
      })
      console.log("filtered messages", state.messages)

    // } 
      state.messages.push(message)
  
  }
  //   initChat(state, options) {
  //     state.target = options
  //     state.target.system_prompt =
  //       state.system_prompts[state.target.sexe][state.target.type][state.lang]
  //     console.log(state.target)
  //     state.sexe = options.sexe
  //     state.type = options.type
  //     state.system_prompt = state.system_prompts[state.sexe][state.type][state.lang]
  //   },
  //   setResponse(state, r) {
  //     state.response = r
  //     console.log(state.response)
  //   },

}

const actions = {
  vuexAction(context, data) {
    console.log(data)
  }
  //   async embedGraph(context, input) {
  //     //let documents = [input]
  //     let uid = context.state.uid
  //     if (uid == undefined) {
  //       uid = uuidv4()
  //       context.commit('setUid', uid)
  //     }

  //     let query = {
  //       rid: uuidv4(),
  //       uid: uid,
  //       documents: input
  //     }

  //     await axios
  //       .post(context.state.server_url+"/embedAndSim", {
  //         query
  //       })
  //       .then((response) => {
  //         console.log('response', response)
  //         context.commit('setResponse', response.data)
  //         // this.messages.push({
  //         //   role: 'assistant',
  //         //   content: response.data, // Access the 'data' property of the response object
  //         // });
  //         //console.log(this.context.state.allEmbeds)
  //       })
  //   }

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
