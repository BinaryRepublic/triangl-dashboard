<template>
  <div id="container">
  </div>
</template>

<script>
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
  mounted () {
    this.apiRequest()
  },
  methods: {
    apiRequest () {
      this.$api.post('visitors/count', this.requestData)
        .then((res) => {
          const totalCustomers = res.data.total
          this.$emit('updateSubtitle', totalCustomers)
        })
    }
  }
}
</script>
