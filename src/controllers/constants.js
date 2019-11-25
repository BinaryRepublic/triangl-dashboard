export const authConfig = {
  host: 'http://api.triangl.local.io/auth-service',
  clientID: 'TRIANGL_WEB_APP',
  responseType: 'token id_token',
  audience: 'http://api.triangl.local.io/dashboard-service',
  callbackUrl: '/callback',
  successUrl: '/'
}
