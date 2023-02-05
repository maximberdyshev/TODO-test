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
        { initiator: 'u2.login' }
      )
      .where('u1.department', req.body.args.depID)
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
        { initiator: 'u2.login' }
      )
      .where('u1.department', req.body.args.depID)
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

  static updateTask = async (req, res) => {
    // надо преобразовать "буквенные" значения полей в цифровые
    await knx('status_list')
      .select('id')
      .where({ status: req.body.todo.status })
      .then((id) => {
        req.body.todo.status = id[0].id
      })
      .catch((err) => {
        console.log(`TodosController.updateTask(), status_list, err: ${err}`)
        return res.json(false)
      })

    await knx('priorities')
      .select('id')
      .where({ priority: req.body.todo.priority })
      .then((id) => {
        req.body.todo.priority = id[0].id
      })
      .catch((err) => {
        console.log(`TodosController.updateTask(), priorities, err: ${err}`)
        return res.json(false)
      })

    await knx('users')
      .select('id')
      .where({ login: req.body.todo.initiator })
      .then((id) => {
        req.body.todo.initiator = id[0].id
      })
      .catch((err) => {
        console.log(`TodosController.updateTask(), initiator, err: ${err}`)
        return res.json(false)
      })

    await knx('users')
      .select('id')
      .where({ login: req.body.todo.executor })
      .then((id) => {
        req.body.todo.executor = id[0].id
      })
      .catch((err) => {
        console.log(`TodosController.updateTask(), executor, err: ${err}`)
        return res.json(false)
      })

    await knx('todos')
      .where('id', '=', req.body.todo.id)
      .update({
        title: req.body.todo.title,
        description: req.body.todo.description,
        date_update: req.body.todo.date_update,
        date_end: req.body.todo.date_end,
        initiator: req.body.todo.initiator,
        executor: req.body.todo.executor,
      })
      .then(() => {
        return res.json(true)
      })
      .catch((err) => {
        console.log(`TodosController.updateTask(), err: ${err}`)
        return res.json(false)
      })
  }

  static createTask = async (req, res) => {
    await knx('todos')
      .returning('id')
      .insert({
        title: req.body.todo.title,
        description: req.body.todo.description,
        date_create: req.body.todo.dateCreate,
        date_end: req.body.todo.date_end,
        initiator: req.body.todo.initiator,
        executor: req.body.todo.executorID,
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
