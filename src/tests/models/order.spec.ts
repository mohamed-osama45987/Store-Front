import { Order } from '../../models/order'

describe('Order Model tests', () => {
  it('Should have a index method', () => {
    expect(Order.index).toBeDefined()
  })

  it('index method should return a list of orders if the proper userId is passed ', async () => {
    const result = await Order.index(1)

    expect(result).not.toHaveSize(0)
    expect(result[0].quantity).toBeDefined()
    expect(result[0].orderId).toBeDefined()
  })
})
