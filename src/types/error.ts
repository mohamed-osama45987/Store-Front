export type validationErrorObject = {
  location: string
  msg: string
  param: string
}

export interface errorCode extends Error {
  statusCode?: number
  validationErrors?: validationErrorObject[]
}
