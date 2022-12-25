import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import userHandler from './handlers/user'
import productHandler from './handlers/product'
import orderHandler from './handlers/order'
import { errorCode } from '../src/types/error'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.APP_PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(
  morgan('combined', {
    skip: () => process.env.ENV === 'test' // disable morgan when testing
  })
)
// enableing cors
const corsOptions = {
  origin: '*',
  allowedHeaders: ['Authorization']
}
app.use(cors(corsOptions))
// parse application/json
app.use(bodyParser.json())

// add routing for / path
app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

app.use('/api', userHandler)
app.use('/api', productHandler)
app.use('/api', orderHandler)

// error handling middleware
app.use(
  (
    error: errorCode,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ) => {
    if (error.validationErrors) {
      return res.status(error.statusCode as number).json({
        message: error.message,
        validationErrors: error.validationErrors,
        statusCode: error.statusCode
      })
    }

    return res.status(error.statusCode as number).json({
      message: error.message,
      statusCode: error.statusCode
    })
  }
)

// start express server

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is starting at port:${PORT}`)
})

export default app
