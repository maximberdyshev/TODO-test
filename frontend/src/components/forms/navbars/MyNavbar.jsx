import React, { useEffect, useState } from 'react'
import styles from './MyNavbar.module.css'
import { APIClogin } from '../../../APIC/APIClogin.js'
import { APICtodos } from '../../../APIC/APICtodos.js'
import MyButton from '../../ui/buttons/MyButton.jsx'
import MyModal from '../../ui/modals/MyModal.jsx'
import TodoCreate from '../todos/TodoCreate.jsx'

const MyNavbar = (props) => {
  const [modal, setModal] = useState(false)
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

  const logOut = async () => {
    await APIClogin.logOut(localStorage.getItem('userLogin'), localStorage.getItem('sessionID'))
    localStorage.clear()
    props.setAuth(!props.isAuth)
  }

  const createTodo = async (todo) => {
    const createID = await APICtodos.createTask(todo)
    const addID = {...todo, id: createID}

    // если id исполнителя не совпадает с текущим пользователем, то таску не выводим на экран
    if (todo.executor == localStorage.getItem('userID')) {
      props.setTodos([...props.todos, addID])
    }
    setModal(!modal)
  }

  const getTest = async () => {
    const res = await APICtodos.ttt(localStorage.getItem('userLogin'))
    console.log(res)
  }

  return (
    <div className={styles.navbar}>
      <MyButton children={'Новая задача'} onClick={() => {setModal(!modal)}} />
      <MyModal visible={modal} setVisible={setModal}>
        <TodoCreate createTodo={createTodo} items={userSelect} />
      </MyModal>
      <button onClick={getTest}>asdasd</button>
      <div className={styles.navbar__exit}>
        <MyButton children={'Выйти'} onClick={logOut} />
      </div>
    </div>
  )
}

export default MyNavbar
