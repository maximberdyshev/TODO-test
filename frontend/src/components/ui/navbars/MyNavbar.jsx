import React, { useEffect, useState } from 'react'
import styles from './MyNavbar.module.css'
import { APIClogin } from '../../../APIC/APIClogin.js'
import { APICtodos } from '../../../APIC/APICtodos.js'
import MyButton from '../buttons/MyButton.jsx'
import MyModal from '../modals/MyModal.jsx'
import TodoCreate from '../../forms/todos/TodoCreate.jsx'

const MyNavbar = (props) => {
  const [modal, setModal] = useState(false)
  const [userSelect, setUserSelect] = useState([])

  const getUsers = async () => {
    const res = await APIClogin.getUsers()
    setUserSelect(createOptions(res))
  }

  const createOptions = (arr) => {
    let options = []

    for (let i = 0; arr.length > i; i++) {
      options.push({ login: arr[i].login, id: arr[i].id })
    }

    return options
  }

  useEffect(() => {
    getUsers()
  }, [])

  const logOut = async () => {
    await APIClogin.logOut(localStorage.getItem('userLogin'), localStorage.getItem('sessionID'))
    localStorage.clear()
    props.setAuth(!props.isAuth)
  }

  const createTodo = async (todo) => {
    const createID = await APICtodos.createTask(todo)
    const addID = {...todo, id: createID}
    if (todo.executor == localStorage.getItem('userID')) {
      props.setTodos([...props.todos, addID])
    }
    setModal(!modal)
  }

  return (
    <div className={styles.navbar}>
      <MyButton children={'Новая задача'} onClick={() => {setModal(!modal)}} />
      <MyModal visible={modal} setVisible={setModal}>
        <TodoCreate createTodo={createTodo} items={userSelect} />
      </MyModal>
      <div className={styles.navbar__exit}>
        <MyButton children={'Выйти'} onClick={logOut} />
      </div>
    </div>
  )
}

export default MyNavbar
