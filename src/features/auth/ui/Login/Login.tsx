import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import { LoginFormLabel } from './LoginFormLabel/LoginFormLabel'
import { LoginForm } from './LoginForm/LoginForm'

export const Login = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <LoginFormLabel />
          </FormLabel>
          <LoginForm />
        </FormControl>
      </Grid>
    </Grid>
  )
}
