<template>
  <div>
    <div class="canvasWrapper">
      <canvas class="canvasBox" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
    <div class="sideBar">
      <p>Area: ({{ hoveredArea.x }}/{{ hoveredArea.y }})</p>
      <p>Average Dwelltime: {{ hoveredArea.dwellTime }}</p>
    </div>
  </div>
</template>

<script>

import * as d3 from 'd3'

var context = []

export default {
  mounted () {
    const canvas = d3.select('.canvasBox').call(d3.zoom().scaleExtent([1, 5]).on('zoom', this.zoom))
    for (var z = 0; z < this.areas.length; z++) {
      context.push(canvas.node().getContext('2d'))
    }
    this.drawRect()
    var areasNew = this.areas
    var newHoveredArea = this.hoveredArea
    console.log(this.hoveredArea)
    canvas.on('mousemove', function () {
      var rect = this.getBoundingClientRect()
      var x = d3.event.clientX - rect.left
      var y = d3.event.clientY - rect.top
      for (var k = 0; k < areasNew.length; k++) {
        var rectangle = areasNew[k]
        if (x >= rectangle.p1.x && x <= rectangle.p1.x + rectangle.w && y >= rectangle.p1.y && y <= rectangle.p1.y + rectangle.h) {
          newHoveredArea.x = rectangle.p1.x
          newHoveredArea.y = rectangle.p1.y
          newHoveredArea.dwellTime = rectangle.dwellTime
          newHoveredArea.dwellTime = Math.floor(newHoveredArea.dwellTime / 60) + ':' + ('0' + Math.floor(newHoveredArea.dwellTime % 60)).slice(-2)
        }
      }
    })
    this.hoveredArea.dwellTime = newHoveredArea.dwellTime
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
          'dwellTime': '156'
        },
        {
          'p1': { 'x': 300, 'y': 0 },
          'p2': { 'x': 600, 'y': 150 },
          'dwellTime': '258'
        },
        {
          'p1': { 'x': 0, 'y': 150 },
          'p2': { 'x': 300, 'y': 300 },
          'dwellTime': '59'
        },
        {
          'p1': { 'x': 300, 'y': 150 },
          'p2': { 'x': 600, 'y': 300 },
          'dwellTime': '86'
        }
      ],
      hoveredArea: {
        'x': '',
        'y': '',
        'dwellTime': ''
      }
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
        context[j].fillStyle = 'rgba(255, 0, 0, ' + opacity + ')'
        context[j].fillRect(rect.p1.x, rect.p1.y, 300, 150)
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
