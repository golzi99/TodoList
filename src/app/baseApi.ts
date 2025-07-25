import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleError } from 'common/utils'

export const baseApi = createApi({
  reducerPath: 'todolistsApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
        headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
  tagTypes: ['Todolist', 'Task'],
  // keepUnusedDataFor: 5, // время хранения кэша
  // refetchOnFocus: true,
  refetchOnReconnect: true,
})
