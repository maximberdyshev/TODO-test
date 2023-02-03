import React from 'react'
import { APICtodos } from '../../../APIC/APICtodos.js'
import TodoItem from './TodoItem.jsx'

const TodoList = ({ todos, setTodos }) => {
  const removeTodo = async (id) => {
    const remove = await APICtodos.deleteTask(id) 
    // console.log(remove)
    setTodos(todos.filter((todo) => todo.id != id))
  }

  //
  const seeTodo = (e) => {
    let updateTodos = todos.map(todo => {
      if (todo.id === e.id) {
        return {...e}
      }
      return todo
    })
    setTodos(updateTodos)
  }

  //
  const completeTodo = (e) => {
    let updateTodos = todos.map(todo => {
      if (todo.id === e.id) {
        return {...todo, completed: !todo.completed}
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
          seeTodo={seeTodo}
          completeTodo={completeTodo}
        />
      ))}
    </div>
  )
}

export default TodoList