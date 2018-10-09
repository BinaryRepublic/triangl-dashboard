<template>
  <section class="lineGraph">
    <canvas id="userChart"></canvas>
  </section>
</template>

<script>
import Chart from 'chart.js'
import chartData from '../../../chart-data.js'
Chart.defaults.global.defaultFontSize = 12
Chart.defaults.global.defaultFontColor = 'rgb(170, 170, 170)'
// Chart.defaults.global.defaultFontFamily = 'lato-regular, sans-serif'
console.log(Chart.defaults.global)


export default {
  name: 'CountCustomer',
  mounted () {
    this.createChart('userChart', this.chartData)
  },
  data () {
    return {
      chartData: chartData
    }
  },
  methods: {
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  }
}
</script>
<style lang="less">
#userChart{
  position: relative;
  left: -5px;
}
</style>
