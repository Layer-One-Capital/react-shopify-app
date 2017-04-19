import alt from 'alt'
import axios from 'axios'
import { API_BASE } from 'consts'

// Boilerplate: ExtendedUserActions is for 'extending' a common user for things just this app needs

const ExtendedUserSource = {
  fetchCurrent: function(token) {
    const instance = axios.create({
      headers: { 'Authorization': token }
    })

    return instance.post(`${API_BASE}/users/current`)
      .then(res => res.data)
  }
}

export default ExtendedUserSource
