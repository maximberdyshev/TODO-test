import { Router } from 'express'
import { TodosController } from '../controllers/TodosController.js'

const router = new Router()

router.post('/all', TodosController.getAll)
router.get('/check', TodosController.checkTask)
router.post('/update', TodosController.updateTask)
router.post('/create', TodosController.createTask)

export default router
