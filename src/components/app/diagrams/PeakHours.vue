<template>
  <div id="container">
    <div id="heatmap"/>
  </div>
</template>

<script>
import anychart from 'anychart'
import DataController from '../../../controllers/DataController'

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
        this.loadData()
      },
      deep: true
    }
  },
  beforeMount () {
    this.controller = new DataController(this.$api)
  },
  mounted () {
    this.loadData()
  },
  data () {
    return {
      requestData: {
        customerId: 'c1',
        from: this.selected.startDate,
        to: this.selected.endDate
      }
    }
  },
  methods: {
    loadData () {
      this.controller.getPeekHoursData(this.requestData)
      .then(data => {
        let element = document.getElementById('heatmap')
        let child = element.children[0]
        if (child != null) {
          element.removeChild(child)
        }

        const chart = anychart.heatMap(data);
        chart.container('heatmap');
        chart.labels(false);
        chart.legend(true);
        chart.draw();

        let creditsElement = document.getElementsByClassName('anychart-credits')[0];
        creditsElement.parentNode.removeChild(creditsElement)
      })
    }
  }
}
</script>

<style lang="less">
#heatmap{
  height: 355px;
}
</style>
