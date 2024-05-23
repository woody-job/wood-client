import { CommonErrorType } from '@/shared/types'

export const defaultErrorHandler = (
  error: CommonErrorType<unknown>,
  callback: (errorMessage: string) => void
) => {
  if (!!error.data && typeof error.data === 'object') {
    if ('message' in error.data && typeof error.data.message === 'string') {
      return callback(error.data.message)
    }

    if (Object.keys(error.data).length > 0) {
      return Object.entries(error.data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => {
            callback(`${key}: ${item}`)
          })
        }
      })
    }
  }

  return callback('Произошла ошибка')
}
