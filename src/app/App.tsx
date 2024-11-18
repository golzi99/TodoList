import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { selectThemeMode } from "./appSelectors"
import { ErrorSnackbar, Header } from "common/components"
import { useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { Outlet } from "react-router-dom"

function App() {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <div>
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Outlet />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}

export default App
