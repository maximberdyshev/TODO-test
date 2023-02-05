import React, { useEffect, useState } from 'react'
import MyInput from '../../ui/inputs/MyInput.jsx'
import MyButton from '../../ui/buttons/MyButton.jsx'
import MySelect from '../../ui/selects/MySelect.jsx'

const TodoUpdate = ({ items, ...props }) => {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    date_end: '',
    dateCreate: '',
    initiator: '',
    executor: localStorage.getItem('userID'),
  })

  // подгружаем задачу на изменение
  const toChange = (props) => {
    setTodo(props.todo)
    // setTodo({ ...todo, date_update: getToday() })
  }

  useEffect(() => {
    toChange(props)
  }, [])

  const getToday = () => {
    const currentDate = new Date()
    return currentDate.toISOString().split('T')[0]
  }

  const changeTodo = (event) => {
    event.preventDefault()
    props.updateTodo(todo)
    props.setModal(!props.modal)
  }

  return (
    <div>
      <form>
        <MyInput
          type='text'
          placeholder='Заголовок задачи'
          value={todo.title}
          onChange={(event) => {
            setTodo({
              ...todo,
              title: event.target.value,
              date_update: getToday(),
            })
          }}
        />
        <MyInput
          type='text'
          placeholder='Описание задачи'
          value={todo.description}
          onChange={(event) => {
            setTodo({
              ...todo,
              description: event.target.value,
              date_update: getToday(),
            })
          }}
        />
        <MyInput
          type='text'
          placeholder='Дата окончания'
          value={todo.date_end}
          onChange={(event) => {
            setTodo({
              ...todo,
              date_end: event.target.value,
              date_update: getToday(),
            })
          }}
        />
        <p>Изменить исполнителя</p>
        <MySelect
          items={items}
          onChange={(event) => {
            setTodo({
              ...todo,
              executor: event.target.value,
              date_update: getToday(),
            })
          }}
        />
        <div>
          <MyButton children={'Сохранить изменения'} onClick={changeTodo} />
        </div>
      </form>
    </div>
  )
}

export default TodoUpdate
