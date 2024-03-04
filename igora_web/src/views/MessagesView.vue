<template>
    <div>

<ul class="list-group small list-group-flush">
                    <li v-for="message in messages" :key="message.id"
                        :class="'list-group-item ' +
                         (message.role == 'assistant' ? 'list-group-item-dark assistant' : 'list-group-item-primary user')">
                       <b>{{ message.role }}  : </b>{{ message.content }}<br>{{ message.id }}
                    </li>

                </ul>
    </div>
</template>

<script>

// import TasksView from '@/views/TasksView.vue'
export default {
    name: "MessagesView",
    computed: {
        messages() {
            return this.$store.state.core.messages
        },
    }
}
</script>

<style scoped>
.user {
text-align: right;
}
.assistant{
    text-align: left;
}


</style>