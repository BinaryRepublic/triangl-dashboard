<template>
  <div>
    <div class="container-content">
      <Module class="module two space-right">
      </Module>
      <Module class="module one"></Module>
    </div>
  </div>
</template>

<script>
import Module from '../components/default/Module.vue'
import CountCustomer from '../components/default/diagrams/CountCustomer.vue'

export default {
  components: {
    Module,
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
