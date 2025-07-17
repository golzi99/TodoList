import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ErrorSnackbar, Header } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { getTheme } from 'common/theme'
import CircularProgress from '@mui/material/CircularProgress'
import s from './App.module.css'
import { selectThemeMode, setIsLoggedIn } from 'app/appSlice'
import { useMeQuery } from '../features/auth/api/auth-Api'
import { ResultCode } from '../features/todolists/lib/enums'
import { Routing } from 'common/router'

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const { data, isLoading } = useMeQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  return (
    <div>
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        {isInitialized ? (
          <>
            <Header />
            <Routing />
          </>
        ) : (
          <div className={s.circularProgressContainer}>
            <CircularProgress size={150} thickness={3} />
          </div>
        )}
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}

export default App
