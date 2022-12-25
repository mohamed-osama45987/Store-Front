import app from '../../index'
import supertest from 'supertest'

const request = supertest(app)

const token = 'eyJhbGciOiJIUzI1NiJ9.Mw.P2O5Rrj4q4BQX_aWsE0tCc6kEr7SiwY8sz2VQwEoAxo'

describe('Product handlers tests', () => {
  it('/products/index should return a list of products', async () => {
    const response = await request.get('/api/products/index')

    expect(response.status).toBe(200)
    expect(response.body.products.length).toBeGreaterThan(0)
    expect(response.body.products[0].id).toBeDefined()
    expect(response.body.products[0].product_name).toBeDefined()
    expect(response.body.products[0].price).toBeDefined()
  })

  it('/products/show return a single product if its name is provided', async () => {
    const response = await request.get('/api/products/show').query({
      name: 'testproduct'
    })

    expect(response.status).toBe(200)
    expect(response.body.product).toBeDefined()
    expect(response.body.product.id).toBeDefined()
  })

  it('/products/createproduct return the newly created product', async () => {
    const response = await request
      .post('/api/products/createproduct')
      .set('Authorization', token)
      .send({
        name: 'test product 2',
        price: 99.99
      })

    expect(response.status).toBe(200)
    expect(response.body.createdProduct.id).toBeDefined()
  })
})
