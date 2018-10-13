<template>
  <section class="lineGraph">
    <canvas id="countCustomersGraph"></canvas>
  </section>
</template>

<script>
import Chart from 'chart.js'
Chart.defaults.global.defaultFontSize = 12
Chart.defaults.global.defaultFontColor = 'rgb(170, 170, 170)'
// console.log(Chart.defaults.global)

export default {
  name: 'CountCustomer',
  mounted () {
    // this.$api.get('visitors/count')
    //   .then((response) => {
    //     const data = response.data
    //     const total = data.total
    //     var date, newDate
    //     for (var x = 0; x < data.data.length; x++) {
    //       this.chartData.datasets[0].data.push(data.data[x].count)
    //       date = data.data[x].to
    //       newDate = date.substring(11, 16)
    //       this.chartData.labels.push(newDate)
    //     }
    //     this.$emit('updateSubtitle', total)
    //     this.createChart('countCustomersGraph')
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  },
  data () {
    return {
      chartData: {
        labels: ['08:00'],
        datasets: [
          {
            type: 'line',
            data: [0],
            borderColor: 'rgb(57, 122, 242)',
            borderWidth: 2,
            color: 'rgba(255,0,0,1)',
            fill: false,
            pointRadius: 0,
            lineTension: 0,
            pointHoverRadius: 3,
            pointHitRadius: 20,
            pointHoverBackgroundColor: 'rgb(57, 122, 242)',
            pointHoverBorderWidth: 0
          }
        ]
      }
    }
  },
  methods: {
    createChart (chartId) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: {
          legend: false,
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 20,
                maxTicksLimit: 6
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                padding: 5
              }
            }]
          }
        }
      })
    }
  }
}
</script>
<style lang="less">
#countCustomersGraph{
  position: relative;
  left: -5px;
}
</style>
