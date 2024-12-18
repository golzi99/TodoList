import { useAppDispatch } from 'common/hooks'
import { setIsLoggedIn } from 'app/appSlice'
import { useLoginMutation } from '../../api/auth-Api'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginArgs } from '../../api/auth-Api.types'
import { ResultCode } from '../../../todolists/lib/enums'
import { Path } from 'common/router'
import { useNavigate } from 'react-router'

export const useLogin = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields },
  } = useForm<LoginArgs>({ defaultValues: { email: '', password: '', rememberMe: false } })

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data)
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem('sn-token', res.data.data.token)
        }
      })
      .finally(() => {
        navigate(Path.Main)
        reset()
      })
  }

  const isDisabled = !!errors.email || !!errors.password || !dirtyFields.email || !dirtyFields.password

  return { handleSubmit, onSubmit, control, errors, register, isDisabled }
}
