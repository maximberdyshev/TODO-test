import axios from 'axios'

class APICtodos {
  static getTask = async (args) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/todos/task`, {
      args,
    })
    return response.data
  }

  static updateTask = async (todo) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/todos/update`, {
      todo,
    })
    return response.data
  }

  static completeTask = async (id, status) => {
    const response = await axios.post(`http://${FETCH_ADDR}:${FETCH_PORT}/todos/complete`, {
      id,
      status
    })
    return response.data
  }

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
