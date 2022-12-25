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

      const sql = `
  SELECT
      order_products.id,
      products.product_name,
      orders.status AS "order_status",
      order_products.quantity,
      products.price AS "Item_price",
      (products.price * order_products.quantity) AS "Total_order_price"
  FROM
      order_products
      INNER JOIN products ON order_products.product_id = products.id
      INNER JOIN orders ON order_products.order_id = orders.id
  WHERE
      orders.user_id = ($1) AND orders.status = 'active';
      `

      const result = await conn.query(sql, [userId])

      const userOrder: ordertype[] = result.rows

      return userOrder
    } catch (error) {
      throw new Error(`Can not get order ${error}`)
    }
  }

  static async createOrder(userId: number) {
    try {
      const conn = await Client.connect()

      const orderSql = `INSERT INTO orders (user_id) VALUES (($1)) RETURNING *;`

      const resultedOrder = await conn.query(orderSql, [userId])

      conn.release()

      return resultedOrder.rows[0]
    } catch (error) {
      throw new Error(`Can not creat order ${error}`)
    }
  }

  static async addProductToOrder(orderId: number, productId: number, quantity: number) {
    try {
      const conn = await Client.connect()

      const orderProductsSql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES (($1),($2),($3)) RETURNING *;`

      const resultedOrderProducts = await conn.query(orderProductsSql, [
        orderId,
        productId,
        quantity
      ])
      conn.release()
      return resultedOrderProducts.rows[0]
    } catch (error) {
      throw new Error('can not add product to an order')
    }
  }

  static async orderExist(orderId: number) {
    try {
      const conn = await Client.connect()

      const orderProductsSql = `SELECT * FROM orders WHERE id=($1);`

      const order = await conn.query(orderProductsSql, [orderId])
      conn.release()
      return order.rows[0]
    } catch (error) {
      throw new Error('can not add product to an order')
    }
  }
}
