import { BaseTask, DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import { BaseResponse } from 'common/types'
import { instance } from 'common/instance'
import { baseApi } from 'app/baseApi'
import { BaseQueryMeta, BaseQueryResult } from '@reduxjs/toolkit/query'

// export const tasksApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
//   },
//   createTask(payload: { todolistId: string; title: string }) {
//     const { todolistId, title } = payload
//     return instance.post<BaseResponse<{ item: BaseTask }>>(`todo-lists/${todolistId}/tasks`, { title })
//   },
//   removeTask(payload: { todolistId: string; taskId: string }) {
//     const { todolistId, taskId } = payload
//     return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
//   },
//   updateTask(payload: { model: UpdateTaskModel; taskId: string; todolistId: string }) {
//     const { model, taskId, todolistId } = payload
//     return instance.put<BaseResponse<{ item: BaseTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
// }

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse<DomainTask>, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      transformResponse(response: GetTasksResponse): GetTasksResponse<DomainTask> {
        return { ...response, items: response.items.map((task) => ({ ...task, entityStatus: 'idle' })) }
      },
      providesTags: ['Task'],
    }),
    createTask: build.mutation<BaseResponse<{ item: BaseTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Task'],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: BaseTask }>,
      { model: UpdateTaskModel; taskId: string; todolistId: string }
    >({
      query: ({ taskId, todolistId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
