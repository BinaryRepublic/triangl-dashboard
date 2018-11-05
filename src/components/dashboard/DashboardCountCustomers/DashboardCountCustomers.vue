<template>
  <section class="lineGraph">
    <canvas id="countCustomersGraph"></canvas>
    <!-- <md-button v-on:click="exportCsv" class="md-primary">Export</md-button> -->
  </section>
</template>

<script>
import Chart from '../../../../node_modules/chart.js/src/chart'
import DataController from '../../../controllers/DataController'
Chart.defaults.global.defaultFontSize = 12
Chart.defaults.global.defaultFontColor = 'rgb(170, 170, 170)'
var myChart, dateObjFrom, dateObjTo, diffMilliSeconds, diffDays
const Json2csvParser = require('json2csv').Parser

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
        this.requestData.from = val.startDate
        this.requestData.to = val.endDate
        console.log(val.startDate)
        console.log(val.endDate)

        dateObjFrom = new Date(this.requestData.from)
        dateObjTo = new Date(this.requestData.to)
        diffMilliSeconds = Math.abs(dateObjFrom - dateObjTo)
        diffDays = this.convertMillisecondsToDays(diffMilliSeconds)
        this.setDataPointCount(diffDays.days)
        this.setFilterType(diffDays.days)

        if (val.timeZoneDifference) {
          console.log('Time Zone Difference')
          var d = new Date(val.endDate)
          var hours = d.getHours()
          d.setHours(hours - (val.timeZoneDifference / 60))
          this.requestData.to = d.toISOString()
        }

        this.loadData()
      },
      deep: true
    }
  },
  beforeMount () {
    this.controller = new DataController(this.$api)
  },
  mounted () {
    dateObjFrom = new Date(this.requestData.from)
    dateObjTo = new Date(this.requestData.to)
    console.log(dateObjFrom)
    console.log(dateObjTo)
    diffMilliSeconds = Math.abs(dateObjFrom - dateObjTo)
    diffDays = this.convertMillisecondsToDays(diffMilliSeconds)
    this.setDataPointCount(diffDays.days)
    this.setFilterType(diffDays.days)
    this.loadData()
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
    download (filename, text) {
      var element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    },
    exportCsv () {
      this.$api.post('visitors/count', this.requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          let data = response.data
          const fields = ['from', 'to', 'count']
          const opts = { fields }

          const parser = new Json2csvParser(opts)
          const csv = parser.parse(data.data)
          this.download('export.csv', csv)
        })
    },
    loadData () {
      console.log(this.requestData)
      this.controller.getCountCustomersData(this.requestData, this.chartData, this.filterType)
        .then(res => {
          this.chartData = res.data
          this.$emit('updateSubtitle', res.total.toString())
          this.createChart('countCustomersGraph')
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
      console.log(milliseconds)
      var days, hours, minutes, seconds
      seconds = Math.round(milliseconds / 1000)
      minutes = Math.round(seconds / 60)
      hours = Math.round(minutes / 60)
      console.log(hours)
      days = Math.floor(hours / 24)
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
.md-primary{
  float: right;
  margin-right: -20px;
  margin-top: 3px;
}
</style>
