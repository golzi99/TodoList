import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Main } from "./Main"
import { selectThemeMode } from "./appSelectors"
import { Header } from "common/components"
import { useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"

function App() {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <div>
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}

export default App
