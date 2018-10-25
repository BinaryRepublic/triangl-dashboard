import MockAPI from '../../../src/controllers/MockAPI'
import DataController from '../../../src/controllers/DataController'

describe('DataController.js', () => {
  let api = new MockAPI()
  let controller = new DataController(api)

  it('should return data for Active Customers diagram', () => {
    let mockData = {
      data: {
        total: 42,
        data: [{from: '2018-10-18T22:00:00Z', to: '2018-10-19T21:59:59.857142856Z', count: 36}, {from: '2018-10-19T21:59:59.857142857Z', to: '2018-10-20T21:59:59.714285713Z', count: 0}, {from: '2018-10-20T21:59:59.714285714Z', to: '2018-10-21T21:59:59.571428570Z', count: 0}, {from: '2018-10-21T21:59:59.571428571Z', to: '2018-10-22T21:59:59.428571427Z', count: 0}, {from: '2018-10-22T21:59:59.428571428Z', to: '2018-10-23T21:59:59.285714284Z', count: 65}, {from: '2018-10-23T21:59:59.285714285Z', to: '2018-10-24T21:59:59.142857141Z', count: 0}, {from: '2018-10-24T21:59:59.142857142Z', to: '2018-10-25T21:59:58.999999998Z', count: 0}]
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
        data: [{from: '2018-10-18T22:00:00Z', to: '2018-10-19T21:59:59.857142856Z', count: 36}, {from: '2018-10-19T21:59:59.857142857Z', to: '2018-10-20T21:59:59.714285713Z', count: 0}, {from: '2018-10-20T21:59:59.714285714Z', to: '2018-10-21T21:59:59.571428570Z', count: 0}, {from: '2018-10-21T21:59:59.571428571Z', to: '2018-10-22T21:59:59.428571427Z', count: 0}, {from: '2018-10-22T21:59:59.428571428Z', to: '2018-10-23T21:59:59.285714284Z', count: 65}, {from: '2018-10-23T21:59:59.285714285Z', to: '2018-10-24T21:59:59.142857141Z', count: 0}, {from: '2018-10-24T21:59:59.142857142Z', to: '2018-10-25T21:59:58.999999998Z', count: 0}]
      }
    }

    api.mockData = mockData
    controller.getCountCustomersData({}, { labels: [], datasets: [{}] }, '')
      .then(data => {
        expect(data).toEqual({data: { datasets: [ { data: [36, 0, 0, 0, 65, 0, 0] } ], labels: [] }, total: 42})
      })
  })
})
