import axios from 'axios'
import qs from 'qs'

const http = axios.create()

http.interceptors.request.use(
  config => {
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    const token = query.token
    if (token) config.headers['Authorization'] = token
    return config
  },
  error => Promise.reject(error)
)

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // window.location.href = '/login'
      alert('token失效')
    }
    return Promise.reject(error)
  }
)

export default http
