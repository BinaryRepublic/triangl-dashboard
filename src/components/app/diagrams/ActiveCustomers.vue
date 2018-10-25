<template>
  <div id="container">
  </div>
</template>

<script>
import DataController from '../../../controllers/DataController'

export default {
  props: {
    selectedActive: {
      type: Object
    }
  },
  data () {
    return {
      requestData: {
        customerId: 'c1',
        from: this.selectedActive.startDate,
        to: this.selectedActive.endDate,
        dataPointCount: 1
      }
    }
  },
  beforeMount () {
    this.controller = new DataController(this.$api)
  },
  mounted () {
    this.controller.getActiveCustomersData(this.requestData)
    .then(total => this.$emit('updateSubtitle', total))
  }
}
</script>
