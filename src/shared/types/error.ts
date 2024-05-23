export type CommonErrorType<ErrorData = unknown> = {
  status: number
  data: ErrorData
}

export type DefaultErrorData = {
  message: string
  statusCode: number
}
