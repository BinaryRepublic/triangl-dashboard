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
        this.requestData.from = val.startDate.toISOString()
        this.requestData.to = val.endDate.toISOString()
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
      },
    }
  },
  mounted () {
    this.apiRequest();
  },
  methods: {
    apiRequest () {
      this.$api.post('visitors/count', this.requestData)
      .then((res) => {
        const total = res.data.total;
        this.$emit('updateSubtitle', total)
      });
    }
  }
}
</script>
