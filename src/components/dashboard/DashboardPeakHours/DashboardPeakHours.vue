<template>
  <div id="container">
    <div id="legend-container">
      <div id="legend"/>
      <div id="legend-text-left"><font size="-1">0</font></div>
      <div id="legend-text-right"><font size="-1">1000+</font></div>
    </div>
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
        this.requestData.from = val.startDate
        this.requestData.to = val.endDate
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

          const chart = anychart.heatMap(data)
          chart.container('heatmap')
          chart.labels(false)
          chart.legend(false)
          chart.draw()

          let creditsElement = document.getElementsByClassName('anychart-credits')[0]
          creditsElement.parentNode.removeChild(creditsElement)
        })
    }
  }
}
</script>

<style lang="less">
#heatmap{
  height: 315px;
  /*width: 80%;*/
}
#legend{
  background-image: linear-gradient(to right, #90caf9 , #01579b);
  height: 25px;
}
#legend-text-left{
  float: left;
}
#legend-text-right{
  float: right;
}
</style>
