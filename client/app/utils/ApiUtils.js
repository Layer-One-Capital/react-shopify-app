import axios from 'axios'
let authInterceptor = null

export default class ApiUtils {
  static setAuthHeader(accessToken) {
    if (authInterceptor !== null)
      axios.interceptors.request.eject(authInterceptor)

    authInterceptor = axios.interceptors.request.use(config => {
      config.headers['Authorization'] = accessToken
      return config
    })
  }
}
