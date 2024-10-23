import { createTheme } from "@mui/material/styles"
import { ThemeMode } from "common/types"

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
