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
    }
  },
  data () {
    return {
      requestData: {
        customerId: 'c1',
        from: this.selectedDateRangeActive.startDate,
        to: this.selectedDateRangeActive.endDate,
        dataPointCount: 1
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
  methods: {
    loadData () {
      this.controller.getActiveCustomersData(this.requestData)
        .then(total => this.$emit('updateSubtitle', total.toString()))
    }
  }
}
</script>
