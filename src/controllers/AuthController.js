import auth0Js from 'auth0-js'
import EventEmitter from 'EventEmitter'
import router from '../router/index'
import {
  authConfig
} from './constants'

const {
  domain,
  clientID,
  responseType,
  scope,
  audience,
  callbackUrl,
  successUrl,
  logoutUrl
} = authConfig

export default class AuthController {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0Js.WebAuth({
    domain,
    clientID,
    redirectUri: window.location.origin + callbackUrl,
    responseType,
    scope
  })

  login () {
    this.auth0.authorize({
      audience,
      scope,
      responseType,
      redirectUri: window.location.origin + callbackUrl
    })
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace(successUrl)
      } else if (err) {
        router.replace(successUrl)
        console.error(err)
      }
    })
  }

  getAccessTokenOrLogin () {
    const that = this

    return new Promise((resolve, reject) => {
      if (!that.isAuthenticated()) {
        that.auth0.checkSession({
          audience,
          scope
        }, function (err, authResult) {
          if (err) {
            that.login()
            reject(new Error('login required'))
          } else {
            that.setSession(authResult)
            resolve(authResult.accessToken)
          }
        })
      } else {
        resolve(localStorage.getItem('access_token'))
      }
    })
  }

  setSession (authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.authNotifier.emit('authChange', false)

    this.auth0.logout({
      returnTo: window.location.origin + logoutUrl,
      clientID
    })
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
