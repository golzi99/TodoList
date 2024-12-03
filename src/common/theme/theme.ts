import { createTheme } from "@mui/material/styles"
import { ThemeMode } from "app/appSlice"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#d06905",
      },
    },
  })
}
