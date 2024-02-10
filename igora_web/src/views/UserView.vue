<template>
    <h1>{{ user.name }}</h1>
    {{ user.id }} {{ user.state }}
    <!-- <hr>
    <button v-if="user.state != 'connected'" v-on:click="connect()">Connect</button> -->

</template>
  
<script>




export default {
    name: "UserView",
    data() {
        return {


        }
    },
    created() {
        console.log("created")
        this.user.log()
        if(this.user.state!= 'connected'){
            this.user.connect()
        }

    },
    methods: {
        connect() {
            console.log('connec')
            this.user.connect()
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
  