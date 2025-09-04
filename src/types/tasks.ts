export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  dueDate?: string // ISO string
  priority: TaskPriority
  isCompleted: boolean
  goal?: string | null
}

export interface CreateTaskPayload {
  title: string
  description?: string
  dueDate?: string
  priority: TaskPriority
  goal?: string | null
}

export interface UpdateTaskPayload {
  title?: string
  description?: string
  dueDate?: string
  priority?: TaskPriority
  isCompleted?: boolean
  goal?: string | null
}

export interface ApiTask {
  _id: string
  title: string
  description?: string
  dueDate?: string
  priority: TaskPriority
  isCompleted: boolean
  goal?: string
}

export interface ListTasksResponse {
  tasks: ApiTask[]
}
