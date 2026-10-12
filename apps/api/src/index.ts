import './env.config'
import express from 'express'
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
import { cookieConfig, cookieSessionName, maxAgeInSeconds } from './constants/cookie.constant'
import { generateReqId } from './middlewares/generateReqId'

const app = express()

app.use(generateReqId)
app.set('query parser', 'extended')
app.use(
  cors({
    credentials: true,
    origin: process.env.WEB_ORIGIN,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
  }),
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
  ttl: maxAgeInSeconds,
})

if (!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET missing')
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    name: cookieSessionName,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { ...cookieConfig, httpOnly: true },
  }),
)

app.use(
  morgan((tokens, req, res) => {
    return JSON.stringify({
      // --- IDENTIFICATION & TRACING (LEFT) ---
      t: new Date().toISOString(),
      lvl: res.statusCode >= 400 ? 'WARN' : 'INFO',
      id: res.locals.requestId,

      // --- ACTION & RESPONSE (MIDDLE) ---
      m: tokens.method(req, res),
      s: Number(tokens.status(req, res)),

      // --- TARGET & PERFORMANCE (RIGHT) ---
      p: req.baseUrl + req.path,
      ms: Number(tokens['response-time'](req, res)),
    })
  }),
)

app.use(router())
app.use(notFoundHandler)
app.use(errorHandler)

const port = process.env.API_PORT ?? 3000
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
