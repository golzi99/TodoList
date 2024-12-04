import React from 'react'
import { getTheme } from 'common/theme'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Path } from 'common/router'
import { selectThemeMode, setIsLoggedIn } from 'app/appSlice'
import { useNavigate } from 'react-router'
import { ResultCode } from '../../../todolists/lib/enums'
import { useLoginMutation } from '../../api/auth-Api'
import { LoginArgs } from '../../api/auth-Api.types'

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const navigate = useNavigate()

  const [login] = useLoginMutation()

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields },
  } = useForm<LoginArgs>({ defaultValues: { email: '', password: '', rememberMe: false } })

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        localStorage.setItem('sn-token', res.data.data.token)
        reset()
        navigate(Path.Main)
      }
    })
  }

  const isDisabled = !!errors.email || !!errors.password || !dirtyFields.email || !dirtyFields.password

  return (
    <Grid container justifyContent={'center'}>
      <Grid justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                href={'https://social-network.samuraijs.com/'}
                target={'_blank'}
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                autoFocus={true}
                label="Email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Incorrect email address',
                  },
                })}
              />
              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 3,
                    message: 'Password must be at least 3 characters long',
                  },
                })}
              />
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Controller
                    name={'rememberMe'}
                    control={control}
                    render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                  />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'primary'} disabled={isDisabled}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
