import React, { useEffect, useState } from 'react'
import styles from '../Main.module.css'
import TodoList from '../forms/todos/TodoList.jsx'
import MyNavbar from '../forms/navbars/MyNavbar.jsx'
import { APICtodos } from '../../APIC/APICtodos.js'

const Todos = (props) => {
  const getAll = async () => {
    const args = {
      roleID: localStorage.getItem('userRoleID'),
      depID: localStorage.getItem('depID'),
    }
    const res = await APICtodos.getAllTask(args)
    setTodos(res)
  }

  useEffect(() => {
    getAll()
  }, [todos])

  // памятка: образец полей тудушки
  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   title: 'Заголовок задачи 1',
    //   body: 'Описание задачи 1',
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
      <MyNavbar todos={todos} setTodos={setTodos} isAuth={props.isAuth} setAuth={props.setAuth} />
      <div className={styles.TodoList}>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  )
}

export default Todos
