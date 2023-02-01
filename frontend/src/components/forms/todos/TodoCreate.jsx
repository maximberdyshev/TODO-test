import React, { useState } from 'react'
import MyButton from '../../ui/buttons/MyButton.jsx'
import MyInput from '../../ui/inputs/MyInput.jsx'

const TodoCreate = (props) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    body: '',
    dateEnd: '',
    dateCreate: '',
    initiator: '',
    executor: '',
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
      // TODO: userLogin в текстовом формате, а инсерт в БД идёт в цифровом
      // initiator: localStorage.getItem('userLogin')
      initiator: 1
    }
    props.createTodo(newTodoItem)
    setNewTodo({
      title: '',
      body: '',
      dateEnd: '',
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
          onChange={(event) =>{
            setNewTodo({ ...newTodo, title: event.target.value})
          }}
        />
        <MyInput 
          type='text'
          placeholder='Описание задачи'
          value={newTodo.body}
          onChange={(event) =>{
            setNewTodo({ ...newTodo, body: event.target.value})
          }} />
        <MyInput 
          type='text'
          placeholder='Дата окончания'
          value={newTodo.dateEnd}
          onChange={(event) =>{
            setNewTodo({ ...newTodo, dateEnd: event.target.value})
          }} />
        <MyInput 
          type='text'
          placeholder='Исполнитель'
          value={newTodo.executor}
          onChange={(event) =>{
            setNewTodo({ ...newTodo, executor: event.target.value})
          }} />
        <MyButton children={'Создать задачу'} onClick={addNewTodo} />
      </form>
    </div>
  )
}

export default TodoCreate
