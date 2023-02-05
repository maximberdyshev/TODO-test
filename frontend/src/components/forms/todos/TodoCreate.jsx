import React, { useState } from 'react'
import MyButton from '../../ui/buttons/MyButton.jsx'
import MyInput from '../../ui/inputs/MyInput.jsx'
import MySelect from '../../ui/selects/MySelect.jsx'

const TodoCreate = ({ items, ...props }) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    body: '',
    date_end: '',
    dateCreate: '',
    initiator: '',
    executor: localStorage.getItem('userID'),
  })

  const getToday = () => {
    const currentDate = new Date()
    return currentDate.toISOString().split('T')[0]
  }

  const addNewTodo = (event) => {
    event.preventDefault()

    const newTodoItem = {
      ...newTodo,
      dateCreate: getToday(),
      initiator: localStorage.getItem('userID'),
    }
    props.createTodo(newTodoItem)
    setNewTodo({
      title: '',
      body: '',
      date_end: '',
      dateCreate: '',
      initiator: '',
      executor: '',
    })
  }

  return (
    <div>
      <form>
        <MyInput
          type='text'
          placeholder='Заголовок задачи'
          value={newTodo.title}
          onChange={(event) => {
            setNewTodo({ ...newTodo, title: event.target.value })
          }}
        />
        <MyInput
          type='text'
          placeholder='Описание задачи'
          value={newTodo.body}
          onChange={(event) => {
            setNewTodo({ ...newTodo, body: event.target.value })
          }}
        />
        <MyInput
          type='text'
          placeholder='Дата окончания'
          value={newTodo.date_end}
          onChange={(event) => {
            setNewTodo({ ...newTodo, date_end: event.target.value })
          }}
        />
        <MySelect items={items} onChange={(event) => {
            setNewTodo({ ...newTodo, executor: event.target.value })
          }}/>
        <div>
          <MyButton children={'Создать задачу'} onClick={addNewTodo} />
        </div>
      </form>
    </div>
  )
}

export default TodoCreate
