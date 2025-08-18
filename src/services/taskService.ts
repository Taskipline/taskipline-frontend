import apiClient from '@/lib/apiClient'
import {
  ApiTask,
  CreateTaskPayload,
  ListTasksResponse,
  Task,
  UpdateTaskPayload,
} from '@/types/tasks'

const toTask = (raw: ApiTask): Task => ({
  id: raw._id,
  title: raw.title,
  description: raw.description,
  dueDate: raw.dueDate,
  priority: raw.priority,
  isCompleted: raw.isCompleted,
  goal: raw.goal,
})

export async function listTasks(): Promise<Task[]> {
  const res = await apiClient.get<ListTasksResponse>('/tasks')
  return res.data.tasks.map(toTask)
}

export async function getTask(id: string): Promise<Task> {
  const res = await apiClient.get<Task>(`/tasks/${id}`)
  return res.data
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const res = await apiClient.post<Task>('/tasks', payload)
  return res.data
}

export async function updateTask(
  id: string,
  payload: UpdateTaskPayload
): Promise<Task> {
  const res = await apiClient.patch<Task>(`/tasks/${id}`, payload)
  return res.data
}

export async function deleteTask(id: string): Promise<{ message?: string }> {
  const res = await apiClient.delete<{ message?: string }>(`/tasks/${id}`)
  return res.data
}
