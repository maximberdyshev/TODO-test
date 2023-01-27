import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import styles from './Main.module.css'
import Login from './pages/Login.jsx'
import Error from './pages/Error.jsx'
import Todos from './pages/Todos.jsx'

const Main = () => {
  const [isAuth, setAuth] = useState(false)

  return (
    <div className={styles.main}>
      {localStorage.getItem('authorized') == 0 ? (
        <Routes>
          <Route
            path='/todos'
            element={
              <Todos
                isAuth={isAuth}
                setAuth={setAuth}
              />
            }
          />
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<Navigate to='/todos' />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path='/login'
            element={
              <Login
                isAuth={isAuth}
                setAuth={setAuth}
              />
            }
          />
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      )}
    </div>
  )
}

export default Main
