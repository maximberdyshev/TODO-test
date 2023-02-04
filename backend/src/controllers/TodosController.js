import dotenv from 'dotenv'
import knex from 'knex'
import knexfile from '../../db/knexfile.js'

dotenv.config({ path: '~/Prog/std/.env' })

const knx = knex(knexfile[process.env.KNEX_PROFILE])

class TodosController {
  static getAll = async (req, res) => {
    await knx('todos')
      .innerJoin({ u1: 'users' }, 'todos.executor', '=', 'u1.id')
      .innerJoin({ u2: 'users' }, 'todos.initiator', '=', 'u2.id')
      .innerJoin('priorities', 'todos.priority', '=', 'priorities.id')
      .innerJoin('status_list', 'todos.status', '=', 'status_list.id')
      .innerJoin('roles', 'u1.role', '=', 'roles.id')
      .innerJoin('departments', 'u1.department', '=', 'departments.id')
      .select(
        'todos.id', 
        'todos.title', 
        'todos.description', 
        'todos.date_create', 
        'todos.date_update',
        'todos.date_end',
        'priorities.priority',
        'status_list.status',
        { executor: 'u1.login' }, 
        { initiator: 'u2.login' })
      .where('u1.department', req.body.args.depID )
      .andWhere('u1.role', '<=', req.body.args.roleID)
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

  // TODO: тестовый запрос с джойнами
  static ttt = async (req, res) => {
    await knx('todos')
      .innerJoin({ u1: 'users' }, 'todos.executor', '=', 'u1.id')
      .innerJoin({ u2: 'users' }, 'todos.initiator', '=', 'u2.id')
      .innerJoin('priorities', 'todos.priority', '=', 'priorities.id')
      .innerJoin('status_list', 'todos.status', '=', 'status_list.id')
      .innerJoin('roles', 'u1.role', '=', 'roles.id')
      .innerJoin('departments', 'u1.department', '=', 'departments.id')
      .select(
        'todos.id', 
        'todos.title', 
        'todos.description', 
        'todos.date_create', 
        'todos.date_update',
        'todos.date_end',
        'priorities.priority',
        'status_list.status',
        { executor: 'u1.login' }, 
        { initiator: 'u2.login' })
      .where('u1.department', req.body.args.depID )
      .andWhere('u1.role', '<=', req.body.args.roleID)
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
