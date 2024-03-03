<template>
    <div>
WorkersView {{ agents && agents.length }}
{{ agents }}
    </div>
</template>

<script>
    export default {
        name: "WorkersView",
        watch: {
            agents() {
                console.log("AGENTS",this.agents)
            }   
        },
        computed: {
            agents() {
                return this.$store.state.core.agents
            }
        },
    }
</script>

<style scoped>

</style>