<template>
  <div>
    <div class="canvasWrapper">
      <canvas class="canvasBox" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
    <div class="sideBar">
      <p>Average Dwelltime: {{ hoveredArea.dwellTime }}</p>
    </div>
  </div>
</template>

<script>

import * as d3 from 'd3'

var nvert
var context
var backgroundImage
var imageRatio = 2.39
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
      canvasWidth: 632,
      canvasHeight: 316,
      areas: [
        {
          points: [
            { 'x': 0, 'y': 228 },
            { 'x': 124, 'y': 186 },
            { 'x': 124, 'y': 291 },
            { 'x': 0, 'y': 291 }
          ],
          'dwellTime': ''
        },
        {
          points: [
            { 'x': 124, 'y': 186 },
            { 'x': 205, 'y': 160 },
            { 'x': 214, 'y': 193 },
            { 'x': 214, 'y': 291 },
            { 'x': 124, 'y': 291 }
          ],
          'dwellTime': ''
        },
        {
          points: [
            { 'x': 214, 'y': 192 },
            { 'x': 292, 'y': 166 },
            { 'x': 298, 'y': 183 },
            { 'x': 298, 'y': 194 },
            { 'x': 536, 'y': 194 },
            { 'x': 536, 'y': 291 },
            { 'x': 214, 'y': 291 }
          ],
          'dwellTime': ''
        },
        {
          points: [
            { 'x': 536, 'y': 291 },
            { 'x': 630, 'y': 291 },
            { 'x': 630, 'y': 27 },
            { 'x': 536, 'y': 53 }
          ],
          'dwellTime': ''
        }
      ],
      hoveredArea: {
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
    pInPoly (nPoints, arrayX, arrayY, pointX, pointY) {
      var i, j
      var c = false
      for (i = 0, j = nPoints - 1; i < nPoints; j = i++) {
        if (((arrayY[i] > pointY) !== (arrayY[j] > pointY)) &&
          (pointX < (arrayX[j] - arrayX[i]) * (pointY - arrayY[i]) / (arrayY[j] - arrayY[i]) + arrayX[i])) {
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
  }
  .sideBar{
    float: left;
    margin-top: 10px;
  }
</style>
