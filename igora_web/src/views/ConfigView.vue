<template>
    <div>
        <h4>Config</h4>
        (not working yet)
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">yjs websocket server</span>
            <input type="text" class="form-control" v-model="yjs_url" placeholder="ex: http://localhost:1234"
                aria-label="yjs sebsocket server" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">room</span>
            <input type="text" class="form-control" v-model="yjs_room" placeholder="ex: market" aria-label="room"
                aria-describedby="basic-addon1">
        </div>

        <button v-on:click="updateConfig()" type="button" class="btn btn-success">update config</button>
    </div>
</template>

<script>
// import BrokersView from '@/views/BrokersView.vue'
// import WorkersView from '@/views/WorkersView.vue'
// import TasksView from '@/views/TasksView.vue'
export default {
    name: "ConfigView",
    components: {
        // BrokersView,
        // WorkersView,
        // TasksView
    },
    data() {
        return {
            yjs_url: "http://localhost:1234",
            yjs_room: "market"
        }
    },
    methods: {
        updateConfig() {
            setConfig({
                yjs_url: this.yjs_url,
                yjs_room: yjs_room
            })
        }
    },
    computed: {
        config() {
            return this.$store.state.core.config
        },
    }
}
</script>

<style scoped></style>