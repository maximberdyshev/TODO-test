import axios from 'axios'

class APIClogin {
  static checkLogin = async (login, password, sessionID) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/users/login`, {
      login,
      password,
      sessionID,
    })
    return response.data
  }

  static logOut = async (login, sessionID) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/users/logout`, {
      login,
      sessionID,
    })
    return response.data
  }

  static register = async (login, password) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/users/register`, {
      login,
      password,
    })
    return response.data
  }
}

export { APIClogin }
