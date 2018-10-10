<template>
  <div>
    <div class="canvasWrapper">
      <canvas class="canvasBox" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
    <div class="sideBar">
      <p>Average Dwell Time:</p>
      <ul>
        <li v-for="(area, index) in areas" v-bind:key="index" >
          <p>P1({{area.p1.x}}/{{area.p1.y}}) - P2({{area.p2.x}}/{{area.p2.y}})</p>
          <p>{{area.dwellTime}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import * as d3 from 'd3'

var context = []

export default {
  mounted () {
    this.$api.get('visitors/areas/duration')
      .then((response) => {
        const data = response.data
        for (var x = 0; x < data.data.length; x++) {
          this.areas[x].dwellTime = data.data[x].dwellTime
        }
        const canvas = d3.select('.canvasBox').call(d3.zoom().scaleExtent([1, 5]).on('zoom', this.zoom))
        for (var z = 0; z < this.areas.length; z++) {
          context.push(canvas.node().getContext('2d'))
        }
        this.drawRect()
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  data () {
    return {
      canvasWidth: 600,
      canvasHeight: 300,
      areas: [
        {
          'p1': { 'x': 0, 'y': 0 },
          'p2': { 'x': 300, 'y': 150 },
          'dwellTime': ''
        },
        {
          'p1': { 'x': 300, 'y': 0 },
          'p2': { 'x': 600, 'y': 150 },
          'dwellTime': ''
        },
        {
          'p1': { 'x': 0, 'y': 150 },
          'p2': { 'x': 300, 'y': 300 },
          'dwellTime': ''
        },
        {
          'p1': { 'x': 300, 'y': 150 },
          'p2': { 'x': 600, 'y': 300 },
          'dwellTime': ''
        }
      ]
    }
  },
  methods: {
    drawRect () {
      var dwellTimes = []
      for (var i = 0; i < this.areas.length; i++) {
        var area = this.areas[i]
        dwellTimes.push(area.dwellTime)
      }
      var maxDwellTime = Math.max(...dwellTimes)
      for (var j in this.areas) {
        var rect = this.areas[j]
        var opacity = rect.dwellTime / maxDwellTime
        console.log(opacity)
        context[j].fillStyle = 'rgba(255, 0, 0, ' + opacity + ')'
        context[j].rect(rect.p1.x, rect.p1.y, 300, 150)
        context[j].fill()
      }
    }
  }
}
</script>
<style lang="less">
  .canvasWrapper{
    float: left;
    .canvasBox{
      border: 1px solid black;
      padding: 0;
    }
  }
  .sideBar{
    float: left;
    margin-left: 50px;
  }
</style>
