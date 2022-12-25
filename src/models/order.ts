import Client from '../utils/dataBaseClient'

export type ordertype = {
  readonly orderId: number
  quantity: number
  status: string
  readonly product_id: number
  readonly user_id: number
}

export class Order {
  static async index(userId: number): Promise<ordertype[]> {
    try {
      const conn = await Client.connect()

      const sql = `SELECT orders.id AS "orderId", users.firstname, users.lastname, products.product_name, orders.status, orders.quantity, products.price AS "Item_price", 
                  (products.price * orders.quantity ) AS "Total_order_price"
                  FROM orders INNER JOIN products ON products.id = orders.product_id 
                  INNER JOIN users ON users.id = orders.user_id 
                  WHERE orders.user_id =($1);`

      const result = await conn.query(sql, [userId])

      const userOrder: ordertype[] = result.rows

      return userOrder
    } catch (error) {
      throw new Error(`Can not get order ${error}`)
    }
  }

  static async createOrder(userId: number, productId: number, quantity: number) {
    try {
      const conn = await Client.connect()

      const sql = `INSERT INTO orders (quantity,status,product_id,user_id) VALUES (($1),'active',($2),($3)) RETURNING *;`

      const result = await conn.query(sql, [quantity, productId, userId])

      const createdOrder: {
        id: number
        quantity: number
        status: string
        product_id: number
        user_id: number
      }[] = result.rows[0]

      return createdOrder
    } catch (error) {
      throw new Error(`Can not creat order ${error}`)
    }
  }
}
