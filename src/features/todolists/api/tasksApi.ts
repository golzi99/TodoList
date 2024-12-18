import { BaseTask, DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import { BaseResponse } from 'common/types'
import { baseApi } from 'app/baseApi'
export const PAGE_SIZE = 5

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse<DomainTask>, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE }
        return {
          method: 'GET',
          url: `todo-lists/${todolistId}/tasks`,
          params: params,
        }
      },
      transformResponse(response: GetTasksResponse): GetTasksResponse<DomainTask> {
        return { ...response, items: response.items.map((task) => ({ ...task, entityStatus: 'idle' })) }
      },
      providesTags: (res, err, { todolistId }) =>
        res
          ? [...res.items.map(({ id }) => ({ type: 'Task', id }) as const), { type: 'Task', id: todolistId }]
          : ['Task'],
    }),
    createTask: build.mutation<BaseResponse<{ item: BaseTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, { taskId }) => [{ type: 'Task', id: taskId }],
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
      invalidatesTags: (res, err, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
