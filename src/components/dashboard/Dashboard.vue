<template>
  <div class="container-content">
    <DatePicker @selected="selected" class="datePicker" format="YY MM DD HH mm ss"></DatePicker>
    <div class="clear"></div>
    <Canvas componentSize="two" title="Customers" :subtitle="countCustomersSubtitle">
      <CountCustomer :selected="selectedObj" @updateSubtitle="(value) => { this.countCustomersSubtitle = value; }" />
    </Canvas>
    <Canvas componentSize="one" title="Active Customers" :subtitle="activeCustomersSubtitle" type="blue">
      <ActiveCustomers :selectedActive="selectedObjActive" @updateSubtitle="(value) => { this.activeCustomersSubtitle = value; }" />
    </Canvas>
    <Canvas componentSize="one" title="Peak Hours">
      <PeakHours :selected="selectedObj" />
    </Canvas>
    <Canvas componentSize="two" title="Heat Map">
      <Map :selected="selectedObj" />
    </Canvas>
  </div>
</template>

<script>
import Canvas from './DashboardCanvasTemplate/DashboardCanvasTemplate'
import DatePicker from './DashboardDatePicker/DashboardDatePicker'
import CountCustomer from './DashboardCountCustomers/DashboardCountCustomers'
import ActiveCustomers from './DashboardActiveCustomers/DashboardActiveCustomers'
import PeakHours from './DashboardPeakHours/DashboardPeakHours'
import Map from './DashboardMap/DashboardMap'

var n = new Date()

export default {
  components: {
    Map,
    PeakHours,
    ActiveCustomers,
    CountCustomer,
    Canvas,
    DatePicker
  },
  data () {
    return {
      selectedObj: {
        startDate: new Date(n.getFullYear(), n.getMonth(), n.getDate() - 6).toISOString(),
        endDate: new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59).toISOString(),
        timeZoneDifference: 0
      },
      selectedObjActive: {
        startDate: new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours() - 1, n.getMinutes(), n.getSeconds(), n.getMilliseconds()).toISOString(),
        endDate: n.toISOString()
      },
      countCustomersSubtitle: '...',
      activeCustomersSubtitle: '...'
    }
  },
  methods: {
    selected (e) {
      this.selectedObj.startDate = new Date(e.start.getFullYear(), e.start.getMonth(), e.start.getDate() - 1).toISOString()
      this.selectedObj.endDate = new Date(e.end.getFullYear(), e.end.getMonth(), e.end.getDate() - 1, 23, 59, 59).toISOString()

      var startTimeZone = e.start.getTimezoneOffset()
      var endTimeZone = e.end.getTimezoneOffset()
      this.selectedObj.timeZoneDifference = endTimeZone - startTimeZone
    }
  }
}
</script>

<style lang="less" scoped>
  .clear {
    clear: both
  }
</style>
