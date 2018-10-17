<template>
  <div>
    <div class="container-content">
      <DatePicker @selected="selected" class="datePicker" format="YY MM DD HH mm ss"></DatePicker>
      <div class="clear"></div>
      <Canvas componentSize="two" componentName="CountCustomers" title="Customers" subtitle="..." :selected="selectedObj" />
      <Canvas componentSize="one" componentName="ActiveCustomers" title="Active Customers" subtitle="..." :selectedActive="selectedObjActive" type="blue" />
      <Canvas componentSize="one" componentName="PeakHours" title="Peak Hours" :selected="selectedObj"/>
      <Canvas componentSize="two" componentName="Map" title="Heat Map" :selected="selectedObj"/>
    </div>
  </div>
</template>

<script>
import Canvas from '../components/app/elements/Canvas.vue'
import DatePicker from '../components/app/elements/DatePicker.vue'

var n = new Date()
console.log(n)

export default {
  components: {
    Canvas,
    DatePicker
  },
  data () {
    return {
      selectedObj: {
        startDate: new Date(n.getFullYear(), n.getMonth(), n.getDate() - 6).toISOString(),
        endDate: new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59).toISOString()
      },
      selectedObjActive: {
        startDate: new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours() - 1, n.getMinutes(), n.getSeconds(), n.getMilliseconds()).toISOString(),
        endDate: n.toISOString()
      }
    }
  },
  methods: {
    selected (e) {
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
