<template>
    <div>
BrokersView
{{ awareness }}
    </div>
</template>

<script>
    export default {
        name: "BrokersView",
        computed: {
            awareness() {
                return this.$store.state.core.awareness
            }
        },
    }
</script>

<style scoped>

</style>