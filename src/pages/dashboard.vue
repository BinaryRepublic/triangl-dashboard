<template>
  <div>
    <div class="container-content">
      <Canvas componentSize="two" componentName="CountCustomers" title="Customers" subtitle="75"/>
      <Canvas type="blue" componentSize="one" componentName="ActiveCustomers" title="Active Customers" subtitle="..."/>
      <Canvas componentSize="one" componentName="PeakHours" title="Peak Hours"/>
      <Canvas componentSize="three" componentName="Map" title="Heat Map"/>
    </div>
  </div>
</template>

<script>
import Canvas from '../components/app/elements/Canvas.vue'

export default {
  mounted () {

  },
  components: {
    Canvas
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>

</style>
