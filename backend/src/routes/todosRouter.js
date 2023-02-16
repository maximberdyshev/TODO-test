import { Router } from 'express'
import { TodosController } from '../controllers/TodosController.js'

const router = new Router()

router.post('/task', TodosController.getTasks)
router.post('/update', TodosController.updateTask)
router.post('/complete', TodosController.completeTask)
router.post('/create', TodosController.createTask)
router.post('/delete', TodosController.deleteTask)

export default router
