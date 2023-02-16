import dotenv from 'dotenv'
import knex from 'knex'
import knexfile from '../../db/knexfile.js'

dotenv.config({ path: '~/Prog/std/.env' })

const knx = knex(knexfile[process.env.KNEX_PROFILE])

class TodosController {
  static getTasks = (req, res) => {
    if (req.body.args.filter === 'all') {
      knx('todos')
        .innerJoin({ u1: 'users' }, 'todos.executor', '=', 'u1.id')
        .innerJoin({ u2: 'users' }, 'todos.initiator', '=', 'u2.id')
        .innerJoin('priorities', 'todos.priority', '=', 'priorities.id')
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
          'todos.status',
          { executor: 'u1.login' },
          { initiator: 'u2.login' },
          { initiatorRole: 'u2.role' }
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
          console.log(`TodosController.getTasks(), (all), err: ${err}`)
          return res.json(1)
        })
    }

    if (req.body.args.filter === 'me_executor') {
      knx('todos')
        .innerJoin({ u1: 'users' }, 'todos.executor', '=', 'u1.id')
        .innerJoin({ u2: 'users' }, 'todos.initiator', '=', 'u2.id')
        .innerJoin('priorities', 'todos.priority', '=', 'priorities.id')
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
          'todos.status',
          { executor: 'u1.login' },
          { initiator: 'u2.login' },
          { initiatorRole: 'u2.role' }
        )
        .where('u1.department', '=', req.body.args.depID)
        .andWhere('u1.role', '<=', req.body.args.roleID)
        .andWhere('u1.login', '=', req.body.args.userLogin)
        .then((arr) => {
          if (arr.length >= 1) {
            return res.json(arr)
          } else {
            return res.json([])
          }
        })
        .catch((err) => {
          console.log(`TodosController.getTasks(), (me_executor), err: ${err}`)
          return res.json(1)
        })
    }

    if (req.body.args.filter === 'completed') {
      knx('todos')
        .innerJoin({ u1: 'users' }, 'todos.executor', '=', 'u1.id')
        .innerJoin({ u2: 'users' }, 'todos.initiator', '=', 'u2.id')
        .innerJoin('priorities', 'todos.priority', '=', 'priorities.id')
        .innerJoin('roles', 'u1.role', '=', 'roles.id')
        .innerJoin('departments', 'u1.department', '=', 'departments.id')
        .innerJoin({ sl: 'status_list' }, 'todos.status', '=', 'sl.id')
        .select(
          'todos.id',
          'todos.title',
          'todos.description',
          'todos.date_create',
          'todos.date_update',
          'todos.date_end',
          'priorities.priority',
          'todos.status',
          { executor: 'u1.login' },
          { initiator: 'u2.login' },
          { initiatorRole: 'u2.role' }
        )
        .where('u1.department', req.body.args.depID)
        .andWhere('u1.role', '<=', req.body.args.roleID)
        .andWhere('sl.status', '=', 'выполнено')
        .then((arr) => {
          if (arr.length >= 1) {
            return res.json(arr)
          } else {
            return res.json([])
          }
        })
        .catch((err) => {
          console.log(`TodosController.getTasks(), (completed), err: ${err}`)
          return res.json(1)
        })
    }

    if (req.body.args.filter === 'overdued') {
      knx('todos')
        .innerJoin({ u1: 'users' }, 'todos.executor', '=', 'u1.id')
        .innerJoin({ u2: 'users' }, 'todos.initiator', '=', 'u2.id')
        .innerJoin('priorities', 'todos.priority', '=', 'priorities.id')
        .innerJoin('roles', 'u1.role', '=', 'roles.id')
        .innerJoin('departments', 'u1.department', '=', 'departments.id')
        .innerJoin({ sl: 'status_list' }, 'todos.status', '=', 'sl.id')
        .select(
          'todos.id',
          'todos.title',
          'todos.description',
          'todos.date_create',
          'todos.date_update',
          'todos.date_end',
          'priorities.priority',
          'todos.status',
          { executor: 'u1.login' },
          { initiator: 'u2.login' },
          { initiatorRole: 'u2.role' }
        )
        .where('u1.department', req.body.args.depID)
        .andWhere('u1.role', '<=', req.body.args.roleID)
        .andWhere('todos.date_end', '<', new Date().toISOString().split('T')[0])
        .andWhere('sl.status', '!=', 'выполнено')
        .then((arr) => {
          if (arr.length >= 1) {
            return res.json(arr)
          } else {
            return res.json([])
          }
        })
        .catch((err) => {
          console.log(`TodosController.getTasks(), (overdued), err: ${err}`)
          return res.json(1)
        })
    }
  }

  static updateTask = (req, res) => {
    knx('priorities')
      .select('id')
      .where({ priority: req.body.todo.priority })
      .then((id) => {
        req.body.todo.priority = id[0].id
      })
      .catch((err) => {
        console.log(`TodosController.updateTask(), priorities, err: ${err}`)
        return res.json(false)
      })

    knx('users')
      .select('id')
      .where({ login: req.body.todo.executor })
      .then((id) => {
        req.body.todo.executor = id[0].id
      })
      .catch((err) => {
        console.log(`TodosController.updateTask(), executor, err: ${err}`)
        return res.json(false)
      })

    knx('todos')
      .where('id', '=', req.body.todo.id)
      .update({
        title: req.body.todo.title,
        description: req.body.todo.description,
        date_update: req.body.todo.date_update,
        date_end: req.body.todo.date_end,
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

  static completeTask = (req, res) => {
    knx('todos')
      .where('id', '=', req.body.id)
      .update({ status: req.body.status })
      .then(() => {
        return res.json(true)
      })
      .catch((err) => {
        console.log(`TodosController.completeTask(), err: ${err}`)
        return res.json(false)
      })
  }

  static createTask = (req, res) => {
    knx('todos')
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

  static deleteTask = (req, res) => {
    knx('todos')
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
