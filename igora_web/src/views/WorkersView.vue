<template>
    <div>
        WorkersView {{ agents && agents.length }}
        <!-- {{ agents }} -->



        <div class="row">
            <div class="col">
                Workers

                <!-- {{  workers }} -->
                <ul class="list-group small">
                    <li v-for="worker in workers" :key="worker.id"
                        :class="'list-group-item ' + (worker.state == 'working' ? 'list-group-item-dark' : 'list-group-item-primary')">
                        {{ worker }} {{ worker.type }}
                    </li>

                </ul>
            </div>
            <div class="col">
                Clients

                <!-- {{  workers }} -->
                <ul class="list-group">
                    <li v-for="client in clients" :key="client.id"
                        class="list-group-item">
                        {{ client.name }} {{ client.style }} {{  client.id }}
                    </li>

                </ul>
            </div>
            <div class="col">
                Brokers

                <!-- {{  workers }} -->
                <ul class="list-group">
                    <li v-for="broker in brokers" :key="broker.id"
                        class="list-group-item">
                        {{ broker.id }}
                    </li>

                </ul>
            </div>
            <div class="col">
                Tasks
                <ul class="list-group  list-group-flush">
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                    <li class="list-group-item">A fourth item</li>
                    <li class="list-group-item">And a fifth one</li>
                </ul>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    name: "WorkersView",
    data() {
        return {
            workers: [],
            clients: [],
            brokers: []
        }
    },
    watch: {
        agents() {
            console.log("AGENTS", this.agents)
            let workers = this.agents.filter(agent => agent.type == "worker")
            this.workers = workers.sort((a, b) => b.date - a.date)
            this.clients = this.agents.filter(agent => agent.type=="client")
            this.brokers = this.agents.filter(agent => agent.type=="broker")

        }
    },
    computed: {
        agents() {
            return this.$store.state.core.agents
        }
    },
}
</script>

<style scoped></style>