import Client from '../utils/dataBaseClient'

export type product = {
  readonly id: number
  product_name: string
  price: number
}

export class Product {
  static async indexAllProducts(): Promise<product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      const resultProducts = result.rows
      conn.release()
      return resultProducts
    } catch (error) {
      throw new Error(`Can not index products ${error}`)
    }
  }

  static async showOneProduct(productName: string): Promise<product> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products WHERE product_name=($1);'
      const result = await conn.query(sql, [productName])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (error) {
      throw new Error(`Can not find product ${error}`)
    }
  }

  static async createProduct(name: string, price: number): Promise<product> {
    try {
      const conn = await Client.connect()
      const sql = 'INSERT INTO products (product_name, price) VALUES ($1, $2) RETURNING *'
      const result = await conn.query(sql, [name, price])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (error) {
      throw new Error(`Can not create product ${error}`)
    }
  }
}
