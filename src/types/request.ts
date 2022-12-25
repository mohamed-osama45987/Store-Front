import { Request } from 'express'

interface requestWithData extends Request {
  additionalData?: unknown
}

export default requestWithData
