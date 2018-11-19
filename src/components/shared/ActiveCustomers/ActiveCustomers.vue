<template>
  <div id="container">
  </div>
</template>

<script>
import DataController from '../../../controllers/DataController'

export default {
  props: {
    selectedDateRangeActive: {
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
  methods: {
    createRequestData () {
      var data = {
        customerId: 'c1',
        from: this.selectedDateRangeActive.startDate,
        to: this.selectedDateRangeActive.endDate,
        dataPointCount: 1
      }

      if (this.area !== undefined) data.area = { corners: this.area.points }

      return data
    },
    loadData () {
      this.controller.getActiveCustomersData(this.requestData)
        .then(total => this.$emit('updateSubtitle', total.toString()))
    }
  }
}
</script>
