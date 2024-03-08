<template>
  <main>
    <!-- <TheWelcome /> -->
    <!-- <AdminView /> --> 
    <WorkersView />
        <TasksView />
  </main>
</template>



<script >
// import TheWelcome from '../components/TheWelcome.vue'
import WorkersView from '@/views/WorkersView.vue'
import TasksView from '@/views/TasksView.vue'


export default {
    name: "HomeView",

components: {
        // BrokersView,
        WorkersView,
        TasksView,
    
    }

  }

</script>


