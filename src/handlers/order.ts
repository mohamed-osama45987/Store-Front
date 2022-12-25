import * as dotenv from 'dotenv'

import { Order } from '../models/order'
import isAuth from '../middlewares/is-auth'
import { errorCode, validationErrorObject } from '../types/error'
import { body, param, validationResult } from 'express-validator'
import { Router, Request, Response, NextFunction } from 'express'

dotenv.config()
const orderRoutes = Router()

const getUserOrder = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    const error: errorCode = new Error('Validation errors')
    error.statusCode = 400
    error.validationErrors = validationErrors.array() as validationErrorObject[]

    return next(error)
  }

  try {
    const userId = req.params.userid as unknown as number

    const userOrders = await Order.index(userId)

    if (userOrders.length < 0 || !userOrders[0]) {
      // if no users in the data base
      const error: errorCode = new Error('No products found')

      error.statusCode = 404

      throw error
    }

    res.status(200).json({ userOrders, message: 'All user orders retrieved successfully' })
    return null
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    const error: errorCode = new Error('Validation errors')
    error.statusCode = 400
    error.validationErrors = validationErrors.array() as validationErrorObject[]

    return next(error)
  }

  try {
    const userId = req.params.id as unknown as number

    const quantity = req.body.quantity as unknown as number

    const productId = req.body.productId as unknown as number

    const order = await Order.createOrder(userId, productId, quantity)

    if (!order) {
      // if no users in the data base
      const error: errorCode = new Error('can not create order')

      error.statusCode = 404

      throw error
    }

    res.status(200).json({ message: 'Order created successfully', order })
    return null
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

orderRoutes.get(
  '/orders/user/:userid',
  [
    param('userid')
      .exists({ checkFalsy: true })
      .withMessage('userid parameter can not be empty')
      .isNumeric()
      .withMessage('userid parameter must be number')
      .trim()
  ],
  isAuth,
  getUserOrder
)

orderRoutes.post(
  '/orders/user/:id',
  isAuth,
  [
    param('id')
      .exists({ checkFalsy: true })
      .withMessage('userid parameter can not be empty')
      .isNumeric()
      .withMessage('userid parameter must be number')
      .trim(),
    body('quantity')
      .exists({ checkFalsy: true })
      .withMessage('quantity can not be empty')
      .isNumeric()
      .withMessage('quantity must be number')
      .trim(),
    body('userId')
      .exists({ checkFalsy: true })
      .withMessage('userId can not be empty')
      .isNumeric()
      .withMessage('userId must be number')
      .trim(),
    body('productId')
      .exists({ checkFalsy: true })
      .withMessage('productId can not be empty')
      .isNumeric()
      .withMessage('productId must be number')
      .trim()
  ],
  createOrder
)

export default orderRoutes
