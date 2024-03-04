<template>
    <div>
        <MessagesView />
        <label for="promptTextarea" class="form-label">Prompt</label>
        <textarea id="promptTextarea" class="form-control" rows="3" v-model="prompt" @keyup.enter="send()"></textarea>
        <button v-on:click="send()" type="button" class="btn btn-success">Send</button><br>

        <div class="row">
            <div class="col">
                <label for="temperatureRange" class="form-label">Temperature : {{ temperature }}</label>
            </div>
            <div class="col">
                <input type="range" class="form-range" min="0" max="1" step="0.1" id="temperatureRange"
                    v-model="temperature">
            </div>
            <div class="col">

                Seed: <input type="number" v-model="seed">


            </div>
        </div>
        <label for="systemPromptTextarea" class="form-label">System Prompt</label>

        <textarea id="systemPromptTextarea" class="form-control" rows="6" v-model="systemPrompt"></textarea>
    </div>
</template>

<script>
import MessagesView from './MessagesView.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
    name: "SendView",
    components: {
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
            temperature: 0.5,
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