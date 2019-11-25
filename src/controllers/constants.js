export const authConfig = {
  host: 'http://localhost:3000',
  clientID: 'TRIANGL_WEB_APP',
  responseType: 'token id_token',
  audience: 'https://api.triangl.io/dashboard-service',
  callbackUrl: '/callback',
  successUrl: '/'
}
