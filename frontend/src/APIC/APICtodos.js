import axios from 'axios'

class APICtodos {
  static getAllTask = async (login) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/todos/all`, {
      login,
    })
    return response.data
  }

  static updateTask = async () => {}

  static createTask = async (todo) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/todos/create`, {
      todo,
    })
    return response.data
  }

  static deleteTask = async (id) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/todos/delete`, {
      id,
    })
    return response.data
  }
}

export { APICtodos }
