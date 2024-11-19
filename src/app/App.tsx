import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { selectThemeMode } from './appSelectors'
import { ErrorSnackbar, Header } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { getTheme } from 'common/theme'
import { Outlet } from 'react-router-dom'
import { initializeAppTC } from '../features/auth/model/auth-reducer'
import { selectIsInitialized } from '../features/auth/model/authSelector'
import CircularProgress from '@mui/material/CircularProgress'
import s from './App.module.css'

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <div>
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        {isInitialized ? (
          <>
            <Header />
            <Outlet />
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
