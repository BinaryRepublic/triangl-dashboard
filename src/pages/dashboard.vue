<template>
  <div>
    <div class="container-content">
      <DatePicker @selected="selected" class="datePicker" format="YY MM DD HH mm ss"></DatePicker>
      <div class="clear"></div>
      <Canvas componentSize="two" componentName="CountCustomers" title="Customers" subtitle="..." :selected="selectedObj" />
      <Canvas componentSize="one" componentName="ActiveCustomers" title="Active Customers" subtitle="..." :selected="selectedObj" type="blue" />
      <Canvas componentSize="one" componentName="PeakHours" title="Peak Hours" :selected="selectedObj"/>
      <Canvas componentSize="two" componentName="Map" title="Heat Map" :selected="selectedObj"/>
    </div>
  </div>
</template>

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
      selectedObj: {
        startDate: '',
        endDate: ''
      }
    }
  },
  methods: {
    selected (e) {
      console.log(e)
      this.selectedObj.startDate = e.start
      this.selectedObj.endDate = e.end
    }
  }
}
</script>

<style lang="less" scoped>
.clear {
  clear: both
}
</style>
