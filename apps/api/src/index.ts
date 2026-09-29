import express, { type Express } from 'express'
import dotenv from 'dotenv'
import { notFoundHandler } from './middlewares/notFoundHandler'
import { router } from './router'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { createClient } from 'redis'
import { RedisStore } from 'connect-redis'
import session from 'express-session'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config({ path: '../../.env' })

const app: Express = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.WEB_ORIGIN,
  })
)
app.use(express.json())
app.use(compression())

if (!process.env.COOKIE_SECRET) throw new Error('COOKIE_SECRET missing')
app.use(cookieParser(process.env.COOKIE_SECRET))
const redisClient = createClient({
  url: process.env.REDIS_URL ?? 'redis://localhost:6379',
})
await redisClient.connect()
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'monolith:session:',
})

if (!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET missing')
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    name: '__Host-session',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(morgan('combined'))

app.use(router())
app.use(notFoundHandler)
app.use(errorHandler)

const port = process.env.API_PORT ?? 3000
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
