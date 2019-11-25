import axios from 'axios'
import EventEmitter from 'EventEmitter'
import router from '../router/index'
import {
  authConfig
} from './constants'
import rand from 'csprng'
import { Base64 } from 'js-base64'
import sha256 from 's256'
import jwtDecode from 'jwt-decode'

const {
  host,
  clientID,
  responseType,
  audience,
  callbackUrl,
  successUrl
} = authConfig

axios.create({ baseURL: host })

export default class AuthController {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.state = this.getState()

    const { codeVerifier, codeChallenge } = this.getPKSETokens()
    this.codeVerifier = codeVerifier
    this.codeChallenge = codeChallenge
  }

  getState (refresh = false) {
    if (refresh) {
      window.localStorage.setItem('auth_state', rand(160, 36))
    }
    return window.localStorage.getItem('auth_state') || null
  }
  getPKSETokens (refresh = false) {
    if (refresh) {
      const verifier = rand(160, 36)
      window.localStorage.setItem('auth_code_verifier', verifier)
      window.localStorage.setItem('auth_code_challenge', Base64.encode(sha256(verifier)))
    }
    return {
      codeVerifier: window.localStorage.getItem('auth_code_verifier') || null,
      codeChallenge: window.localStorage.getItem('auth_code_challenge') || null
    }
  }

  login () {
    if (this.redirectPending) return

    this.state = this.getState(true)
    const { codeChallenge } = this.getPKSETokens(true)
    this.codeChallenge = codeChallenge

    this.redirectPending = true
    window.location.replace(`${host}/auth/authorize` +
      `?response_type=${encodeURIComponent(responseType)}` +
      `&redirect_uri=${encodeURIComponent(`${location.protocol}//${location.host}${callbackUrl}`)}` +
      `&client_id=${encodeURIComponent(clientID)}` +
      `&state=${encodeURIComponent(this.state)}` +
      `&code_challenge=${encodeURIComponent(this.codeChallenge)}` +
      '&code_challenge_method=S256' +
      `&audience=${encodeURIComponent(audience)}`)
  }

  handleAuthentication () {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')

    if (state !== this.state) {
      console.error('state does not match')
      return
    }

    axios.post(`${host}/auth/token`, {
      grant_type: 'authorization_code',
      code,
      code_verifier: this.codeVerifier,
      response_type: responseType
    }).then((res) => {
      this.setSession(res.data)
      router.replace(successUrl)
    }).catch(e => {
      alert(e.response.data)
      router.replace(successUrl)
    })
  }

  getAccessTokenOrLogin () {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        const refreshToken = this.getValidRefreshToken()
        if (!refreshToken) {
          this.login()
          return
        }
        axios.post(`${host}/auth/token`, {
          grant_type: 'refresh_token',
          response_type: responseType,
          refresh_token: refreshToken
        }).then((res) => {
          this.setSession(res.data)
          resolve(res.data.access_token)
        }).catch(e => {
          reject(e)
          this.login()
        })
      } else {
        resolve(localStorage.getItem('access_token'))
      }
    })
  }

  getParsedIdToken () {
    const idToken = localStorage.getItem('id_token')
    return idToken
      ? jwtDecode(idToken)
      : null
  }

  setSession (tokens) {
    let expiresAt = JSON.stringify(
      tokens.expires_in * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
    localStorage.setItem('id_token', tokens.id_token)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    if (!accessToken && !refreshToken) {
      return
    }
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')

    const p1 = axios.post(`${host}/auth/token/revoke`, { token: accessToken, token_type_hint: 'access_token' })
    const p2 = axios.post(`${host}/auth/token/revoke`, { token: refreshToken, token_type_hint: 'refresh_token' })
    this.authNotifier.emit('authChange', false)

    Promise.all([p1, p2])
      .then(() => {
        this.login()
      })
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getValidRefreshToken () {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
      return null
    }
    const parsedRefreshToken = jwtDecode(refreshToken)
    const refreshTokenExp = new Date(parsedRefreshToken.exp * 1000).toISOString()
    if (refreshTokenExp < new Date().toISOString()) {
      return null
    }
    return refreshToken
  }
}
