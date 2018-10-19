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

var nvert
var context
var backgroundImage
var imageRatio = 2
var imageSize = { width: '', height: '' }
var difWidth
var difHeight
var opacities = []

export default {
  props: {
    selected: {
      type: Object
    }
  },
  mounted () {
    const canvas = d3.select('.canvasBox').call(d3.zoom().scaleExtent([1, 5]).on('zoom', this.zoom))
    // for (var z = 0; z < this.areas.length; z++) {
    //   context.push(canvas.node().getContext('2d'))
    // }
    context = canvas.node().getContext('2d')
    var areasNew = this.areas
    var newHoveredArea = this.hoveredArea
    const that = this
    canvas.on('mousemove', function () {
      var rect = this.getBoundingClientRect()
      var x = d3.event.clientX - rect.left
      var y = d3.event.clientY - rect.top
      console.log(x, y)
      var isArea = false
      for (var k = 0; k < areasNew.length; k++) {
        var area = areasNew[k]
        nvert = area.points.length
        var vertx = []
        var verty = []
        for (var i = 0; i < nvert; i++) {
          vertx.push(area.points[i].x)
          verty.push(area.points[i].y)
        }
        if (that.pInPoly(nvert, vertx, verty, x, y)) {
          newHoveredArea.dwellTime = area.dwellTime
          newHoveredArea.dwellTime = Math.floor(newHoveredArea.dwellTime / 60) + ':' + ('0' + Math.floor(newHoveredArea.dwellTime % 60)).slice(-2)
          isArea = true
        }
      }
      if (isArea === false) {
        newHoveredArea.dwellTime = ''
      }
      // for (var k = 0; k < areasNew.length; k++) {
      //   var rectangle = areasNew[k]
      //   if (x >= rectangle.p1.x && x <= rectangle.p1.x + rectangle.w && y >= rectangle.p1.y && y <= rectangle.p1.y + rectangle.h) {
      //     newHoveredArea.x = rectangle.p1.x
      //     newHoveredArea.y = rectangle.p1.y
      //     newHoveredArea.dwellTime = rectangle.dwellTime
      //     newHoveredArea.dwellTime = Math.floor(newHoveredArea.dwellTime / 60) + ':' + ('0' + Math.floor(newHoveredArea.dwellTime % 60)).slice(-2)
      //   }
      // }
    })
    this.hoveredArea.dwellTime = newHoveredArea.dwellTime
    this.apiRequest()
  },
  watch: {
    selected: {
      handler: function (val) {
        this.requestData.from = new Date(val.startDate.getFullYear(), val.startDate.getMonth(), val.startDate.getDate() - 1).toISOString()
        this.requestData.to = new Date(val.endDate.getFullYear(), val.endDate.getMonth(), val.endDate.getDate() - 1, 23, 59, 59).toISOString()
        this.apiRequest()
      },
      deep: true
    }
  },
  data () {
    return {
      requestData: {
        'mapId': '3f18f9da-93d1-4319-95bd-702d24f48708',
        'from': this.selected.startDate,
        'to': this.selected.endDate,
        'areaDtos': [
          {
            'corner1': {
              'x': 0,
              'y': 149
            },
            'corner2': {
              'x': 203,
              'y': 300
            }
          },
          {
            'corner1': {
              'x': 203,
              'y': 149
            },
            'corner2': {
              'x': 393,
              'y': 300
            }
          },
          {
            'corner1': {
              'x': 393,
              'y': 190
            },
            'corner2': {
              'x': 600,
              'y': 300
            }
          },
          {
            'corner1': {
              'x': 506,
              'y': 0
            },
            'corner2': {
              'x': 600,
              'y': 191
            }
          }
        ]
      },
      canvasWidth: 600,
      canvasHeight: 300,
      areas: [
        {
          points: [
            { 'x': 0, 'y': 229 },
            { 'x': 193, 'y': 151 },
            { 'x': 202, 'y': 190 },
            { 'x': 202, 'y': 300 },
            { 'x': 0, 'y': 300 }
          ],
          'dwellTime': ''
        },
        {
          points: [
            { 'x': 202, 'y': 188 },
            { 'x': 277, 'y': 159 },
            { 'x': 282, 'y': 178 },
            { 'x': 282, 'y': 190 },
            { 'x': 394, 'y': 190 },
            { 'x': 394, 'y': 300 },
            { 'x': 202, 'y': 300 }
          ],
          'dwellTime': ''
        },
        {
          points: [
            { 'x': 394, 'y': 190 },
            { 'x': 600, 'y': 190 },
            { 'x': 600, 'y': 300 },
            { 'x': 394, 'y': 300 }
          ],
          'dwellTime': ''
        },
        {
          points: [
            { 'x': 509, 'y': 190 },
            { 'x': 509, 'y': 31 },
            { 'x': 600, 'y': 0 },
            { 'x': 600, 'y': 190 }
          ],
          'dwellTime': ''
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
    apiRequest () {
      console.log(this.requestData)
      this.$api.post('visitors/areas/duration', this.requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          const data = response.data
          console.log(data)
          for (var x = 0; x < data.length; x++) {
            this.areas[x].dwellTime = data[x].dwellTime
          }
          // const canvas = d3.select('.canvasBox').call(d3.zoom().scaleExtent([1, 5]).on('zoom', this.zoom))
          // for (var z = 0; z < this.areas.length; z++) {
          //   context.push(canvas.node().getContext('2d'))
          // }
          this.drawRect()
          this.createImage()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createImage () {
      var canvasRatio = this.canvasWidth / this.canvasHeight
      if (imageRatio > canvasRatio) {
        imageSize.width = this.canvasWidth
        imageSize.height = imageSize.width / imageRatio
        difHeight = (this.canvasHeight - imageSize.height) / 2
        difWidth = 0
      } else if (imageRatio < canvasRatio) {
        imageSize.height = this.canvasHeight
        imageSize.width = imageSize.height * imageRatio
        difWidth = (this.canvasWidth - imageSize.width) / 2
        difHeight = 0
      } else {
        imageSize.width = this.canvasWidth
        imageSize.height = this.canvasHeight
        difWidth = 0
        difHeight = 0
      }
      this.image = [difWidth, difHeight]
      backgroundImage = new Image()
      backgroundImage.src = '../static/campus.svg'
      backgroundImage.onload = () => {
        context.drawImage(backgroundImage, difWidth, difHeight, imageSize.width, imageSize.height)
      }
    },
    drawRect () {
      for (var k in opacities) {
        opacities[k] = 0
      }
      var dwellTimes = []
      for (var i = 0; i < this.areas.length; i++) {
        var area = this.areas[i]
        dwellTimes.push(area.dwellTime)
      }
      var maxDwellTime = Math.max(...dwellTimes)
      for (var j in this.areas) {
        var rect = this.areas[j]
        opacities[j] = rect.dwellTime / maxDwellTime
        if (!opacities[j]) {
          opacities[j] = 0
        }
        if (opacities[j] === 0) {
          context.fillStyle = 'rgb(255, 255, 255)'
        } else {
          context.fillStyle = 'rgba(13, 158, 248, ' + opacities[j] + ')'
        }
        context.beginPath()
        context.moveTo(rect.points[0].x, rect.points[0].y)
        for (var q = 1; q < rect.points.length; q++) {
          context.lineTo(rect.points[q].x, rect.points[q].y)
        }
        context.fill()
      }
    },
    pInPoly (nvert, vertx, verty, testx, testy) {
      var i
      var j
      var c = false
      for (i = 0, j = nvert - 1; i < nvert; j = i++) {
        if (((verty[i] > testy) !== (verty[j] > testy)) &&
          (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i])) {
          c = !c
        }
      }
      return c
    }
  }
}
</script>
<style lang="less">
  .canvasWrapper{
    float: left;
    .canvasBox{
      border: 1px solid black;
    }
  }
  .sideBar{
    float: left;
    margin-top: 10px;
  }
</style>
