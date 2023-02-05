import React, { useState } from 'react'
import styles from './MyNavbar.module.css'
import { APIClogin } from '../../../APIC/APIClogin.js'
import { APICtodos } from '../../../APIC/APICtodos.js'
import MyButton from '../../ui/buttons/MyButton.jsx'
import MyModal from '../../ui/modals/MyModal.jsx'
import TodoCreate from '../todos/TodoCreate.jsx'

const MyNavbar = (props) => {
  const [modal, setModal] = useState(false)

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

  // тестируем всякое
  const getTest = async () => {
    const args = {
      roleID: localStorage.getItem('userRoleID'),
      depID: localStorage.getItem('depID'),
    }
    const res = await APICtodos.ttt(args)
    console.log(res)
  }

  return (
    <div className={styles.navbar}>
      <MyButton children={'Новая задача'} onClick={() => {setModal(!modal)}} />
      <MyModal visible={modal} setVisible={setModal}>
        <TodoCreate createTodo={createTodo} items={props.userSelect} />
      </MyModal>
      {/* TODO: реализовать функционал */}
      <div className={styles.navbar__btns}>
      <MyButton>Все задачи</MyButton></div>
      {/* TODO: реализовать функционал */}
      <div className={styles.navbar__btns}>
      <MyButton>Я ответственный</MyButton></div>
      {/* TODO: реализовать функционал */}
      <div className={styles.navbar__btns}>
      <MyButton>Я инициатор</MyButton></div>
      {/* TODO: реализовать функционал */}
      <div className={styles.navbar__btns}>
      <MyButton>Выполненные задачи</MyButton></div>
      {/* TODO: реализовать функционал */}
      <div className={styles.navbar__btns}>
      <MyButton>Просроченные задачи</MyButton></div>
      {/* тестовая кнопачка */}
      <button onClick={getTest}>asdasd</button>
      <div className={styles.navbar__exit}>
        <span className={styles.navbar__span}>
          Пользователь: {localStorage.getItem('userLogin')} ({localStorage.getItem('userRole')})
        </span>
        <MyButton children={'Выйти'} onClick={logOut} />
      </div>
    </div>
  )
}

export default MyNavbar
