export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export type meArgs = {
  id: number
  email: string
  login: string
}
