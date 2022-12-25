import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import requestWithData from '../types/request'

const isAuth = async (req: requestWithData, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization')

    if (!token) {
      throw 'Please provide a token inside the header'
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

    const decodedToken = jwt.verify(token, JWT_SECRET_KEY)

    if (!decodedToken) {
      throw 'Please provide a valid token inside the header'
    }

    req.additionalData = { userId: decodedToken }
    next()
  } catch (error) {
    return res.status(403).json({
      errorCode: 403,
      error
    })
  }
}

export default isAuth
