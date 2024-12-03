import { BaseResponse } from 'common/types'
import { AppDispatch } from 'app/store'
import { setAppError, setAppStatus } from 'app/appSlice'

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'failed' }))
  dispatch(setAppError({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }))
}
