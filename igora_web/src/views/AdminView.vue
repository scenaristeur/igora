<template>
    <div>
        <h1>ADMIN</h1>

        <!-- <BrokersView /> -->
        <WorkersView />
        <TasksView />
        // BE CAREFULL //
        <button v-on:click="clean()">Clean</button>
    </div>
</template>

<script>
import BrokersView from '@/views/BrokersView.vue'
import WorkersView from '@/views/WorkersView.vue'
import TasksView from '@/views/TasksView.vue'
export default {
    name: "AdminView",
    components: {
        BrokersView,
        WorkersView,
        TasksView
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