import dotenv from 'dotenv'
import knex from 'knex'
import knexfile from '../../db/knexfile.js'

dotenv.config({ path: '~/Prog/std/.env' })

const knx = knex(knexfile[process.env.KNEX_PROFILE])

class UsersController {
  static login = async (req, res) => {
    await knx('users')
      .select('id')
      .where({ login: req.body.login, password: req.body.password })
      .then((id) => {
        if (id.length == 1) {
          this.addActive(id[0].id, req.body.login)
          return res.json(0)
        } else {
          return res.json(1)
        }
      })
      .catch((err) => {
        console.log(`UsersController.login(), err: ${err}`)
        return res.json(1)
      })
  }

  static addActive = async (id, login) => {
    await knx('active_users')
      .insert({ user_id: id, user_login: login })
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
      .delete('user_login', req.body.login)
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
