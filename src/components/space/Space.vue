<template>
  <div class="container-content">
    <DatePicker @selectedDateRange="getSelectedDateRange" />
    <div class="clear"></div>
    <Module componentWidth="one" componentHeight="one" title="Active Customers" :subtitle="activeCustomersSubtitle" type="blue">
      <ActiveCustomers :area="this.spaceData" :selectedDateRangeActive="selectedDateRangeActive" @updateSubtitle="(value) => { this.activeCustomersSubtitle = value; }"/>
    </Module>
    <Module componentWidth="one" componentHeight="one" title="Length of Stay" :subtitle="lengthOfStaySubtitle">
      <LengthOfStay :area="this.spaceData" :selectedDateRange="selectedDateRange" @updateSubtitle="(value) => { this.lengthOfStaySubtitle = value; }"/>
    </Module>
    <Module componentWidth="one" componentHeight="one" title="Durchlaufsrate" :subtitle="dlrSubtitle">
      
    </Module>
    <Module componentWidth="one" title="Peak Hours">
      <PeakHours :selectedDateRange="selectedDateRange" />
    </Module>
    <Module componentWidth="two">
      Flow Diagram
    </Module>
  </div>
</template>

<script>
import Module from '../shared/ModuleTemplate/ModuleTemplate'
import ActiveCustomers from '../shared/ActiveCustomers/ActiveCustomers'
import LengthOfStay from '../shared/LengthOfStay/LengthOfStay'
import PeakHours from '../shared/PeakHours/PeakHours'
import DatePicker from '../shared/DatePicker/DatePicker'

var n = new Date()

export default {
  components: { DatePicker, PeakHours, ActiveCustomers, LengthOfStay, Module },
  props: {
    id: {
      type: String
    }, 
    spaceData: {
      type: Object
    }
  },
  beforeMount () {
    try {
      this.spaceData = JSON.parse(atob(this.id))
    } catch (_) {
      this.$router.push('/')
    }
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
      activeCustomersSubtitle: '...',
      lengthOfStaySubtitle: '...',
      dlrSubtitle: '...'
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
