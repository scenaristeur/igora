import { User } from '@/lib/user.js';

const state = () => ({
user: new User({ name: "Youri l'UI" }),
awareness:null
})

const mutations = {
    setAwareness(state, awareness) {
        state.awareness = awareness
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
