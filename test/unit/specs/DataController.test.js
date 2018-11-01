import MockAPI from '../../../src/controllers/MockAPI'
import DataController from '../../../src/controllers/DataController'

describe('DataController.js', () => {
  let api = new MockAPI()
  let controller = new DataController(api)

  it('should return data for Active Customers diagram', () => {
    let mockData = {
      data: {
        total: 42,
        data: [{from: '2018-10-18T22: 00: 00Z', to: '2018-10-19T21:59:59.857142856Z', count: 36} , {from: '2018-10-19T21:59:59.857142857Z', to: '2018-10-20T21:59:59.714285713Z', count: 0} , {from: '2018-10-20T21:59:59.714285714Z', to: '2018-10-21T21:59:59.571428570Z', count: 0} , {from: '2018-10-21T21:59:59.571428571Z', to: '2018-10-22T21:59:59.428571427Z', count: 0} , {from: '2018-10-22T21:59:59.428571428Z', to: '2018-10-23T21:59:59.285714284Z', count: 65} , {from: '2018-10-23T21:59:59.285714285Z', to: '2018-10-24T21:59:59.142857141Z', count: 0} , {from: '2018-10-24T21:59:59.142857142Z', to: '2018-10-25T21:59:58.999999998Z', count: 0}]
      }
    }
    api.mockData = mockData
    controller.getActiveCustomersData({})
      .then(total => {
        expect(total).toEqual(mockData.data.total)
      })
  })

  it('should return data for Count Customers diagram', () => {
    let mockData = {
      data: {
        total: 42,
        data: [{from: '2018-10-18T22: 00: 00Z', to: '2018-10-19T21:59:59.857142856Z', count: 36} , {from: '2018-10-19T21:59:59.857142857Z', to: '2018-10-20T21:59:59.714285713Z', count: 0} , {from: '2018-10-20T21:59:59.714285714Z', to: '2018-10-21T21:59:59.571428570Z', count: 0} , {from: '2018-10-21T21:59:59.571428571Z', to: '2018-10-22T21:59:59.428571427Z', count: 0} , {from: '2018-10-22T21:59:59.428571428Z', to: '2018-10-23T21:59:59.285714284Z', count: 65} , {from: '2018-10-23T21:59:59.285714285Z', to: '2018-10-24T21:59:59.142857141Z', count: 0} , {from: '2018-10-24T21:59:59.142857142Z', to: '2018-10-25T21:59:58.999999998Z', count: 0}]
      }
    }

    api.mockData = mockData
    controller.getCountCustomersData({} , { labels: [], datasets: [{}] } , '')
      .then(data => {
        expect(data).toEqual({data: { datasets: [ { data: [36, 0, 0, 0, 65, 0, 0] } ], labels: [] } , total: 42})
      })
  })

  it('should return data for Count Peek Hours', () => {
    let mockData = {
      data: [
        {
          day: 'Monday',
          values: [
            { from: '00:00', to: '01:00', average: 0 },
            { from: '01:00', to: '02:00', average: 0 },
            { from: '02:00', to: '03:00', average: 0 },
            { from: '03:00', to: '04:00', average: 0 },
            { from: '04:00', to: '05:00', average: 0 },
            { from: '05:00', to: '06:00', average: 0 },
            { from: '06:00', to: '07:00', average: 0 },
            { from: '07:00', to: '08:00', average: 0 },
            { from: '08:00', to: '09:00', average: 0 },
            { from: '09:00', to: '10:00', average: 0 },
            { from: '10:00', to: '11:00', average: 0 },
            { from: '11:00', to: '12:00', average: 0 },
            { from: '12:00', to: '13:00', average: 0 },
            { from: '13:00', to: '14:00', average: 0 },
            { from: '14:00', to: '15:00', average: 0 },
            { from: '15:00', to: '16:00', average: 0 },
            { from: '16:00', to: '17:00', average: 0 },
            { from: '17:00', to: '18:00', average: 0 },
            { from: '18:00', to: '19:00', average: 0 },
            { from: '19:00', to: '20:00', average: 0 },
            { from: '20:00', to: '21:00', average: 0 },
            { from: '21:00', to: '22:00', average: 0 },
            { from: '22:00', to: '23:00', average: 0 },
            { from: '23:00', to: '00:00', average: 0 }
          ]
        },
        {
          day: 'Tuesday',
          values: [
            { from: '00:00', to: '01:00', average: 0 },
            { from: '01:00', to: '02:00', average: 0 },
            { from: '02:00', to: '03:00', average: 0 },
            { from: '03:00', to: '04:00', average: 0 },
            { from: '04:00', to: '05:00', average: 0 },
            { from: '05:00', to: '06:00', average: 0 },
            { from: '06:00', to: '07:00', average: 0 },
            { from: '07:00', to: '08:00', average: 0 },
            { from: '08:00', to: '09:00', average: 21 },
            { from: '09:00', to: '10:00', average: 8 },
            { from: '10:00', to: '11:00', average: 0 },
            { from: '11:00', to: '12:00', average: 3 },
            { from: '12:00', to: '13:00', average: 2 },
            { from: '13:00', to: '14:00', average: 0 },
            { from: '14:00', to: '15:00', average: 0 },
            { from: '15:00', to: '16:00', average: 5 },
            { from: '16:00', to: '17:00', average: 3 },
            { from: '17:00', to: '18:00', average: 0 },
            { from: '18:00', to: '19:00', average: 11 },
            { from: '19:00', to: '20:00', average: 31 },
            { from: '20:00', to: '21:00', average: 0 },
            { from: '21:00', to: '22:00', average: 0 },
            { from: '22:00', to: '23:00', average: 0 },
            { from: '23:00', to: '00:00', average: 0 }
          ]
        },
        {
          day: 'Wednesday',
          values: [
            { from: '00:00', to: '01:00', average: 0 },
            { from: '01:00', to: '02:00', average: 0 },
            { from: '02:00', to: '03:00', average: 0 },
            { from: '03:00', to: '04:00', average: 0 },
            { from: '04:00', to: '05:00', average: 0 },
            { from: '05:00', to: '06:00', average: 0 },
            { from: '06:00', to: '07:00', average: 0 },
            { from: '07:00', to: '08:00', average: 0 },
            { from: '08:00', to: '09:00', average: 0 },
            { from: '09:00', to: '10:00', average: 0 },
            { from: '10:00', to: '11:00', average: 0 },
            { from: '11:00', to: '12:00', average: 0 },
            { from: '12:00', to: '13:00', average: 0 },
            { from: '13:00', to: '14:00', average: 0 },
            { from: '14:00', to: '15:00', average: 0 },
            { from: '15:00', to: '16:00', average: 0 },
            { from: '16:00', to: '17:00', average: 0 },
            { from: '17:00', to: '18:00', average: 0 },
            { from: '18:00', to: '19:00', average: 0 },
            { from: '19:00', to: '20:00', average: 0 },
            { from: '20:00', to: '21:00', average: 0 },
            { from: '21:00', to: '22:00', average: 0 },
            { from: '22:00', to: '23:00', average: 0 },
            { from: '23:00', to: '00:00', average: 0 }
          ]
        },
        {
          day: 'Thursday',
          values: [
            { from: '00:00', to: '01:00', average: 0 },
            { from: '01:00', to: '02:00', average: 0 },
            { from: '02:00', to: '03:00', average: 0 },
            { from: '03:00', to: '04:00', average: 0 },
            { from: '04:00', to: '05:00', average: 0 },
            { from: '05:00', to: '06:00', average: 0 },
            { from: '06:00', to: '07:00', average: 0 },
            { from: '07:00', to: '08:00', average: 0 },
            { from: '08:00', to: '09:00', average: 0 },
            { from: '09:00', to: '10:00', average: 0 },
            { from: '10:00', to: '11:00', average: 0 },
            { from: '11:00', to: '12:00', average: 0 },
            { from: '12:00', to: '13:00', average: 0 },
            { from: '13:00', to: '14:00', average: 0 },
            { from: '14:00', to: '15:00', average: 0 },
            { from: '15:00', to: '16:00', average: 0 },
            { from: '16:00', to: '17:00', average: 0 },
            { from: '17:00', to: '18:00', average: 0 },
            { from: '18:00', to: '19:00', average: 0 },
            { from: '19:00', to: '20:00', average: 0 },
            { from: '20:00', to: '21:00', average: 0 },
            { from: '21:00', to: '22:00', average: 0 },
            { from: '22:00', to: '23:00', average: 0 },
            { from: '23:00', to: '00:00', average: 0 }
          ]
        },
        {
          day: 'Friday',
          values: [
            { from: '00:00', to: '01:00', average: 0 },
            { from: '01:00', to: '02:00', average: 0 },
            { from: '02:00', to: '03:00', average: 0 },
            { from: '03:00', to: '04:00', average: 0 },
            { from: '04:00', to: '05:00', average: 0 },
            { from: '05:00', to: '06:00', average: 0 },
            { from: '06:00', to: '07:00', average: 0 },
            { from: '07:00', to: '08:00', average: 0 },
            { from: '08:00', to: '09:00', average: 0 },
            { from: '09:00', to: '10:00', average: 0 },
            { from: '10:00', to: '11:00', average: 0 },
            { from: '11:00', to: '12:00', average: 0 },
            { from: '12:00', to: '13:00', average: 0 },
            { from: '13:00', to: '14:00', average: 0 },
            { from: '14:00', to: '15:00', average: 0 },
            { from: '15:00', to: '16:00', average: 0 },
            { from: '16:00', to: '17:00', average: 0 },
            { from: '17:00', to: '18:00', average: 1 },
            { from: '18:00', to: '19:00', average: 1 },
            { from: '19:00', to: '20:00', average: 0 },
            { from: '20:00', to: '21:00', average: 0 },
            { from: '21:00', to: '22:00', average: 34 },
            { from: '22:00', to: '23:00', average: 0 },
            { from: '23:00', to: '00:00', average: 0 }
          ]
        }
      ]
    }

    let expectedData = [
      { x: 'Mon', y: '12am', heat: 0 },
      { x: 'Mon', y: '12am', heat: 0 },
      { x: 'Mon', y: '2am', heat: 0 },
      { x: 'Mon', y: '2am', heat: 0 },
      { x: 'Mon', y: '4am', heat: 0 },
      { x: 'Mon', y: '4am', heat: 0 },
      { x: 'Mon', y: '6am', heat: 0 },
      { x: 'Mon', y: '6am', heat: 0 },
      { x: 'Mon', y: '8am', heat: 0 },
      { x: 'Mon', y: '8am', heat: 0 },
      { x: 'Mon', y: '10am', heat: 0 },
      { x: 'Mon', y: '10am', heat: 0 },
      { x: 'Mon', y: '12pm', heat: 0 },
      { x: 'Mon', y: '12pm', heat: 0 },
      { x: 'Mon', y: '2pm', heat: 0 },
      { x: 'Mon', y: '2pm', heat: 0 },
      { x: 'Mon', y: '4pm', heat: 0 },
      { x: 'Mon', y: '4pm', heat: 0 },
      { x: 'Mon', y: '6pm', heat: 0 },
      { x: 'Mon', y: '6pm', heat: 0 },
      { x: 'Mon', y: '8pm', heat: 0 },
      { x: 'Mon', y: '8pm', heat: 0 },
      { x: 'Mon', y: '10pm', heat: 0 },
      { x: 'Mon', y: '10pm', heat: 0 },
      { x: 'Tue', y: '12am', heat: 0 },
      { x: 'Tue', y: '12am', heat: 0 },
      { x: 'Tue', y: '2am', heat: 0 },
      { x: 'Tue', y: '2am', heat: 0 },
      { x: 'Tue', y: '4am', heat: 0 },
      { x: 'Tue', y: '4am', heat: 0 },
      { x: 'Tue', y: '6am', heat: 0 },
      { x: 'Tue', y: '6am', heat: 0 },
      { x: 'Tue', y: '8am', heat: 21 },
      { x: 'Tue', y: '8am', heat: 8 },
      { x: 'Tue', y: '10am', heat: 0 },
      { x: 'Tue', y: '10am', heat: 3 },
      { x: 'Tue', y: '12pm', heat: 2 },
      { x: 'Tue', y: '12pm', heat: 0 },
      { x: 'Tue', y: '2pm', heat: 0 },
      { x: 'Tue', y: '2pm', heat: 5 },
      { x: 'Tue', y: '4pm', heat: 3 },
      { x: 'Tue', y: '4pm', heat: 0 },
      { x: 'Tue', y: '6pm', heat: 11 },
      { x: 'Tue', y: '6pm', heat: 31 },
      { x: 'Tue', y: '8pm', heat: 0 },
      { x: 'Tue', y: '8pm', heat: 0 },
      { x: 'Tue', y: '10pm', heat: 0 },
      { x: 'Tue', y: '10pm', heat: 0 },
      { x: 'Wed', y: '12am', heat: 0 },
      { x: 'Wed', y: '12am', heat: 0 },
      { x: 'Wed', y: '2am', heat: 0 },
      { x: 'Wed', y: '2am', heat: 0 },
      { x: 'Wed', y: '4am', heat: 0 },
      { x: 'Wed', y: '4am', heat: 0 },
      { x: 'Wed', y: '6am', heat: 0 },
      { x: 'Wed', y: '6am', heat: 0 },
      { x: 'Wed', y: '8am', heat: 0 },
      { x: 'Wed', y: '8am', heat: 0 },
      { x: 'Wed', y: '10am', heat: 0 },
      { x: 'Wed', y: '10am', heat: 0 },
      { x: 'Wed', y: '12pm', heat: 0 },
      { x: 'Wed', y: '12pm', heat: 0 },
      { x: 'Wed', y: '2pm', heat: 0 },
      { x: 'Wed', y: '2pm', heat: 0 },
      { x: 'Wed', y: '4pm', heat: 0 },
      { x: 'Wed', y: '4pm', heat: 0 },
      { x: 'Wed', y: '6pm', heat: 0 },
      { x: 'Wed', y: '6pm', heat: 0 },
      { x: 'Wed', y: '8pm', heat: 0 },
      { x: 'Wed', y: '8pm', heat: 0 },
      { x: 'Wed', y: '10pm', heat: 0 },
      { x: 'Wed', y: '10pm', heat: 0 },
      { x: 'Thu', y: '12am', heat: 0 },
      { x: 'Thu', y: '12am', heat: 0 },
      { x: 'Thu', y: '2am', heat: 0 },
      { x: 'Thu', y: '2am', heat: 0 },
      { x: 'Thu', y: '4am', heat: 0 },
      { x: 'Thu', y: '4am', heat: 0 },
      { x: 'Thu', y: '6am', heat: 0 },
      { x: 'Thu', y: '6am', heat: 0 },
      { x: 'Thu', y: '8am', heat: 0 },
      { x: 'Thu', y: '8am', heat: 0 },
      { x: 'Thu', y: '10am', heat: 0 },
      { x: 'Thu', y: '10am', heat: 0 },
      { x: 'Thu', y: '12pm', heat: 0 },
      { x: 'Thu', y: '12pm', heat: 0 },
      { x: 'Thu', y: '2pm', heat: 0 },
      { x: 'Thu', y: '2pm', heat: 0 },
      { x: 'Thu', y: '4pm', heat: 0 },
      { x: 'Thu', y: '4pm', heat: 0 },
      { x: 'Thu', y: '6pm', heat: 0 },
      { x: 'Thu', y: '6pm', heat: 0 },
      { x: 'Thu', y: '8pm', heat: 0 },
      { x: 'Thu', y: '8pm', heat: 0 },
      { x: 'Thu', y: '10pm', heat: 0 },
      { x: 'Thu', y: '10pm', heat: 0 },
      { x: 'Fri', y: '12am', heat: 0 },
      { x: 'Fri', y: '12am', heat: 0 },
      { x: 'Fri', y: '2am', heat: 0 },
      { x: 'Fri', y: '2am', heat: 0 },
      { x: 'Fri', y: '4am', heat: 0 },
      { x: 'Fri', y: '4am', heat: 0 },
      { x: 'Fri', y: '6am', heat: 0 },
      { x: 'Fri', y: '6am', heat: 0 },
      { x: 'Fri', y: '8am', heat: 0 },
      { x: 'Fri', y: '8am', heat: 0 },
      { x: 'Fri', y: '10am', heat: 0 },
      { x: 'Fri', y: '10am', heat: 0 },
      { x: 'Fri', y: '12pm', heat: 0 },
      { x: 'Fri', y: '12pm', heat: 0 },
      { x: 'Fri', y: '2pm', heat: 0 },
      { x: 'Fri', y: '2pm', heat: 0 },
      { x: 'Fri', y: '4pm', heat: 0 },
      { x: 'Fri', y: '4pm', heat: 1 },
      { x: 'Fri', y: '6pm', heat: 1 },
      { x: 'Fri', y: '6pm', heat: 0 },
      { x: 'Fri', y: '8pm', heat: 0 },
      { x: 'Fri', y: '8pm', heat: 34 },
      { x: 'Fri', y: '10pm', heat: 0 },
      { x: 'Fri', y: '10pm', heat: 0 }
    ]

    api.mockData = mockData
    controller.getPeekHoursData({})
      .then(data => {
        expect(data).toEqual(expectedData)
      })
  })
})
