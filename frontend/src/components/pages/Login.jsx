import React, { useState } from 'react'
import styles from '../Main.module.css'
import MyButton from '../ui/buttons/MyButton.jsx'
import MyInput from '../ui/inputs/MyInput.jsx'
import MyModal from '../ui/modals/MyModal.jsx'
import { APIClogin } from '../../APIC/APIClogin.js'
import { salting } from '../../validators/pwdSalting.js'

const Login = (props) => {
  const [modal, setModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const logIn = async () => {
    if (userName == '') {
      setModalMessage('Не указан пользователь.')
      setModal(!modal)
      return
    }

    const hash = salting(userPassword)
    const takeSessionID = () => {
      const first = new Date().getTime()
      const second = Math.random(0,1)
      
      return `${first}.${Math.round(first*second).toString().slice(0,9)}`
    }
    const sessionID = takeSessionID()
    const userID = await APIClogin.checkLogin(userName, hash, sessionID)

    if (userID != 0) {
      props.setAuth(!props.isAuth)
      localStorage.setItem('authorized', '0')
      localStorage.setItem('userLogin', userName)
      localStorage.setItem('sessionID', sessionID)
      localStorage.setItem('userID', userID)
    } else {
      setModalMessage('Неправильный логин или пароль.')
      setModal(!modal)
    }
  }

  const registration = async () => {
    // TODO: реализовать регистрацию через отдельную модалку
    if ((userName == '') || (userPassword == '')) {
      setModal(!modal)
      setModalMessage('Ошибка регистрации.')
      return
    }

    // TODO: нужна проверка на дубликаты при регистрации пользователя
    const hash = salting(userPassword)
    const addUser = await APIClogin.register(userName, hash)

    setModal(!modal)
    addUser == 0
      ? setModalMessage('Пользователь успешно создан!')
      : setModalMessage('Ошибка регистрации!')
  }

  return (
    <div className={styles.login}>
      <MyModal children={modalMessage} visible={modal} setVisible={setModal} />
      <h1>Login</h1>
      <MyInput
        type='text'
        placeholder='Введите login'
        value={userName}
        onChange={(event) => {
          setUserName(event.target.value)
        }}
      />
      <MyInput
        type='password'
        placeholder='***'
        value={userPassword}
        onChange={(event) => {
          setUserPassword(event.target.value)
        }}
      />
      <MyButton children={'Вход'} onClick={logIn} />
      <MyButton children={'Регистрация'} onClick={registration} />
    </div>
  )
}

export default Login
