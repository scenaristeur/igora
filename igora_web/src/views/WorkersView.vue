<template>
    <div>
        WorkersView {{ agents && agents.length }}
        <!-- {{ agents }} -->



        <div class="row">
            <div class="col">
                Workers

                <!-- {{  workers }} -->
                <ul class="list-group small">
                    <li v-for="worker in workers" :key="worker.agent.id"
                        :class="'list-group-item ' + (worker.agent.state == 'working' ? 'list-group-item-dark' : 'list-group-item-primary')">
                        {{ worker.agent }} {{ worker.agent.type }}
                    </li>

                </ul>
            </div>
            <div class="col">
                Clients

                <!-- {{  workers }} -->
                <ul class="list-group">
                    <li v-for="client in clients" :key="client.id"
                        class="list-group-item">
                        {{ client }} 
                    </li>

                </ul>
            </div>
            <div class="col">
                Brokers

                <!-- {{  workers }} -->
                <ul class="list-group">
                    <li v-for="broker in brokers" :key="broker.agent.id"
                        class="list-group-item">
                        {{ broker.agent }} {{ broker.agent.type }}
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
    watch: {
        agents() {
            console.log("AGENTS", this.agents)
            let workers = this.agents.filter(agent => agent.agent.type == "text")
            this.workers = workers.sort((a, b) => b.agent.date - a.agent.date)
            this.clients = this.agents.filter(agent => agent.agent.type=="client")
            this.brokers = this.agents.filter(agent => agent.agent.type=="broker")

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