import React from 'react'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Controller } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { useLogin } from '../../../lib/hooks/useLogin'

export const LoginForm = () => {
  const { control, onSubmit, handleSubmit, errors, register, isDisabled } = useLogin()

  return (
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
  )
}
