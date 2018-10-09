<template>
  <div>
    <div class="container-content">
      <Canvas componentSize="two" componentName="CountCustomers" title="Customers" subTitle="75"/>
      <Canvas componentSize="one" componentName="ActiveCustomers" title="Active Customers" subTitle="21"/>
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
