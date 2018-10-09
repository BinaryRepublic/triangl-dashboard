<template>
  <div>
    <div class="container-content">
      <GraphCanvas class="module two space-right" title="Customers"/>
      <GraphCanvas class="module one" title="Active Customers"></GraphCanvas>
    </div>
  </div>
</template>

<script>
import GraphCanvas from '../components/default/GraphCanvas.vue'
// import CountCustomer from '../components/default/diagrams/CountCustomer.vue'

export default {
  components: {
    GraphCanvas
    // CountCustomer
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
