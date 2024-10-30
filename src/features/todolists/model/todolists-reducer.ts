import { Todolist } from "../api/todolistsApi.types"
import { AppDispatch, RootState } from "app/store"
import { todolistsApi } from "../api/todolistsApi"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"

const initialState: Array<DomainTodolist> = []

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType

export const todolistsReducer = (
  state: Array<DomainTodolist> = initialState,
  action: ActionsType,
): Array<DomainTodolist> => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }
    case "REMOVE_TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todolistId)
    }
    case "ADD_TODOLIST": {
      const newTodoList: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
      }

      return [newTodoList, ...state]
    }
    case "CHANGE_TODOLIST_TITLE": {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
    }
    case "CHANGE_TODOLIST_FILTER": {
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? {
              ...tl,
              filter: action.payload.filter,
            }
          : tl,
      )
    }
    default: {
      return state
    }
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE_TODOLIST",
    payload: {
      todolistId,
    },
  } as const
}

export const addTodolistAC = (todolist: Todolist) => {
  return {
    type: "ADD_TODOLIST",
    payload: {
      todolist,
    },
  } as const
}
//важно ли, чтобы тут создавать id: v1() или можно вынести в самой функции в App?

export const changeTodoListTitleAC = (payload: { todolistId: string; title: string }) => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    payload,
  } as const
}

export const changeTodoListFilterAC = (payload: { todolistId: string; filter: FilterValues }) => {
  return {
    type: "CHANGE_TODOLIST_FILTER",
    payload,
  } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const fetchTodolistTC = () => (dispatch: AppDispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  todolistsApi.removeTodolist(id).then(() => {
    dispatch(removeTodolistAC(id))
  })
}

export const updateTodolistTitleTC =
  (arg: { todolistId: string; title: string }) => (dispatch: AppDispatch, getState: () => RootState) => {
    const todolists = getState().todolists
    const { todolistId, title } = arg
    const todolist = todolists?.find((tl) => tl.id === todolistId)

    if (todolist) {
      todolistsApi.updateTodolist({ id: todolistId, title }).then(() => {
        dispatch(changeTodoListTitleAC(arg))
      })
    }
  }
