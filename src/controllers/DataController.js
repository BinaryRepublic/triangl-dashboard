export default class DataController {
  constructor (api, auth0) {
    this.api = api
    this.auth0 = auth0
  }
  post (url, params = {}) {
    return new Promise((resolve, reject) => {
      this.auth0.getAccessTokenOrLogin()
        .then(accessToken => {
          this.api.post(url, {...params}, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  }
  getActiveCustomersData (parameters) {
    return new Promise((resolve, reject) => {
      this.api.post('dashboard-service/visitors/count', parameters)
        .then(response => {
          resolve(response.data.total)
        })
        .catch(error => reject(error))
    })
  }
  getPeekHoursData (parameters) {
    return new Promise((resolve, reject) => {
      this.api.post('dashboard-service/visitors/byTimeOfDay/average', parameters)
        .then(response => {
          let data = response.data
          var chartData = []

          function timeToDecimal (t) {
            var arr = t.split(':')
            var dec = parseInt((arr[1] / 6) * 10, 10)

            return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec)
          }

          for (let i in data) {
            let block = data[i]

            const dayVal = block.day.substring(0, 3)

            for (let n in block.values) {
              let value = block.values[n]
              let from = value.from

              let hours = timeToDecimal(from)
              var obj = {}

              if (hours === 0 || hours === 1) {
                obj = {x: dayVal, y: '12am', heat: value.average}
              } else if (hours === 2 || hours === 3) {
                obj = {x: dayVal, y: '2am', heat: value.average}
              } else if (hours === 4 || hours === 5) {
                obj = {x: dayVal, y: '4am', heat: value.average}
              } else if (hours === 6 || hours === 7) {
                obj = {x: dayVal, y: '6am', heat: value.average}
              } else if (hours === 8 || hours === 9) {
                obj = {x: dayVal, y: '8am', heat: value.average}
              } else if (hours === 10 || hours === 11) {
                obj = {x: dayVal, y: '10am', heat: value.average}
              } else if (hours === 12 || hours === 13) {
                obj = {x: dayVal, y: '12pm', heat: value.average}
              } else if (hours === 14 || hours === 15) {
                obj = {x: dayVal, y: '2pm', heat: value.average}
              } else if (hours === 16 || hours === 17) {
                obj = {x: dayVal, y: '4pm', heat: value.average}
              } else if (hours === 18 || hours === 19) {
                obj = {x: dayVal, y: '6pm', heat: value.average}
              } else if (hours === 20 || hours === 21) {
                obj = {x: dayVal, y: '8pm', heat: value.average}
              } else if (hours === 22 || hours === 23) {
                obj = {x: dayVal, y: '10pm', heat: value.average}
              }

              chartData.push(obj)
            }
          }

          resolve(chartData)
        })
        .catch(error => reject(error))
    })
  }
  getCountCustomersData (parameters, chartData, filterType) {
    return new Promise((resolve, reject) => {
      this.api.post('dashboard-service/visitors/count', parameters)
        .then(response => {
          chartData.labels = []
          chartData.datasets[0].data = []
          const data = response.data
          const totalCustomers = data.total
          var dateToIso, dateToObj, newDateDayMonth, newDateHour
          for (var x = 0; x < data.data.length; x++) {
            chartData.datasets[0].data.push(data.data[x].count)
            if (filterType === 'hours') {
              dateToIso = data.data[x].to
              dateToObj = new Date(dateToIso)
              newDateHour = dateToObj.getHours() + 1
              if (newDateHour.toString().length === 1) {
                newDateHour = '0' + newDateHour
              }
              chartData.labels.push(newDateHour + ':00')
            } else if (filterType === 'days') {
              dateToIso = data.data[x].to
              dateToObj = new Date(dateToIso)
              newDateDayMonth = ('0' + dateToObj.getDate()).slice(-2) + '.' + (('0' + (dateToObj.getMonth() + 1)).slice(-2))
              chartData.labels.push(newDateDayMonth)
            }
          }

          resolve({ total: totalCustomers, data: chartData })
        })
        .catch(error => reject(error))
    })
  }
  getMapData (parameters, areas) {
    return new Promise((resolve, reject) => {
      this.api.post('dashboard-service/visitors/areas/duration', parameters)
        .then(response => {
          for (var x = 0; x < response.data.length; x++) {
            areas[x].dwellTime = response.data[x].dwellTime
            areas[x].customerCount = response.data[x].customerCount
          }

          resolve(areas)
        })
        .catch(error => reject(error))
    })
  }
  getRouterLastSeenData () {
    return new Promise((resolve, reject) => {
      this.api.get('tracking-ingestion-service/routers/lastSeen')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
}
