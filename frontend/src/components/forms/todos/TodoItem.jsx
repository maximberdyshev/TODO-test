import React, { useState } from 'react'
import MyButton from '../../ui/buttons/MyButton.jsx'
import MyModal from '../../ui/modals/MyModal.jsx'
import styles from './Todo.module.css'
import TodoUpdate from './TodoUpdate.jsx'

const TodoItem = ({ todo, number, ...props }) => {
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
        {todo.date_end != null ? (
          <p>Дата окончания: {todo.date_end.split('T')[0]}</p>
        ) : (
          <p>Дата окончания: нет</p>
        )}
        {todo.completed ? (
          <p>Статус задачи: выполнена </p>
        ) : (
          <p>Статус задачи: в работе </p>
        )}
      </div>

      <div className={styles.btn}>
        <MyButton children={'Просмотреть'} onClick={() => {setModal(true)}} />
        <MyModal visible={modal} setVisible={setModal}>
          <div>
            <TodoUpdate
              todo={todo}
              items={props.userSelect}
              updateTodo={props.updateTodo}
              modal={modal}
              setModal={setModal}
            />
          </div>
        </MyModal>
        <MyButton onClick={() => {}}>
          {todo.completed ? <p>Отменить</p> : <p>Выполнить</p>}
        </MyButton>
        <MyButton children={'Удалить'} onClick={() => {props.removeTodo(todo.id)}} />
      </div>
    </div>
  )
}

export default TodoItem
