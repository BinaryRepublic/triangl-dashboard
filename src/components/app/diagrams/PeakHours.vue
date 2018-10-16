<template>
  <div id="container"/>
</template>

<script>
import anychart from 'anychart'

export default {
  props: {
    selected: {
      type: Object
    }
  },
  watch: {
    selected: {
      handler: function (val) {
        console.log(val)
        this.requestData.from = new Date(val.startDate.getFullYear(), val.startDate.getMonth(), val.startDate.getDate() - 1).toISOString()
        this.requestData.to = new Date(val.endDate.getFullYear(), val.endDate.getMonth(), val.endDate.getDate() - 1, 23, 59, 59).toISOString()
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
        to: this.selected.endDate
      }
    }
  },
  methods: {
    apiRequest () {
      this.$api.post('/visitors/byTimeOfDay/average', this.requestData, { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        let data = res.data;
        var chartData = [];

        function timeToDecimal(t) {
          var arr = t.split(':');
          var dec = parseInt((arr[1]/6)*10, 10);

          return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
        }

        for (let i in data) {
          let block = data[i];

          const dayVal = block.day.substring(0, 3);

          for (let n in block.values) {
            let value = block.values[n];
            let from = value.from;

            let hours = timeToDecimal(from);
            var obj = {};

            if (hours == 0 || hours == 1) {
              obj = {x: dayVal, y: '12am', heat: value.average}
            } else if (hours == 2 || hours == 3) {
              obj = {x: dayVal, y: '2am', heat: value.average}
            } else if (hours == 4 || hours == 5) {
              obj = {x: dayVal, y: '4am', heat: value.average}
            } else if (hours == 6 || hours == 7) {
              obj = {x: dayVal, y: '6am', heat: value.average}
            } else if (hours == 8 || hours == 9) {
              obj = {x: dayVal, y: '8am', heat: value.average}
            } else if (hours == 10 || hours == 11) {
              obj = {x: dayVal, y: '10am', heat: value.average}
            } else if (hours == 12 || hours == 13) {
              obj = {x: dayVal, y: '12pm', heat: value.average}
            } else if (hours == 14 || hours == 15) {
              obj = {x: dayVal, y: '2pm', heat: value.average}
            } else if (hours == 16 || hours == 17) {
              obj = {x: dayVal, y: '4pm', heat: value.average}
            } else if (hours == 18 || hours == 19) {
              obj = {x: dayVal, y: '6pm', heat: value.average}
            } else if (hours == 20 || hours == 21) {
              obj = {x: dayVal, y: '8pm', heat: value.average}
            } else if (hours == 22 || hours == 23) {
              obj = {x: dayVal, y: '10pm', heat: value.average}
            }

            chartData.push(obj);
          }
        }

        const chart = anychart.heatMap(chartData);
        chart.container(this.$el);
        chart.labels(false);
        chart.legend(true);
        chart.draw();

        let creditsElement = document.getElementsByClassName('anychart-credits')[0];
        creditsElement.parentNode.removeChild(creditsElement);
      })
    }
  }
}
</script>

<style lang="less">
#container{
  height: 385px;
}
</style>
