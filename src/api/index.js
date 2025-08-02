import axios from 'axios'

const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'applicattion/json',
    'X-Auth-Token': ' d2b968804c0e4852a533383276290aef',
    //'X-Auth-Token': 'b6b534e5e172465d8c3a98ef276e7b37',
  },
})

export default api
