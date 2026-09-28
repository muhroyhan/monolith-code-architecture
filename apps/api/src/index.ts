import express, { type Express } from 'express'
import dotenv from 'dotenv'
import { notFoundHandler } from './middlewares/notFoundHandler'
import { errorHandler } from './middlewares/errorHandler'
import { router } from './router'

dotenv.config({ path: '../../.env' })

const app: Express = express()

app.use(router())
app.use(notFoundHandler)
app.use(errorHandler)

const port = process.env.API_PORT ?? 3000
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
