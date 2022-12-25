import app from '../../index'
import supertest from 'supertest'

const request = supertest(app)

const token = 'eyJhbGciOiJIUzI1NiJ9.Mw.P2O5Rrj4q4BQX_aWsE0tCc6kEr7SiwY8sz2VQwEoAxo'

describe('Order handler tests', () => {
  it('/api/orders should return orders of the user if given an id', async () => {
    const response = await request.get('/api/orders/index/1').set('Authorization', token)

    expect(response.status).toBe(200)
    expect(response.body.userOrders.length).toBeGreaterThan(0)
  })

  it('/api/orders/orders/:userid should create an order', async () => {
    const response = await request.post('/api/orders/create/1').set('Authorization', token).send({
      quantity: 5,
      userId: 1,
      productId: 1
    })

    expect(response.status).toBe(200)

    expect(response.body.message).toBe('Order created successfully')
    expect(response.body.order.id).toBeDefined()
  })
})
