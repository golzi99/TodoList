import {DomainTask, GetTasksResponse, UpdateTaskModel} from './tasksApi.types';
import {ChangeEvent} from 'react';
import {instance} from '../../../common/instance/instance';
import {BaseResponse} from '../../../common/types/types';
import {TaskStatus} from '../lib/enums/enums';

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: {todolistId: string, title: string}) {
        const {todolistId, title} = payload
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(payload: {todolistId: string, taskId: string}) {
        const {todolistId, taskId} = payload
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskStatus(payload: {e: ChangeEvent<HTMLInputElement>, task: DomainTask, todolistId: string}) {
        const {e, task, todolistId} = payload
        const model: UpdateTaskModel = {
            title: task.title,
            description: task.description,
            status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
    },
    updateTaskTitle(payload: {title: string, task: DomainTask, todolistId: string}) {
        const {title, task, todolistId} = payload
        const model: UpdateTaskModel = {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
    }
}