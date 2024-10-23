import { combineReducers, legacy_createStore } from "redux";
import { appReducer } from "./app-reducer";
import { tasksReducer } from "../features/todolists/model/tasks-reducer";
import { todolistsReducer } from "../features/todolists/model/todolists-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

export const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;