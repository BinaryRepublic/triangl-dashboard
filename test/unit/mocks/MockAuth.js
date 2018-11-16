export default class MockAuth {
  login () {}

  handleAuthentication () {}

  getAccessTokenOrLogin () {
    return new Promise((resolve) => { resolve('access_token') })
  }

  setSession (authResult) {}

  logout () {}

  isAuthenticated () { return true }
}
