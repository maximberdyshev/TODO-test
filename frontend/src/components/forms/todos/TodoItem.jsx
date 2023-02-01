import React, { useState } from 'react'
import MyButton from '../../ui/buttons/MyButton.jsx'
import MyModal from '../../ui/modals/MyModal.jsx'
import styles from './Todo.module.css'

const TodoItem = ({ todo, number }) => {
  const [modal, setModal] = useState(false)

  return (
    <div className={styles.TodoItem}>
      <div className={styles.item_part}>
        {todo.completed ? (
          <p style={{ textDecoration: 'line-through', color: 'green' }}>
            {number}. {todo.title}
          </p>
        ) : (
          <p style={{ color: 'grey' }}>
            {number}. {todo.title}
          </p>
        )}
        <p>{todo.description}</p>
        <p>Ответственный: {todo.executor} </p>
      </div>

      <div className={styles.item_part}>
        <p>Приоритет: {todo.priority} </p>
        <p>Дата окончания: {todo.date_end} </p>
        {todo.completed ? (
          <p>Статус задачи: выполнена </p>
        ) : (
          <p>Статус задачи: в работе </p>
        )}
      </div>

      <div className={styles.btn}>
        <MyButton
          onClick={() => {
            setModal(true)
          }}>
          Просмотреть
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          placeholder todo updater
        </MyModal>
        <MyButton onClick={() => {}}>
          {todo.completed ? <p>Отменить</p> : <p>Выполнить</p>}
        </MyButton>
        <MyButton onClick={() => {}}>Удалить</MyButton>
      </div>
    </div>
  )
}

export default TodoItem
