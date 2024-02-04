<template>
    <div>
        <textarea name="" id="" cols="100" rows="3" v-model="prompt" @keyup.enter="send()"></textarea>
        <button v-on:click="send()">Send</button>
    </div>
</template>

<script>
export default {
    name: "SendView",
    data() {
        return {
            prompt: ""
        }
    },
    methods: {
        send() {
            console.log(this.prompt)

            let randomSeed = Math.floor(Math.random() * 100) + 1
            this.user.addTodo({prompt:this.prompt.trim(), temperature: 0, seed:randomSeed})
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