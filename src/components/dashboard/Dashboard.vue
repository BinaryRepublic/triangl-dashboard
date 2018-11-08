<template>
  <div class="container-content">
    <DatePicker @selectedDateRange="getSelectedDateRange" class="datePicker" format="YY MM DD HH mm ss"></DatePicker>
    <div class="clear"></div>
    <Module componentSize="two" title="Customers" :subtitle="countCustomersSubtitle">
      <CountCustomer :selectedDateRange="selectedDateRange" @updateSubtitle="(value) => { this.countCustomersSubtitle = value; }" />
    </Module>
    <Module componentSize="one" title="Active Customers" :subtitle="activeCustomersSubtitle" type="blue">
      <ActiveCustomers :selectedDateRangeActive="selectedDateRangeActive" @updateSubtitle="(value) => { this.activeCustomersSubtitle = value; }" />
    </Module>
    <Module componentSize="one" title="Peak Hours">
      <PeakHours :selectedDateRange="selectedDateRange" />
    </Module>
    <Module componentSize="two" title="Heat Map">
      <Map :selectedDateRange="selectedDateRange" />
    </Module>
  </div>
</template>

<script>
import Module from './DashboardModuleTemplate/DashboardModuleTemplate'
import DatePicker from './DashboardDatePicker/DashboardDatePicker'
import CountCustomer from './DashboardCountCustomers/DashboardCountCustomers'
import ActiveCustomers from './DashboardActiveCustomers/DashboardActiveCustomers'
import PeakHours from './DashboardPeakHours/DashboardPeakHours'
import Map from './DashboardMap/DashboardMap'

var n = new Date()

export default {
  components: {
    Module,
    DatePicker,
    CountCustomer,
    ActiveCustomers,
    PeakHours,
    Map
  },
  data () {
    return {
      selectedDateRange: {
        startDate: new Date(n.getFullYear(), n.getMonth(), n.getDate() - 6).toISOString(),
        endDate: new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59).toISOString(),
        timeZoneDifference: 0
      },
      selectedDateRangeActive: {
        startDate: new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours() - 1, n.getMinutes(), n.getSeconds(), n.getMilliseconds()).toISOString(),
        endDate: n.toISOString()
      },
      countCustomersSubtitle: '...',
      activeCustomersSubtitle: '...'
    }
  },
  methods: {
    getSelectedDateRange (e) {
      this.selectedDateRange.startDate = new Date(e.start.getFullYear(), e.start.getMonth(), e.start.getDate() - 1).toISOString()
      this.selectedDateRange.endDate = new Date(e.end.getFullYear(), e.end.getMonth(), e.end.getDate() - 1, 23, 59, 59).toISOString()

      var startTimeZone = e.start.getTimezoneOffset()
      var endTimeZone = e.end.getTimezoneOffset()
      this.selectedDateRange.timeZoneDifference = endTimeZone - startTimeZone
    }
  }
}
</script>

<style lang="less" scoped>
  .clear {
    clear: both
  }
</style>
