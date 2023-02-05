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
    const res = await APIClogin.getUsers()
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

  const getAllTodos = async () => {
    const args = {
      roleID: localStorage.getItem('userRoleID'),
      depID: localStorage.getItem('depID'),
    }
    const res = await APICtodos.getAllTask(args)
    setTodos(res)
  }

  useEffect(() => {
    getAllTodos()
  }, [todos])

  // памятка: образец полей тудушки
  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   title: 'Заголовок задачи 1',
    //   description: 'Описание задачи 1',
    //   dateEnd: '2022-10-10',
    //   dateCreate: '2022-01-01',
    //   dateUpdate: '2022-05-05',
    //   priority: 'средний',
    //   completed: false,
    //   initiator: 'Smith',
    //   executor: 'Smith',
    // },
  ])

  return (
    <div className={styles.todos}>
      <MyNavbar
        todos={todos}
        setTodos={setTodos}
        isAuth={props.isAuth}
        setAuth={props.setAuth}
        userSelect={userSelect}
      />
      <div className={styles.TodoList}>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          userSelect={userSelect}
        />
      </div>
    </div>
  )
}

export default Todos
