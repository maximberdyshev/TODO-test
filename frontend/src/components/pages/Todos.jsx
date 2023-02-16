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

  const [filtered, setFiltered] = useState([])
  
  const filter = async (arg) => {
    const res = await APICtodos.getTask({
      userLogin: localStorage.getItem('userLogin'),
      roleID: localStorage.getItem('userRoleID'),
      depID: localStorage.getItem('depID'),
      filter: arg,
    })
    localStorage.setItem('filter', arg)
    setFiltered(res)
  }
  
  useEffect(() => {
    filter(localStorage.getItem('filter'))
  }, [])

  return (
    <div className={styles.todos}>
      <MyNavbar
        todos={filtered}
        setTodos={setFiltered}
        isAuth={props.isAuth}
        setAuth={props.setAuth}
        userSelect={userSelect}
        filter={filter}
      />
      <div className={styles.todoList}>
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
