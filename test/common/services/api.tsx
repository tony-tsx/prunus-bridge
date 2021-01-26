import Axios from 'axios'
import qs from 'qs'

const api = Axios.create( {
  baseURL: 'http://localhost:8080',
  paramsSerializer: qs.stringify
} )

export default api
