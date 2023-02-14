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
    await APIClogin.logOut(
      localStorage.getItem('userLogin'),
      localStorage.getItem('sessionID')
    )
    localStorage.clear()
    props.setAuth(!props.isAuth)
  }

  const createTodo = async (todo) => {
    const createID = await APICtodos.createTask(todo)
    const addTodoWithID = { ...todo, id: createID }

    // если id исполнителя не совпадает с текущим пользователем, то таску не выводим на экран
    if (todo.executorID == localStorage.getItem('userID')) {
      props.setTodos([...props.todos, addTodoWithID])
    }
    setModal(!modal)
  }

  return (
    <div className={styles.navbar}>
      <MyButton
        children={'Новая задача'}
        onClick={() => {
          setModal(!modal)
        }}
      />
      <MyModal visible={modal} setVisible={setModal}>
        <TodoCreate createTodo={createTodo} items={props.userSelect} />
      </MyModal>
      <div className={styles.navbarBtn}>
        <MyButton children={'Все задачи'} onClick={() => {props.filter('all')}} />
      </div>
      <div className={styles.navbarBtn}>
        <MyButton children={'Я ответственный'} onClick={() => {props.filter('me_executor')}} />
      </div>
      <div className={styles.navbarBtn}>
        <MyButton children={'Мои выполненные задачи'} onClick={() => {props.filter('completed')}} />
      </div>
      <div className={styles.navbarBtn}>
        <MyButton children={'Мои просроченные задачи'} onClick={() => {props.filter('overdued')}} />
      </div>
      <div className={styles.navbarExit}>
        <span className={styles.navbarSpan}>
          Пользователь: {localStorage.getItem('userLogin')} (
          {localStorage.getItem('userRole')})
        </span>
        <MyButton children={'Выйти'} onClick={logOut} />
      </div>
    </div>
  )
}

export default MyNavbar
