import { BaseTask, DomainTask, Tasks, UpdateTaskModel } from '../api/tasksApi.types'
import { AppDispatch } from 'app/store'
import { tasksApi } from '../api/tasksApi'
import { RequestStatus, setAppStatus } from 'app/appSlice'
import { ResultCode } from '../lib/enums'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { createSlice } from '@reduxjs/toolkit'
// import { addTodolist, removeTodolist } from './todolistsSlice'

// export const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState: {} as Tasks,
//   selectors: {
//     selectTasks: (state) => state,
//   },
//   reducers: (create) => ({
//     setTasks: create.reducer<{ todolistId: string; tasks: Array<BaseTask> }>((state, action) => {
//       state[action.payload.todolistId] = action.payload.tasks.map((task) => ({ ...task, entityStatus: 'idle' }))
//     }),
//     removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
//       const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
//       if (index !== -1) state[action.payload.todolistId].splice(index, 1)
//     }),
//     addTask: create.reducer<{ task: BaseTask }>((state, action) => {
//       const tasks = state[action.payload.task.todoListId]
//       const newTask: DomainTask = { ...action.payload.task, entityStatus: 'idle' }
//       tasks.unshift(newTask)
//     }),
//     updateTask: create.reducer<{ task: BaseTask }>((state, action) => {
//       const updateTask: DomainTask = { ...action.payload.task, entityStatus: 'succeeded' }
//       const tasks = state[action.payload.task.todoListId]
//       const index = tasks.findIndex((t) => t.id === action.payload.task.id)
//       if (index !== -1) tasks[index] = updateTask
//     }),
//     changeTaskEntityStatus: create.reducer<{ taskId: string; todolistId: string; entityStatus: RequestStatus }>(
//       (state, action) => {
//         const tasks = state[action.payload.todolistId]
//         const index = tasks.findIndex((t) => t.id === action.payload.taskId)
//         if (index !== -1) tasks[index].entityStatus = action.payload.entityStatus
//       },
//     ),
//     clearTasks: create.reducer(() => {
//       return {}
//     }),
//   }),
//   extraReducers: (builder) => {
//     builder
//       .addCase(addTodolist, (state, action) => {
//         state[action.payload.todolist.id] = []
//       })
//       .addCase(removeTodolist, (state, action) => {
//         delete state[action.payload.id]
//       })
//   },
// })

// export const { setTasks, addTask, clearTasks, removeTask, updateTask, changeTaskEntityStatus } = tasksSlice.actions
// export const { selectTasks } = tasksSlice.selectors
// export const tasksReducer = tasksSlice.reducer

// export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }))
//   tasksApi
//     .getTasks(todolistId)
//     .then((res) => {
//       dispatch(setAppStatus({ status: 'succeeded' }))
//       const tasks = res.data.items
//       dispatch(setTasks({ todolistId, tasks }))
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }))
//   dispatch(changeTaskEntityStatus({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: 'loading' }))
//   tasksApi
//     .removeTask(arg)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({ status: 'succeeded' }))
//         dispatch(changeTaskEntityStatus({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: 'succeeded' }))
//         dispatch(removeTask(arg))
//       } else {
//         dispatch(changeTaskEntityStatus({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: 'failed' }))
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       dispatch(changeTaskEntityStatus({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: 'failed' }))
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }))
//   tasksApi
//     .createTask(arg)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({ status: 'succeeded' }))
//         dispatch(addTask({ task: res.data.data.item }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const updateTaskTC = (arg: { task: BaseTask }) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }))
//   const { task } = arg
//   dispatch(changeTaskEntityStatus({ taskId: task.id, todolistId: task.todoListId, entityStatus: 'loading' }))
//
//   const model: UpdateTaskModel = {
//     status: task.status,
//     title: task.title,
//     deadline: task.deadline,
//     description: task.description,
//     priority: task.priority,
//     startDate: task.startDate,
//   }
//
//   tasksApi
//     .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(changeTaskEntityStatus({ taskId: task.id, todolistId: task.todoListId, entityStatus: 'succeeded' }))
//         dispatch(setAppStatus({ status: 'succeeded' }))
//         dispatch(updateTask({ task: res.data.data.item }))
//       } else {
//         dispatch(changeTaskEntityStatus({ taskId: task.id, todolistId: task.todoListId, entityStatus: 'failed' }))
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       dispatch(changeTaskEntityStatus({ taskId: task.id, todolistId: task.todoListId, entityStatus: 'failed' }))
//       handleServerNetworkError(error, dispatch)
//     })
// }
