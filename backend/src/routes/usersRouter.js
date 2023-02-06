import { Router } from 'express'
import { UsersController } from '../controllers/UsersController.js'

const router = new Router()

router.post('/login', UsersController.login)
router.post('/logout', UsersController.removeActive)
router.post('/register', UsersController.register)
router.post('/allusers', UsersController.getAll)

export default router
