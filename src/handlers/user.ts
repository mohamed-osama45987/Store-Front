import { Router, Request, Response, NextFunction } from 'express'
import { User, user } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { query, body, validationResult } from 'express-validator'
import isAuth from '../middlewares/is-auth'
import { errorCode, validationErrorObject } from '../types/error'

dotenv.config()

const userRouter = Router()

// controllers function

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // indexing all users
    const users = await User.indexAllUsers()
    if (users.length < 0 || !users[0]) {
      // if no users in the data base
      const error: errorCode = new Error('No users found')

      error.statusCode = 404

      throw error
    }
    res.status(200).json({ users, message: 'Users retrieved successfully' })
    return null
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

const showSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    const error: errorCode = new Error('Validation errors')
    error.statusCode = 400
    error.validationErrors = validationErrors.array() as validationErrorObject[]

    return next(error)
  }

  try {
    const firstname = req.query.firstname as string
    const lastname = req.query.lastname as string

    const user = await User.showOneUser(firstname, lastname)

    if (!user) {
      // if no users in the data base
      const error = new Error('No user found') as errorCode
      error.statusCode = 404
      throw error
    }
    res.status(200).json({ user, message: 'User retrieved successfully' })
    return null
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    const error: errorCode = new Error('Validation errors')
    error.statusCode = 400
    error.validationErrors = validationErrors.array() as validationErrorObject[]

    return next(error)
  }

  try {
    const firstname = req.body.firstname as string
    const lastname = req.body.lastname as string
    const password = req.body.password as string

    const hashedPassword = await bcrypt.hash(password, 10)

    // create new user if it did not exists

    const createdUser = await User.createUser(firstname, lastname, hashedPassword)

    const tokenSecret = process.env.JWT_SECRET_KEY as string

    const token = jwt.sign(createdUser.id + '', tokenSecret)

    if (!createdUser) {
      // if we did not have a createdUsers in the data base
      const error: errorCode = new Error('could not create the user')

      error.statusCode = 400

      throw error
    }

    res.status(200).json({ token, createdUser, message: 'User created successfully' })
    return null
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    const error: errorCode = new Error('Validation errors')
    error.statusCode = 400
    error.validationErrors = validationErrors.array() as validationErrorObject[]

    return next(error)
  }

  try {
    const firstname = req.body.firstname as string
    const lastname = req.body.lastname as string
    const password = req.body.password as string

    // try to find if user exist
    const user = (await User.authenticate(firstname, lastname)) as unknown as user

    if (!user) {
      // if we find a user
      const error: errorCode = new Error('User does not exist please create new one')

      error.statusCode = 404

      throw error
    }

    const passwordMatched = bcrypt.compareSync(password, user.password)

    if (!passwordMatched) {
      const error: errorCode = new Error('Wrong user credentials please check your entered data ')

      error.statusCode = 404

      throw error
    }

    const tokenSecret = process.env.JWT_SECRET_KEY as string

    const token = jwt.sign(user.id + '', tokenSecret)

    res.status(200).json({ user, token, message: 'User Found sucessfully' })
    return null
  } catch (error) {
    return next(error) as unknown as NextFunction
  }
}

// user routes

userRouter.get('/users/index', isAuth, getAllUser)

userRouter.get(
  '/users/show',
  [
    query('firstname')
      .exists({ checkFalsy: true })
      .withMessage('firstname can not be empty')
      .isString()
      .withMessage('firstname must be string')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('first name must be at least 2 char long'),

    query('lastname')
      .exists({ checkFalsy: true })
      .withMessage('lastname must be a valid string')
      .isString()
      .withMessage('lastname must be string')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('last name must be at least 2 char long')
  ],
  isAuth,
  showSingleUser
)

userRouter.post(
  '/users/createuser',
  [
    body('firstname')
      .exists({ checkFalsy: true })
      .withMessage('firstname can not be empty')
      .isString()
      .withMessage('firstname must be string')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('first name must be at least 2 char long'),

    body('lastname')
      .exists({ checkFalsy: true })
      .withMessage('lastname must be a valid string')
      .isString()
      .withMessage('lastname must be string')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('last name must be at least 2 char long'),

    body('password')
      .exists({ checkFalsy: true })
      .withMessage('password must be a valid string')
      .isString()
      .withMessage('password must be string')
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage('password must be at least 4 char long')
  ],
  createUser
)

userRouter.post(
  '/users/authenticate',
  [
    body('firstname')
      .exists({ checkFalsy: true })
      .withMessage('firstname can not be empty')
      .isString()
      .withMessage('firstname must be string')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('first name must be at least 2 char long'),

    body('lastname')
      .exists({ checkFalsy: true })
      .withMessage('lastname must be a valid string')
      .isString()
      .withMessage('lastname must be string')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('last name must be at least 2 char long'),

    body('password')
      .exists({ checkFalsy: true })
      .withMessage('password must be a valid string')
      .isString()
      .withMessage('password must be string')
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage('password must be at least 4 char long')
  ],
  authenticate
)

export default userRouter
