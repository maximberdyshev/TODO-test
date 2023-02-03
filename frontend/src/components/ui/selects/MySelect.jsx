import React from 'react'
import styles from './MySelect.module.css'

const MySelect = ({ items, ...props }) => {
  return (
    <select className={styles.mySlct} {...props} >
      {items.map((item, index) => {
        return (<option key={index} value={item.value}>{item.label}</option>)
      })}
    </select>
  )
}

export default MySelect
