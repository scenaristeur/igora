<template>
    <div>
        Prompt: <textarea cols="100" rows="3" v-model="prompt" @keyup.enter="send()"></textarea>
        <br>
        <button v-on:click="send()">Send</button><br>
        Temperature: <input type="number" v-model="temperature"> Seed: <input type="number" v-model="seed">
       System Prompt: <textarea cols="100" rows="6" v-model="systemPrompt"></textarea>
    </div>
</template>

<script>
export default {
    name: "SendView",
    data() {
        return {
            prompt: "un bar la nuit dans une ruelle sombre",
            agents: [{name: "romancier",
             systemPrompt: 
             `Tu es un écrivain romancier et tu dois décrire la scénario demandée par l'utilisateur avec un maximum de détails.
tu dois décrire les personnages qui s'y trouvent, l'ambiance, ce qu'ils font et tu dois imaginer une intrigue`}],
            systemPrompt: "",
            agent: "romancier",
            temperature: 0,
            seed: Math.floor(Math.random() * 100) + 1
        }
    },
    created(){
this.updateSystemPrompt()
    },
    methods: {
        updateSystemPrompt() {
            this.systemPrompt = this.agents.find(agent => agent.name === this.agent).systemPrompt
            console.log("systemPrompt",this.systemPrompt)
        },
        send() {
            console.log(this.prompt)

            let randomSeed = Math.floor(Math.random() * 100) + 1
            this.user.addTodo({prompt:this.prompt.trim(), systemPrompt: this.systemPrompt, temperature: this.temperature, seed:this.seed ||randomSeed})
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