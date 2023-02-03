import dotenv from 'dotenv'
import knex from 'knex'
import knexfile from '../../db/knexfile.js'

dotenv.config({ path: '~/Prog/std/.env' })

const knx = knex(knexfile[process.env.KNEX_PROFILE])

class TodosController {
  static getAll = async (req, res) => {
    let idLogin

    await knx('users')
      .select('id')
      .where({ login: req.body.login })
      .then((id) => {
        if (id.length == 1) {
          idLogin = id[0].id
        } else {
          return res.json(1)
        }
      })
      .catch((err) => {
        console.log(`TodosController.getAll(), err: ${err}`)
        return res.json(1)
      })

    await knx('todos')
      .select('*')
      .where({ executor: idLogin })
      .then((arr) => {
        if (arr.length >= 1) {
          return res.json(arr)
        } else {
          return res.json([])
        }
      })
      .catch((err) => {
        console.log(`TodosController.getAll(), err: ${err}`)
        return res.json(1)
      })
  }

  static updateTask = () => {}

  static createTask = async (req, res) => {
    await knx('todos')
      .returning('id')
      .insert({
        title: req.body.todo.title,
        description: req.body.todo.body,
        date_create: req.body.todo.dateCreate,
        date_end: req.body.todo.dateEnd,
        initiator: req.body.todo.initiator,
        executor: req.body.todo.executor,
      })
      .then((id) => {
        return res.json(id[0].id)
      })
      .catch((err) => {
        console.log(`TodosController.createTask(), err: ${err}`)
        return res.json(1)
      }) 
  }

  static deleteTask = async (req, res) => {
    await knx('todos')
    .where({ id: req.body.id })
    .del()
    .then(() => {
      return res.json(0)
    })
    .catch((err) => {
      console.log(`TodosController.deleteTask()< err: ${err}`)
      return res.json(1)
    })
  }
}

export { TodosController }
