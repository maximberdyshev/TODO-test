import { Router } from 'express'
import { TodosController } from '../controllers/TodosController.js'

const router = new Router()

router.post('/all', TodosController.getAll)
router.post('/update', TodosController.updateTask)
router.post('/create', TodosController.createTask)
router.post('/delete', TodosController.deleteTask)

export default router
