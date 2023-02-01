import axios from 'axios'

// TODO: заменить localhost!!
class APICtodos {
  // TODO: бэк возвращает данные из таблицы с "числовыми значениями" некоторых полей
  // где (и как?) делать преобразование?
  static getAllTask = async (login) => {
    const response = await axios.post('http://localhost:3001/todos/all', {
      login,
    })
    return response.data
  }

  static updateTask = async () => {}

  static createTask = async (todo) => {
    const response = await axios.post('http://localhost:3001/todos/create', {
      todo,
    })
    return response.data
  }

  static deleteTask = async (id) => {
    const response = await axios.post('http://localhost:3001/todos/delete', {
      id,
    })
    return response.data
  }
}

export { APICtodos }
