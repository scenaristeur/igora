<template>

    shouldScroll {{ shouldScroll }}
    <div id="messages" ref="messages">
        <!-- {{  messages }} -->
        <ul class="list-group small list-group-flush">
            <li v-for="message in messages" :key="message.id"
                :class="'list-group-item ' +
        (message.role == 'assistant' ? 'list-group-item-dark assistant' : 'list-group-item-primary user')">
                <b>{{ message.role }} : </b>
                <!-- {{ message.content }} -->
                <VueMarkdown :source="message.content" />
                <!-- <br>{{ message.id }}  -->
                <span v-if="message.partial"> ⌛</span>
            </li>

        </ul>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown-render'
// import TasksView from '@/views/TasksView.vue'
export default {
    name: "MessagesView",
    components: {
        VueMarkdown
    },
    data() {
        return {
            shouldScroll: true
        }
    },
    watch: {
        messages() {
            // this.shouldScroll = this.$refs.messages.scrollTop + this.$refs.messages.clientHeight === this.$refs.messages.scrollHeight;
            console.log("top", this.$refs.messages.scrollTop)
            console.log("height", this.$refs.messages.scrollHeight, "offset", this.$refs.messages.offsetHeight, "subs"
                , this.$refs.messages.scrollHeight - this.$refs.messages.offsetHeight)


            if (this.$refs.messages.scrollTop > (this.$refs.messages.scrollHeight - this.$refs.messages.offsetHeight-50)) {
                this.shouldScroll = true

            }
            else {
                this.shouldScroll = false
            }


            console.log("message changed", this.shouldScroll)
            if (this.shouldScroll) {
                console.log("scroll")
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            }
        }
    },

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

.assistant {
    text-align: left;
}

#messages {
    height: 400px;
    overflow-y: auto;
}
</style>