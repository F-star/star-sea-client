import qs from 'qs'

export function getQuery(key) {
  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  return query[key]
}