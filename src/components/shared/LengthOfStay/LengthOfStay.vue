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
      requestData: this.createRequestData()
    }
  },
  beforeMount () {
    this.controller = new DataController(this.$api, this.$auth)
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
    createRequestData () {
      var data = {
        customerId: 'c1',
        from: this.selectedDateRange.startDate,
        to: this.selectedDateRange.endDate
      }

      if (this.area !== undefined) data.areaDtos = [ { corners: this.area.points } ]
      return data
    },
    loadData () {
      this.controller.getLengthOfStay(this.requestData)
      .then(str => this.$emit('updateSubtitle', str))
    }
  }
}
</script>
