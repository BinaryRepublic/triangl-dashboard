<template>
  <div class="container-content">
    <DatePicker @selectedDateRange="getSelectedDateRange" />
    {{ spaceData }}
    <div class="clear"></div>
    <Module componentWidth="one" componentHeight="one">
      <ActiveCustomers/>
    </Module>
    <Module componentWidth="one" componentHeight="one">
      Aufenthaltsdauer
    </Module>
    <Module componentWidth="one" componentHeight="one">
      Durchlaufsrate
    </Module>
    <Module componentWidth="one">
      Peak Hours
    </Module>
    <Module componentWidth="two">
      Flow Diagram
    </Module>
  </div>
</template>

<script>
import Module from '../shared/ModuleTemplate/ModuleTemplate'
import ActiveCustomers from '../shared/ActiveCustomers/ActiveCustomers'
import PeakHours from '../shared/PeakHours/PeakHours'
import DatePicker from '../shared/DatePicker/DatePicker'

export default {
  components: { DatePicker, PeakHours, ActiveCustomers, Module },
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
