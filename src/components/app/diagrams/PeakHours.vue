<template>
  <div id="container"/>
</template>

<script>
import anychart from 'anychart'

export default {
  mounted () {
    let res = this.res;
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
    chart.draw();
  },
  data () {
    return {
      res: {
        "data": [
          {
            "day":"Monday",
            "values":[
                {"from":"00:00","to":"01:00","average":0.0},
                {"from":"01:00","to":"02:00","average":0.0},
                {"from":"02:00","to":"03:00","average":0.0},
                {"from":"03:00","to":"04:00","average":0.0},
                {"from":"04:00","to":"05:00","average":0.0},
                {"from":"05:00","to":"06:00","average":0.0},
                {"from":"06:00","to":"07:00","average":0.0},
                {"from":"07:00","to":"08:00","average":1.25},
                {"from":"08:00","to":"09:00","average":3.0},
                {"from":"09:00","to":"10:00","average":5.25},
                {"from":"10:00","to":"11:00","average":7.0},
                {"from":"11:00","to":"12:00","average":8.25},
                {"from":"12:00","to":"13:00","average":7.0},
                {"from":"13:00","to":"14:00","average":6.0},
                {"from":"14:00","to":"15:00","average":9.0},
                {"from":"15:00","to":"16:00","average":2.0},
                {"from":"16:00","to":"17:00","average":5.0},
                {"from":"17:00","to":"18:00","average":8.0},
                {"from":"18:00","to":"19:00","average":0.0},
                {"from":"19:00","to":"20:00","average":17.0},
                {"from":"20:00","to":"21:00","average":3.0},
                {"from":"21:00","to":"22:00","average":4.0},
                {"from":"22:00","to":"23:00","average":3.0},
                {"from":"23:00","to":"00:00","average":9.0}
            ]
        },{
            "day":"Tuesday",
            "values":[
                {"from":"00:00","to":"01:00","average":0.0},
                {"from":"01:00","to":"02:00","average":0.0},
                {"from":"02:00","to":"03:00","average":0.0},
                {"from":"03:00","to":"04:00","average":0.0},
                {"from":"04:00","to":"05:00","average":0.0},
                {"from":"05:00","to":"06:00","average":0.0},
                {"from":"06:00","to":"07:00","average":0.0},
                {"from":"07:00","to":"08:00","average":1.25},
                {"from":"08:00","to":"09:00","average":3.0},
                {"from":"09:00","to":"10:00","average":5.25},
                {"from":"10:00","to":"11:00","average":7.0},
                {"from":"11:00","to":"12:00","average":8.25},
                {"from":"12:00","to":"13:00","average":7.0},
                {"from":"13:00","to":"14:00","average":6.0},
                {"from":"14:00","to":"15:00","average":9.0},
                {"from":"15:00","to":"16:00","average":2.0},
                {"from":"16:00","to":"17:00","average":5.0},
                {"from":"17:00","to":"18:00","average":8.0},
                {"from":"18:00","to":"19:00","average":0.0},
                {"from":"19:00","to":"20:00","average":17.0},
                {"from":"20:00","to":"21:00","average":3.0},
                {"from":"21:00","to":"22:00","average":4.0},
                {"from":"22:00","to":"23:00","average":3.0},
                {"from":"23:00","to":"00:00","average":9.0}
            ]
        },{
            "day":"Wednesday",
            "values":[
                {"from":"00:00","to":"01:00","average":0.0},
                {"from":"01:00","to":"02:00","average":0.0},
                {"from":"02:00","to":"03:00","average":0.0},
                {"from":"03:00","to":"04:00","average":0.0},
                {"from":"04:00","to":"05:00","average":0.0},
                {"from":"05:00","to":"06:00","average":0.0},
                {"from":"06:00","to":"07:00","average":0.0},
                {"from":"07:00","to":"08:00","average":1.25},
                {"from":"08:00","to":"09:00","average":3.0},
                {"from":"09:00","to":"10:00","average":5.25},
                {"from":"10:00","to":"11:00","average":7.0},
                {"from":"11:00","to":"12:00","average":8.25},
                {"from":"12:00","to":"13:00","average":7.0},
                {"from":"13:00","to":"14:00","average":6.0},
                {"from":"14:00","to":"15:00","average":9.0},
                {"from":"15:00","to":"16:00","average":2.0},
                {"from":"16:00","to":"17:00","average":5.0},
                {"from":"17:00","to":"18:00","average":8.0},
                {"from":"18:00","to":"19:00","average":0.0},
                {"from":"19:00","to":"20:00","average":17.0},
                {"from":"20:00","to":"21:00","average":3.0},
                {"from":"21:00","to":"22:00","average":4.0},
                {"from":"22:00","to":"23:00","average":3.0},
                {"from":"23:00","to":"00:00","average":9.0}
            ]
        },{
            "day":"Thursday",
            "values":[
                {"from":"00:00","to":"01:00","average":10.0},
                {"from":"01:00","to":"02:00","average":0.0},
                {"from":"02:00","to":"03:00","average":0.0},
                {"from":"03:00","to":"04:00","average":0.0},
                {"from":"04:00","to":"05:00","average":0.0},
                {"from":"05:00","to":"06:00","average":0.0},
                {"from":"06:00","to":"07:00","average":0.0},
                {"from":"07:00","to":"08:00","average":1.25},
                {"from":"08:00","to":"09:00","average":3.0},
                {"from":"09:00","to":"10:00","average":5.25},
                {"from":"10:00","to":"11:00","average":7.0},
                {"from":"11:00","to":"12:00","average":8.25},
                {"from":"12:00","to":"13:00","average":7.0},
                {"from":"13:00","to":"14:00","average":6.0},
                {"from":"14:00","to":"15:00","average":9.0},
                {"from":"15:00","to":"16:00","average":2.0},
                {"from":"16:00","to":"17:00","average":5.0},
                {"from":"17:00","to":"18:00","average":8.0},
                {"from":"18:00","to":"19:00","average":0.0},
                {"from":"19:00","to":"20:00","average":17.0},
                {"from":"20:00","to":"21:00","average":3.0},
                {"from":"21:00","to":"22:00","average":4.0},
                {"from":"22:00","to":"23:00","average":3.0},
                {"from":"23:00","to":"00:00","average":9.0}
            ]
        },{
            "day":"Friday",
            "values":[
                {"from":"00:00","to":"01:00","average":0.0},
                {"from":"01:00","to":"02:00","average":0.0},
                {"from":"02:00","to":"03:00","average":0.0},
                {"from":"03:00","to":"04:00","average":0.0},
                {"from":"04:00","to":"05:00","average":0.0},
                {"from":"05:00","to":"06:00","average":0.0},
                {"from":"06:00","to":"07:00","average":0.0},
                {"from":"07:00","to":"08:00","average":1.25},
                {"from":"08:00","to":"09:00","average":3.0},
                {"from":"09:00","to":"10:00","average":5.25},
                {"from":"10:00","to":"11:00","average":7.0},
                {"from":"11:00","to":"12:00","average":8.25},
                {"from":"12:00","to":"13:00","average":7.0},
                {"from":"13:00","to":"14:00","average":6.0},
                {"from":"14:00","to":"15:00","average":9.0},
                {"from":"15:00","to":"16:00","average":2.0},
                {"from":"16:00","to":"17:00","average":5.0},
                {"from":"17:00","to":"18:00","average":8.0},
                {"from":"18:00","to":"19:00","average":0.0},
                {"from":"19:00","to":"20:00","average":17.0},
                {"from":"20:00","to":"21:00","average":3.0},
                {"from":"21:00","to":"22:00","average":4.0},
                {"from":"22:00","to":"23:00","average":3.0},
                {"from":"23:00","to":"00:00","average":9.0}
            ]
        }
        ]
      }      
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
#container{
  height: 385px;
}
</style>