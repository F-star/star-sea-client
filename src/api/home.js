import http from '../utils/http.js'

export function api_getFileList(params) {
  const url = '/api/v1/file/list'
  return http.get(url, { params })
}
