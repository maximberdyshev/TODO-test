import React, { useEffect, useState } from 'react'
import styles from '../Main.module.css'
import TodoList from '../forms/todos/TodoList.jsx'
import MyNavbar from '../forms/navbars/MyNavbar.jsx'
import { APICtodos } from '../../APIC/APICtodos.js'
import { APIClogin } from '../../APIC/APIClogin.js'

const Todos = (props) => {
  // список пользователей для селекта
  const [userSelect, setUserSelect] = useState([])

  // подгружаем список пользователей с бд
  const getUsers = async () => {
    const res = await APIClogin.getUsers(
      localStorage.getItem('depID'),
      localStorage.getItem('userRoleID')
    )
    setUserSelect(createOptions(res))
  }

  // формируем динамический массив "опций" для селекта
  const createOptions = (arr) => {
    let options = []

    for (let i = 0; arr.length > i; i++) {
      options.push({ label: arr[i].login, value: arr[i].id })
    }
    return options
  }

  // подгружаем список пользователей на фронт
  useEffect(() => {
    getUsers()
  }, [])

  const [todos, setTodos] = useState([])

  const [filtered, setFiltered] = useState([])

  const getAllTodos = async () => {
    const args = {
      roleID: localStorage.getItem('userRoleID'),
      depID: localStorage.getItem('depID'),
    }
    const res = await APICtodos.getAllTask(args)
    setTodos(res)
    setFiltered(res)
  }

  useEffect(() => {
    getAllTodos()
  }, [])

  const filter = (arg) => {
    if (arg === 'all') {
      setFiltered(todos)
      localStorage.setItem('filter', 'all')
    } else if (arg === 'me_executor') {
      let newTodos = [...todos].filter(
        (todo) => todo.executor === localStorage.getItem('userLogin')
      )
      setFiltered(newTodos)
      localStorage.setItem('filter', 'me_executor')
    } else if (arg === 'completed') {
      let newTodos = [...todos].filter(
        (todo) =>
          todo.status === 2 &&
          todo.executor === localStorage.getItem('userLogin')
      )
      setFiltered(newTodos)
      localStorage.setItem('filter', 'completed')
    } else if (arg === 'overdued') {
      let newTodos = [...todos].filter(
        (todo) =>
          todo.status === 1 &&
          new Date(todo.date_end) < new Date() &&
          todo.executor === localStorage.getItem('userLogin')
      )
      setFiltered(newTodos)
      localStorage.setItem('filter', 'overdued')
    }
  }

  return (
    <div className={styles.todos}>
      <MyNavbar
        todos={filtered}
        setTodos={setTodos}
        isAuth={props.isAuth}
        setAuth={props.setAuth}
        userSelect={userSelect}
        filter={filter}
      />
      <div className={styles.TodoList}>
        <TodoList
          todos={filtered}
          setTodos={setFiltered}
          userSelect={userSelect}
        />
      </div>
    </div>
  )
}

export default Todos
