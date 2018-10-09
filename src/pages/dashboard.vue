<template>
  <div>
    <div class="container-content">
      <GraphCanvas class="module two space-right">
      </GraphCanvas>
      <GraphCanvas class="module one"></GraphCanvas>
    </div>
  </div>
</template>

<script>
import GraphCanvas from '../components/default/GraphCanvas.vue'
import CountCustomer from '../components/default/diagrams/CountCustomer.vue'

export default {
  components: {
    GraphCanvas,
    CountCustomer
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
