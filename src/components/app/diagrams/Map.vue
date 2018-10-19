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
var backgroundImage
var imageRatio = 2
var imageSize = { width: '', height: '' }
var difWidth
var difHeight

export default {
  props: {
    selected: {
      type: Object
    }
  },
  mounted () {
    const canvas = d3.select('.canvasBox').call(d3.zoom().scaleExtent([1, 5]).on('zoom', this.zoom))
    for (var z = 0; z < this.areas.length; z++) {
      context.push(canvas.node().getContext('2d'))
    }
    this.createImage()
    // context[0].globalCompositeOperation = 'destination-atop'
    // this.drawRect()
    var areasNew = this.areas
    var newHoveredArea = this.hoveredArea
    canvas.on('mousemove', function () {
      var rect = this.getBoundingClientRect()
      var x = d3.event.clientX - rect.left
      var y = d3.event.clientY - rect.top
      for (var k = 0; k < areasNew.length; k++) {
        var rectangle = areasNew[k]
        // console.log(rectangle.p1.x, rectangle.p1.y)
        if (x >= rectangle.p1.x && x <= rectangle.p1.x + rectangle.w && y >= rectangle.p1.y && y <= rectangle.p1.y + rectangle.h) {
          newHoveredArea.x = rectangle.p1.x
          newHoveredArea.y = rectangle.p1.y
          newHoveredArea.dwellTime = rectangle.dwellTime
          newHoveredArea.dwellTime = Math.floor(newHoveredArea.dwellTime / 60) + ':' + ('0' + Math.floor(newHoveredArea.dwellTime % 60)).slice(-2)
        }
      }
    })
    this.hoveredArea.dwellTime = newHoveredArea.dwellTime
    this.apiRequest()
  },
  watch: {
    selected: {
      handler: function (val) {
        console.log('Map yes')
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
          'p1': { 'x': 0, 'y': 149 },
          'p2': { 'x': 203, 'y': 300 },
          'dwellTime': '',
          'w': 203,
          'h': 151
        },
        {
          'p1': { 'x': 203, 'y': 149 },
          'p2': { 'x': 393, 'y': 300 },
          'dwellTime': '',
          'w': 190,
          'h': 151
        },
        {
          'p1': { 'x': 393, 'y': 190 },
          'p2': { 'x': 600, 'y': 300 },
          'dwellTime': '',
          'w': 207,
          'h': 110
        },
        {
          'p1': { 'x': 506, 'y': 0 },
          'p2': { 'x': 600, 'y': 191 },
          'dwellTime': '',
          'w': 94,
          'h': 190
        }
      ],
      hoveredArea: {
        'x': '',
        'y': '',
        'dwellTime': ''
      },
      activeRects: []
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
        context[0].drawImage(backgroundImage, difWidth, difHeight, imageSize.width, imageSize.height)
      }
    },
    drawRect () {
      if (this.activeRects[0]) {
        this.clearRects(this.activeRects)
      }
      var dwellTimes = []
      var activeRect = {
        x: '',
        y: '',
        w: '',
        h: ''
      }
      for (var i = 0; i < this.areas.length; i++) {
        var area = this.areas[i]
        dwellTimes.push(area.dwellTime)
      }
      var maxDwellTime = Math.max(...dwellTimes)
      for (var j in this.areas) {
        var rect = this.areas[j]
        var opacity = rect.dwellTime / maxDwellTime
        if (!opacity) {
          opacity = 0
        }
        context[j].fillStyle = 'rgba(13, 158, 248, ' + opacity + ')'
        context[j].fillRect(rect.p1.x, rect.p1.y, rect.w, rect.h)
        activeRect.x = rect.p1.x
        activeRect.y = rect.p1.y
        activeRect.w = rect.w
        activeRect.h = rect.h
        this.activeRects.push(activeRect)
      }
      console.log(this.activeRects)
      console.log(this.activeRects[0])
    },
    clearRects (activeRects) {
      console.log(activeRects)
      for (var l in activeRects) {
        var rect = activeRects[l]
        context[l].clearRect(rect.x, rect.y, rect.w, rect.h)
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
    }
  }
  .sideBar{
    float: left;
    margin-left: 50px;
  }
</style>
