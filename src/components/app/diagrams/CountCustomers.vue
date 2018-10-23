<template>
  <section class="lineGraph">
    <canvas id="countCustomersGraph"></canvas>
  </section>
</template>

<script>
import Chart from 'chart.js'
Chart.defaults.global.defaultFontSize = 12
Chart.defaults.global.defaultFontColor = 'rgb(170, 170, 170)'
var myChart, dateObjFrom, dateObjTo, diffMilliSeconds, diffDays

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
        this.requestData.from = new Date(val.startDate.getFullYear(), val.startDate.getMonth(), val.startDate.getDate() - 1).toISOString()
        this.requestData.to = new Date(val.endDate.getFullYear(), val.endDate.getMonth(), val.endDate.getDate() - 1, 23, 59, 59).toISOString()

        dateObjFrom = new Date(this.requestData.from)
        dateObjTo = new Date(this.requestData.to)
        diffMilliSeconds = Math.abs(dateObjFrom - dateObjTo)
        diffDays = this.convertMillisecondsToDays(diffMilliSeconds)

        this.setDataPointCount(diffDays.days)
        this.setFilterType(diffDays.days)
        this.apiRequest()
      },
      deep: true
    }
  },
  mounted () {
    dateObjFrom = new Date(this.requestData.from)
    dateObjTo = new Date(this.requestData.to)
    diffMilliSeconds = Math.abs(dateObjFrom - dateObjTo)
    diffDays = this.convertMillisecondsToDays(diffMilliSeconds)
    this.setDataPointCount(diffDays.days)
    this.setFilterType(diffDays.days)
    this.apiRequest()
  },
  data () {
    return {
      requestData: {
        customerId: 'c1',
        from: this.selected.startDate,
        to: this.selected.endDate,
        dataPointCount: 10
      },
      filterType: '',
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
      this.$api.post('visitors/count', this.requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.chartData.labels = []
          this.chartData.datasets[0].data = []
          const data = response.data
          const totalCustomers = data.total
          var dateToIso, dateToObj, newDateDayMonth, newDateHour
          for (var x = 0; x < data.data.length; x++) {
            this.chartData.datasets[0].data.push(data.data[x].count)
            if (this.filterType === 'hours') {
              dateToIso = data.data[x].to
              console.log(dateToIso)
              dateToObj = new Date(dateToIso)
              newDateHour = dateToObj.getHours() + 1
              if (newDateHour.toString().length === 1) {
                newDateHour = '0' + newDateHour
              }
              console.log(newDateHour)
              this.chartData.labels.push(newDateHour + ':00')
              console.log(this.chartData.labels)
            } else if (this.filterType === 'days') {
              dateToIso = data.data[x].to
              dateToObj = new Date(dateToIso)
              newDateDayMonth = ('0' + dateToObj.getDate()).slice(-2) + '.' + (('0' + (dateToObj.getMonth() + 1)).slice(-2))
              this.chartData.labels.push(newDateDayMonth)
            }
          }
          this.$emit('updateSubtitle', totalCustomers)
          this.createChart('countCustomersGraph')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createChart (chartId) {
      if (myChart) {
        this.destroyChart(myChart)
      }
      const ctx = document.getElementById(chartId)
      myChart = new Chart(ctx, {
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
    destroyChart (chart) {
      chart.destroy()
    },
    convertMillisecondsToDays (milliseconds) {
      var days, hours, minutes, seconds
      seconds = Math.floor(milliseconds / 1000)
      minutes = Math.floor(seconds / 60)
      hours = Math.floor(minutes / 60)
      days = Math.floor(hours / 24) + 1
      return {
        days
      }
    },
    setDataPointCount (days) {
      if (days <= 1) {
        this.requestData.dataPointCount = 24
      } else if (days > 1) {
        this.requestData.dataPointCount = days
      }
    },
    setFilterType (days) {
      if (days <= 1) {
        this.filterType = 'hours'
      } else if (days > 1) {
        this.filterType = 'days'
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
