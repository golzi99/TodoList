export type BaseResponse<T = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<FieldError>
  data: T
}

export type FieldError = {
  error: string
  field: string
}
