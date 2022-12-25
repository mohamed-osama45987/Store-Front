import Client from '../utils/dataBaseClient'

export type user = {
  id: number
  firstname: string
  lastname: string
  password: string
}

export class User {
  static async indexAllUsers(): Promise<user[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      const users = result.rows
      conn.release()
      return users
    } catch (error) {
      throw new Error(`Can not index users ${error}`)
    }
  }

  static async showOneUser(fistname: string, lastname: string): Promise<user> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2);'
      const result = await conn.query(sql, [fistname, lastname])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (error) {
      throw new Error(`Can not find a user ${error}`)
    }
  }

  static async createUser(
    fistname: string,
    lastname: string,
    hashedPassword: string
  ): Promise<user> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [fistname, lastname, hashedPassword])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (error) {
      throw new Error(`Can not add user ${error}`)
    }
  }

  static async authenticate(fistname: string, lastname: string): Promise<user> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2)'
      const result = await conn.query(sql, [fistname, lastname])
      const user = result.rows[0]
      conn.release()

      return user
    } catch (error) {
      throw new Error(`Can not find a user${error}`)
    }
  }
}
