<template>
  <div>
    <div class="container-content">
      <Canvas componentSize="two" componentName="CountCustomers"/>
      <Canvas componentSize="one" componentName="ActiveCustomers"/>
      <Canvas componentSize="one" componentName="PeakHours"/>
      <Canvas componentSize="three" componentName="Map"/>
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
