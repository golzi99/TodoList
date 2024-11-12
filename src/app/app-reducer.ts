export type ThemeMode = "light" | "dark"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type InitialStateType = typeof initialState

const initialState = {
  themeMode: "dark" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload.themeMode }
    case "SET_STATUS":
      return { ...state, status: action.payload.status }
    case "SET_ERROR":
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}

// Action types
export type AppActionsType = ChangeThemeActionType | SetAppStatusActionType | SetAppErrorActionType

export const changeThemeAC = (themeMode: ThemeMode) => {
  return {
    type: "CHANGE_THEME",
    payload: {
      themeMode,
    },
  } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status },
  } as const
}

export const setAppErrorAC = (error: string | null) => {
  return {
    type: "SET_ERROR",
    payload: { error },
  } as const
}
