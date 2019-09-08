import axios from '../utils/axios.config'
import api from '../constant/api'

export function getChannels () {
  return axios({
    url: api.API_CHANNELS
  })
}
