<template>
  <div>
    <div class="container-content">
      <DatePicker class="datePicker"></DatePicker>
      <div class="clear"></div>
      <Canvas componentSize="two" componentName="CountCustomers" title="Customers" subtitle="..."/>
      <Canvas type="blue" componentSize="one" componentName="ActiveCustomers" title="Active Customers" subtitle="..."/>
      <Canvas componentSize="one" componentName="PeakHours" title="Peak Hours"/>
      <Canvas componentSize="two" componentName="Map" title="Heat Map"/>
    </div>
  </div>
</template>
e
<script>
import Canvas from '../components/app/elements/Canvas.vue'
import DatePicker from '../components/app/elements/DatePicker.vue'

export default {
  mounted () {
  },
  components: {
    Canvas,
    DatePicker
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.clear {
  clear: both
}
</style>
