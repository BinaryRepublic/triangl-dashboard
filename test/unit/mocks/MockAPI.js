export default class MockAPI {
  post (url, parameters) {
    return new Promise((resolve, reject) => {
      resolve(this.mockData)
    })
  }
}
