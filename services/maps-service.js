import axios from 'axios'

export default class LocationService {
  getLocations(param) {
    const request = axios.get(`${process.env.VUE_BASE_HOST}locations?${param}`)
      .then(response => response)
      .catch(e => {
        throw e
      }).finally(() => {

      })
    return request
  }
}