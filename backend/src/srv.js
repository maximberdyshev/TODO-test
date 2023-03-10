import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import usersRouter from './routes/usersRouter.js'
import todosRouter from './routes/todosRouter.js'

dotenv.config({ path: '~/Prog/std/.env' })

const srv = express()
const SRV_PORT = process.env.SRV_PORT 
const SRV_ADDR = process.env.SRV_ADDR

// настройка опций для CORS (backend)
const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.WHITE_LISTS_CLIENTS.indexOf(origin) > -1) {
      callback(null, true)
    } else {
      callback(console.log('cors, denied'))
    }
  },
}

srv.use(cors(corsOptions))
srv.use(express.json())

// мидлвейр ниже для тестов (просто посмотреть, что приходит с фронта)
srv.use((req, res, next) => {
  console.log(new Date(), req.method, req.body)
  next()
})

srv.use('/users', usersRouter)
srv.use('/todos', todosRouter)
srv.use((req, res, next) => {
  res.status(404).send('Not found.')
})

srv.listen(SRV_PORT, SRV_ADDR, () => {
  console.log(`server started at http://${SRV_ADDR}:${SRV_PORT}`)
})
