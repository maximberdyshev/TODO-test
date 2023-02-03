import React from 'react'
import styles from './MySelect.module.css'

// TODO: сделать универсальным, сейчас это чисто под список пользователей
const MySelect = ({ items, ...props }) => {
  return (
    <select className={styles.mySlct} {...props} >
      {items.map((item, index) => {
        return (<option key={index} value={item.id}>{item.login}</option>)
      })}
    </select>
  )
}

export default MySelect
