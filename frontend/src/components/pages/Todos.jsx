import React from 'react'
import styles from '../Main.module.css'
import MyButton from '../ui/buttons/MyButton.jsx'
import { APIClogin } from '../../APIC/APIClogin.js'

const Todos = (props) => {
  const logOut = async () => {
    await APIClogin.logOut(localStorage.getItem('userLogin'))
    localStorage.clear()
    props.setAuth(!props.isAuth)
  }

  return (
    <div className={styles.totos}>
      <h1>Todos</h1>
      <br></br>
      <MyButton children={'Выход'} onClick={logOut} />
    </div>
  )
}

export default Todos
