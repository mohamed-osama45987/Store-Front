import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { POSTGRES_USER, POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_PASSWORD, ENV } =
  process.env

let client: Pool = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD
})

if (ENV === 'test') {
  client = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB, // testing db
    password: POSTGRES_PASSWORD
  })
}

export default client
