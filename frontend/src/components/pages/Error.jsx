import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Main.module.css'

const Error = () => {
  return (
    <div className={styles.err}>
      <h1>Error</h1>
      <br />
      <Link to='/'>На главную</Link>
    </div>
  )
}

export default Error
