<template>
    <div>
<h1>ADMIN</h1>

// BE CAREFULL //
<button v-on:click="clean()">Clean</button>
    </div>
</template>

<script>
    export default {
        name: "AdminView",
        methods: {
clean() {
    this.user.clean()
}
        },
        computed: {
        user() {
            return this.$store.state.core.user
        },
    }
    }
</script>

<style scoped>

</style>