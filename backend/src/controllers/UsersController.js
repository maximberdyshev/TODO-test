import dotenv from 'dotenv'
import knex from 'knex'
import knexfile from '../../db/knexfile.js'

dotenv.config({ path: '~/Prog/std/.env' })

const knx = knex(knexfile[process.env.KNEX_PROFILE])

class UsersController {
  static getAll = async (req, res) => {
    await knx('users')
      .select('login', 'id')
      .then((arr) => {
        if (arr.length != 0) {
          return res.json(arr)
        } else {
          return res.json(1)
        }
      })
      .catch((err) => {
        console.log(`UsersController.getAll(), err: ${err}`)
        return res.json(1)
      })
  }

  static login = async (req, res) => {
    await knx({ u: 'users' })
      .innerJoin({ r: 'roles' }, 'u.role', '=', 'r.id')
      .select(
        { id: 'u.id' }, 
        { roleID: 'u.role' },
        { role: 'r.role' },
        { depID: 'u.department' })
      .where({ login: req.body.login, password: req.body.password })
      .then((arr) => {
        if (arr.length == 1) {
          this.addActive(arr[0].id, req.body.login, req.body.sessionID)
          return res.json(arr[0])
        } else {
          return res.json(false)
        }
      })
      .catch((err) => {
        console.log(`UsersController.login(), err: ${err}`)
        return res.json(false)
      })
  }

  static addActive = async (id, login, sessionID) => {
    await knx('active_users')
      .insert({ user_id: id, user_login: login, session_id: sessionID })
      .then(() => {
        return 0
      })
      .catch((err) => {
        console.log(`UserController.addActive(), err: ${err}`)
        return 0
      })
  }

  static removeActive = async (req, res) => {
    await knx('active_users')
      .where({ user_login: req.body.login, session_id: req.body.sessionID })
      .del()
      .then(() => {
        return res.json(0)
      })
      .catch((err) => {
        console.log(`UserController.removeActive(), err: ${err}`)
        return res.json(1)
      })
  }

  static register = async (req, res) => {
    await knx('users')
    .insert({
      first_name: 'placeholder',
      surname: 'placeholder',
      login: req.body.login,
      password: req.body.password,
    })
    .then(() => {
      return res.json(0)
    })
    .catch((err) => {
      console.log(`UserController.register(), err: ${err}`)
      return res.json(1)
    })
  }
}

export { UsersController }
