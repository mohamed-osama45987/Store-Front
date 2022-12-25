import { Product } from '../../models/product'

describe('Product Model tests', () => {
  it('product model should have the correct methods to be defined ', () => {
    expect(Product.indexAllProducts).toBeDefined()
    expect(Product.showOneProduct).toBeDefined()
    expect(Product.createProduct).toBeDefined()
  })

  it('indexAllProducts method to return a list of products', async () => {
    const result = await Product.indexAllProducts()

    expect(result).not.toHaveSize(0)
    expect(result[0].id).toBeDefined()
    expect(result[0].product_name).toBeDefined()
    expect(result[0].price).toBeDefined()
  })

  it('showOneProduct method return a product', async () => {
    const result = await Product.showOneProduct('testproduct')

    expect(result).not.toHaveSize(0)
    expect(result.id).toBeDefined()
    expect(result.product_name).toBeDefined()
    expect(result.price).toBeDefined()
  })

  it('createProduct method return the created product', async () => {
    const result = await Product.createProduct('testProduct', 40)

    expect(result).not.toHaveSize(0)
    expect(result.id).toBeDefined()
    expect(result.product_name).toBeDefined()
    expect(result.price).toBeDefined()
  })
})
