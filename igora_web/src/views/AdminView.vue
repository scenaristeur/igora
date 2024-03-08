<template>
    <div>
        <h1>Admin</h1>

        <!-- <BrokersView /> -->
        <ConfigView />

        // BE CAREFULL //
        <button v-on:click="clean()" type="button" class="btn btn-warning">Clean</button>
    </div>
</template>

<script>
// import BrokersView from '@/views/BrokersView.vue'

import ConfigView from './ConfigView.vue'


export default {
    name: "AdminView",
    components: {
        // BrokersView,
        // WorkersView,
        // TasksView,
        ConfigView
    },
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

<style scoped></style>