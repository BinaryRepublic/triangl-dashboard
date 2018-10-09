<template>
  <div>
    <div class="container-content">
      <Canvas class="module two space-right" title="Customers"/>
      <Canvas class="module one" title="Active Customers"/>
    </div>
  </div>
</template>

<script>
import Canvas from '../components/default/Canvas.vue'
// import CountCustomer from '../components/default/diagrams/CountCustomer.vue'

export default {
  components: {
    Canvas
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
