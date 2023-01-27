import dotenv from 'dotenv'
import knex from 'knex'
import knexfile from '../../db/knexfile.js'

dotenv.config({ path: '~/Prog/std/.env' })

const knx = knex(knexfile[process.env.KNEX_PROFILE])

class TodosController {
  static checkTask = () => {}

  static updateTask = () => {}

  static createTask = () => {}
}

export { TodosController }
