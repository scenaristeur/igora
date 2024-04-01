<template>


<div class="card">
  <div class="card-header">

    <div class="row">
        <div class="col">
            <IgoraMenu />
        </div>
            <div class="col-6">
                <label for="temperatureRange" class="form-label">Temp : {{ temperature }}</label>
       
                <input type="range" class="form-range w-50" min="0" max="1" step="0.1" id="temperatureRange"
                    v-model="temperature">
            </div>
            <div class="col-3">

                Seed: <input class="w-50" type="number" v-model="seed">


            </div>
        </div>
  </div>
  <div class="card-body">

    <MessagesView />
  </div>
  <div class="card-footer text-body-secondary">
    <!-- SEnd
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a> -->
    <!-- <label for="promptTextarea" class="form-label">Prompt</label> -->
    <div class="row">
        <div class="col">
        <textarea id="promptTextarea" class="form-control" rows="2" v-model="prompt" @keyup.enter="send()"></textarea>
       </div>
       <div class="col-2">
         <button v-on:click="send()" type="button" class="btn btn-primary">Send</button>
        
         <button v-on:click="change()" type="button" class="btn btn-success">change</button><br>

        </div>
    </div>
  </div>

</div>
<label for="systemPromptTextarea" class="form-label">System Prompt</label>

<textarea id="systemPromptTextarea" class="form-control" rows="4" v-model="systemPrompt"></textarea>

</template>


<script>
import IgoraMenu from './IgoraMenu.vue'
import MessagesView from './MessagesView.vue';
import { v4 as uuidv4 } from 'uuid'

export default {
    name: "IgoraChat",
    components  :{
        IgoraMenu,
        MessagesView
    },
    data() {
        return {
            prompt: "un bar la nuit dans une ruelle sombre",
            agents: [{
                name: "romancier",
                systemPrompt:
                    `Tu es un écrivain romancier et tu dois décrire la scénario demandée par l'utilisateur avec un maximum de détails.
tu dois décrire les personnages qui s'y trouvent, l'ambiance, ce qu'ils font et tu dois imaginer une intrigue`}],
            systemPrompt: "",
            agent: "romancier",
            temperature: 0,
            seed: Math.floor(Math.random() * 100) + 1
        }
    },
    created() {
        this.updateSystemPrompt()
    },
    methods: {
        updateSystemPrompt() {
            this.systemPrompt = this.agents.find(agent => agent.name === this.agent).systemPrompt
            console.log("systemPrompt", this.systemPrompt)
        },
        change(){
            this.$store.commit("core/updateAwareness", Date.now())
        },
        send() {
            console.log(this.prompt, this.seed)

            let randomSeed = Math.floor(Math.random() * 100) + 1
            let prompt = this.prompt.trim()
            let id = uuidv4()
            this.$store.commit("core/pushMessage", { id: id, role: "user", content: prompt })
            this.user.addTodo({ id: id, prompt: prompt, systemPrompt: this.systemPrompt, temperature: parseFloat(this.temperature), seed: this.seed || randomSeed })
            this.prompt = ""

        }
    },
    computed: {
        user() {
            return this.$store.state.core.user
        },
    }

}
</script>

<style scoped></style>