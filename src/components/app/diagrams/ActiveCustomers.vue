<template>
  <div id="container">
  </div>
</template>

<script>

export default {
  props: {
    selected: {
      type: Object
    }
  },
  watch: {
    selected: {
      handler: function (val) {
        this.requestData.from = new Date(val.startDate.getFullYear(), val.startDate.getMonth(), val.startDate.getDate() - 1).toISOString()
        this.requestData.to = new Date(val.endDate.getFullYear(), val.endDate.getMonth(), val.endDate.getDate() - 1, 23, 59, 59).toISOString()
        this.apiRequest()
      },
      deep: true
    }
  },
  data () {
    return {
      requestData: {
        customerId: 'c1',
        from: this.selected.startDate,
        to: this.selected.endDate,
        dataPointCount: 1
      }
    }
  },
  mounted () {
    this.apiRequest()
  },
  methods: {
    apiRequest () {
      console.log(this.requestData)
      this.$api.post('visitors/count', this.requestData)
        .then((res) => {
          const total = res.data.total
          this.$emit('updateSubtitle', total)
        })
    }
  }
}
</script>
