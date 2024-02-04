<template>
    <div>
{{ awareness }}
    </div>
</template>

<script>
    export default {
        name: "AwarenessView",
        computed: {
            awareness() {
      return this.$store.state.core.user.awareness
    },
}
    }
</script>

<style scoped>

</style>