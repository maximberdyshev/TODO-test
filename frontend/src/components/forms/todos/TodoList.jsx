import React from 'react'
import { APICtodos } from '../../../APIC/APICtodos.js'
import TodoItem from './TodoItem.jsx'

const TodoList = ({ todos, setTodos, userSelect }) => {
  const removeTodo = async (id) => {
    const remove = await APICtodos.deleteTask(id)
    // console.log(remove)
    setTodos(todos.filter((todo) => todo.id != id))
  }

  const updateTodo = async (t) => {
    const res = await APICtodos.updateTask(t)

    if (res) {
      let updateTodos = todos.map((todo) => {
        if (todo.id === t.id) {
          return { ...t }
        }
        return todo
      })

      setTodos(updateTodos)
      return
    }

    console.log('Ошибка при обновлении задачи!')
  }

  const completeTodo = (t) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === t.id) {
        if (todo.status === 1) {
          APICtodos.completeTask(todo.id, 2)
          return { ...todo, status: 2 }
        }
        if (todo.status === 2) {
          APICtodos.completeTask(todo.id, 1)
          return { ...todo, status: 1 }
        }
      }
      return todo
    })

    setTodos(updateTodos)
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          key={index}
          number={index + 1}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          completeTodo={completeTodo}
          userSelect={userSelect}
        />
      ))}
    </div>
  )
}

export default TodoList
