<!--suppress ALL -->
<template>
  <section class="lineGraph">
    <canvas id="countCustomersGraph"></canvas>
  </section>
</template>

<script>
import Chart from 'chart.js'
Chart.defaults.global.defaultFontSize = 12
Chart.defaults.global.defaultFontColor = 'rgb(170, 170, 170)'

export default {
  name: 'CountCustomer',
  props: {
    selected: {
      type: Object
    }
  },
  watch: {
    selected: {
      handler: function (val) {
        console.log(val)
        // const n = new Date()
        // var today = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0, 1).toISOString()
        // var yesterday = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 1).toISOString()
        // var last7Days = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 6, 0, 1).toISOString()
        // var last14Days = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 13, 0, 1).toISOString()

        this.requestData.from = val.startDate.toISOString()
        this.requestData.to = val.endDate.toISOString()

        // switch (val.startDate.toISOString()) {
        //   case today:
        //   case yesterday:
        //     this.requestData.dataPointCount = 24
        //     this.filter.type = 'hours'
        //     // this.requestData.from = new Date(val.startDate.getFullYear(), val.startDate.getMonth(), val.startDate.getDate(), 0, 0, 0).toISOString()
        //     // this.requestData.to = new Date(val.endDate.getFullYear(), val.endDate.getMonth(), val.endDate.getDate(), val.endDate.getHours(), val.endDate.getMinutes(), val.endDate.getSeconds()).toISOString()
        //     break
        //   case last7Days:
        //     this.requestData.dataPointCount = 7
        //     this.filter.type = 'days'
        //     break
        //   case last14Days:
        //     this.requestData.dataPointCount = 13
        //     this.filter.type = 'days'
        //     break
        //   default:
        //     var dateObjFrom = new Date(this.requestData.from)
        //     var dateObjTo = new Date(this.requestData.to)
        //     var diffMilliSeconds = Math.abs(dateObjFrom - dateObjTo)
        //     var diffDays = this.convertMillisecondsToDays(diffMilliSeconds)
        //     // this.requestData.dataPointCount = diffDays.days
        //     this.filter.type = 'days'
        // }
        this.apiRequest()
      },
      deep: true
    }
  },
  mounted () {
    this.apiRequest()
  },
  data () {
    return {
      requestData: {
        customerId: 'c1',
        from: this.selected.startDate,
        to: this.selected.endDate,
        dataPointCount: 6
      },
      filter: {
        type: ''
      },
      chartData: {
        labels: [],
        datasets: [
          {
            type: 'line',
            data: [],
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
    apiRequest () {
      console.log(this.requestData)
      this.$api.post('visitors/count', this.requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.chartData.labels = []
          const data = response.data
          const total = data.total
          for (var x = 0; x < data.data.length; x++) {
            this.chartData.datasets[0].data.push(data.data[x].count)
            if (this.filter.type === 'hours') {
              var dateToIso = data.data[x].to
              var dateToObj = new Date(dateToIso)
              var newDateHour = dateToObj.getHours()
              var newDateMinutes = dateToObj.getMinutes()
              this.chartData.labels.push(newDateHour + ':' + newDateMinutes)
            } else if (this.filter.type === 'days') {
              var dateToIso = data.data[x].to
              var dateToObj = new Date(dateToIso)
              var newDateDay = dateToObj.getDate()
              var newDateMonth = dateToObj.getMonth() + 1
              this.chartData.labels.push(newDateDay + '.' + newDateMonth)
            }
          }
          this.$emit('updateSubtitle', total)
          this.createChart('countCustomersGraph')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
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
    },
    convertMillisecondsToDays (milliseconds) {
      var days, hours, minutes, seconds;
      seconds = Math.floor(milliseconds / 1000);
      minutes = Math.floor(seconds / 60);
      hours = Math.floor(minutes / 60);
      days = Math.floor(hours / 24) + 1
      return {
        days
      }
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
