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
import DataController from '../../../controllers/DataController'
import {getImageSizeAndPos} from './utils'
import {getRequestData, areas} from './mock'

var context
var backgroundImage
var imageRatio = 2.39
var opacities = []
var amountVertices

export default {
  props: {
    selected: {
      type: Object
    }
  },
  beforeMount () {
    this.controller = new DataController(this.$api)
  },
  mounted () {
    const canvas = d3.select('.canvasBox').call(d3.zoom().scaleExtent([1, 5]).on('zoom', this.zoom))
    context = canvas.node().getContext('2d')
    const that = this
    canvas.on('mousemove', function () {
      var rect = this.getBoundingClientRect()
      var x = d3.event.clientX - rect.left
      var y = d3.event.clientY - rect.top
      console.log(x, y)
      var isArea = false
      for (var k = 0; k < that.areas.length; k++) {
        var area = that.areas[k]
        amountVertices = area.points.length
        var arrayValuesX = []
        var arrayValuesY = []
        for (var i = 0; i < amountVertices; i++) {
          arrayValuesX.push(area.points[i].x)
          arrayValuesY.push(area.points[i].y)
        }
        if (that.pInPoly(amountVertices, arrayValuesX, arrayValuesY, x, y)) {
          that.hoveredArea.dwellTime = area.dwellTime
          that.hoveredArea.dwellTime = Math.floor(that.hoveredArea.dwellTime / 60) + ':' + ('0' + Math.floor(that.hoveredArea.dwellTime % 60)).slice(-2)
          isArea = true
        }
      }
      if (isArea === false) {
        that.hoveredArea.dwellTime = ''
      }
    })
    this.hoveredArea.dwellTime = that.hoveredArea.dwellTime
    this.loadData()
  },
  watch: {
    selected: {
      handler: function (val) {
        this.requestData.from = new Date(val.startDate.getFullYear(), val.startDate.getMonth(), val.startDate.getDate() - 1).toISOString()
        this.requestData.to = new Date(val.endDate.getFullYear(), val.endDate.getMonth(), val.endDate.getDate() - 1, 23, 59, 59).toISOString()
        this.loadData()
      },
      deep: true
    }
  },
  data () {
    return {
      canvasWidth: 632,
      canvasHeight: 316,
      requestData: getRequestData(this.selected.startDate, this.selected.endDate),
      areas: areas,
      hoveredArea: {
        'dwellTime': ''
      }
    }
  },
  methods: {
    loadData () {
      this.controller.getMapData(this.requestData, this.areas)
        .then(data => {
          this.areas = data
          this.drawRect()
          this.createImage()
        })
    },
    createImage () {
      const result = getImageSizeAndPos(imageRatio, this.canvasWidth, this.canvasHeight)
      backgroundImage = new Image()
      backgroundImage.src = '../static/campus.svg'
      backgroundImage.onload = () => {
        context.drawImage(backgroundImage, result.posX, result.posY, result.width, result.height)
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
    pInPoly (nPoints, arrayValuesX, arrayValuesY, pointX, pointY) {
      var i, j
      var c = false
      for (i = 0, j = nPoints - 1; i < nPoints; j = i++) {
        if (((arrayValuesY[i] > pointY) !== (arrayValuesY[j] > pointY)) &&
          (pointX < (arrayValuesX[j] - arrayValuesX[i]) * (pointY - arrayValuesY[i]) / (arrayValuesY[j] - arrayValuesY[i]) + arrayValuesX[i])) {
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