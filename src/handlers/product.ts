import * as dotenv from 'dotenv'
import { Product } from '../models/product'
import isAuth from '../middlewares/is-auth'
import { errorCode, validationErrorObject } from '../types/error'
import { query, body, validationResult } from 'express-validator'
import { Router, Request, Response, NextFunction } from 'express'

dotenv.config()

const productRouter = Router()

const indexAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // indexing all products
    const products = await Product.indexAllProducts()

    if (products.length < 0 || !products[0]) {
      // if no users in the data base
      const error: errorCode = new Error('No products found')

      error.statusCode = 404

      throw error
    }

    res.status(200).json({ products, message: 'All products retrieved successfully' })
    return null
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

const showProduct = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    const error: errorCode = new Error('Validation errors')
    error.statusCode = 400
    error.validationErrors = validationErrors.array() as validationErrorObject[]

    return next(error)
  }

  try {
    const productName = req.query.name as string

    const product = await Product.showOneProduct(productName)

    if (!product) {
      // if no products in the data base
      const error = new Error('No products found') as errorCode
      error.statusCode = 404
      throw error
    }

    res.status(200).json({ product, message: 'Product shown successfully' })
    return null
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    const error: errorCode = new Error('Validation errors')
    error.statusCode = 400
    error.validationErrors = validationErrors.array() as validationErrorObject[]

    return next(error)
  }

  try {
    const productName = req.body.name
    const productPrice = req.body.price

    const createdProduct = await Product.createProduct(productName, productPrice)

    if (!createdProduct) {
      // if no products in the data base
      const error = new Error('Can not create a product') as errorCode
      error.statusCode = 400
      throw error
    }

    res.status(200).json({ createdProduct, message: 'Product created successfully' })
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

productRouter.get('/products/index', indexAllProducts)
productRouter.get(
  '/products/show',
  [
    query('name')
      .exists({ checkFalsy: true })
      .withMessage('name parameter can not be empty')
      .isString()
      .withMessage('name parameter must be string')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('name parameter must be at least 2 char long')
  ],
  showProduct
)
productRouter.post(
  '/products/createproduct',
  isAuth,
  [
    body('name')
      .exists({ checkFalsy: true })
      .withMessage('firstname can not be empty ')
      .isString()
      .withMessage('firstname must be string')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('first name must be at least 2 char long'),
    body('price')
      .exists({ checkFalsy: true })
      .withMessage('price can not be empty ')
      .isFloat({ min: 0 })
      .withMessage('price must be number bigger than 0')
  ],
  createProduct
)

export default productRouter
