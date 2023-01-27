import axios from 'axios'

// TODO: заменить localhost!!
class APIClogin {
  static checkLogin = async (login, password) => {
    const response = await axios.post('http://localhost:3001/users/login', {
      login,
      password,
    })
    return response.data
  }

  static logOut = async (login) => {
    const response = await axios.post('http://localhost:3001/users/logout', {
      login,
    })
    return response.data
  }

  static register = async (login, password) => {
    const response = await axios.post('http://localhost:3001/users/register', {
      login,
      password,
    })
    return response.data
  }
}

export { APIClogin }
