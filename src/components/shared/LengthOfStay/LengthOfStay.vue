<template>
  <div id="container">
  </div>
</template>

<script>
import DataController from '../../../controllers/DataController'

export default {
  props: {
    selectedDateRange: {
      type: Object
    },
    area: {
      type: Object
    }
  },
  data () {
    return {
      requestData: {
        customerId: 'c1',
        from: this.selectedDateRange.startDate,
        to: this.selectedDateRange.endDate,
        dataPointCount: 1,
        area: this.area
      }
    }
  },
  beforeMount () {
    this.controller = new DataController(this.$api)
  },
  mounted () {
    this.loadData()
    setInterval(this.loadData, 300000)
  },
  watch: {
    selectedDateRange: {
      handler: function (val) {
        this.requestData.from = val.startDate
        this.requestData.to = val.endDate

        diffMilliseconds = this.convertDateRangeToMilliseconds(this.requestData.from, this.requestData.to)
        diffDays = this.convertMillisecondsToDays(diffMilliseconds)

        if (val.timeZoneDifference) {
          var d = new Date(val.endDate)
          var hours = d.getHours()
          d.setHours(hours - (val.timeZoneDifference / 60))
          this.requestData.to = d.toISOString()
        }

        this.loadData()
      },
      deep: true
    }
  },
  methods: {
    loadData () {
      this.controller.getActiveCustomersData(this.requestData)
        .then(total => this.$emit('updateSubtitle', total.toString()))
    }
  }
}
</script>
