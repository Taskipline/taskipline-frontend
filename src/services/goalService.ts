import apiClient from '@/lib/apiClient'
import { Goal, Status } from '@/types/goal'
import type { Task, TaskPriority } from '@/types/tasks'

// Payload types for creating/updating goals via API
export type CreateGoalTaskInput = {
  title: string
  description?: string
  dueDate?: string // ISO string
}

export type CreateGoalPayload = {
  title: string
  description?: string
  dueDate?: string // ISO string
  tasks?: CreateGoalTaskInput[]
}

export async function listGoals(): Promise<Goal[]> {
  const res = await apiClient.get<{ goals: ApiGoal[] }>('/goals')
  return res.data.goals.map(mapGoal)
}

export async function getGoal(id: string): Promise<Goal> {
  const res = await apiClient.get<ApiGoal>(`/goals/${id}`)
  return mapGoal(res.data)
}

export async function createGoal(payload: CreateGoalPayload): Promise<Goal> {
  const res = await apiClient.post<ApiGoal>('/goals', payload)
  return mapGoal(res.data)
}

export async function updateGoal(
  id: string,
  payload: Partial<Omit<Goal, '_id' | 'tasks' | 'completionPercentage'>>
): Promise<Goal> {
  const res = await apiClient.patch<ApiGoal>(`/goals/${id}`, payload)
  return mapGoal(res.data)
}

export async function deleteGoal(id: string): Promise<{ message?: string }> {
  const res = await apiClient.delete<{ message?: string }>(`/goals/${id}`)
  return res.data
}

// API response types for goals and embedded tasks
type ApiGoalTask = {
  _id?: string
  id?: string
  title: string
  description?: string
  dueDate?: string
  priority?: TaskPriority
  isCompleted?: boolean
  goal?: string
}

type ApiGoal = {
  _id: string
  title: string
  description?: string
  dueDate?: string
  status: Status
  tasks?: ApiGoalTask[]
  completionPercentage?: number
}

// Normalize API goal payloads to frontend Goal type, including tasks -> Task[]
function mapGoal(raw: ApiGoal): Goal {
  const tasks: Task[] = Array.isArray(raw?.tasks)
    ? raw.tasks.map((t: ApiGoalTask, idx: number) => ({
        id: t.id ?? t._id ?? `${raw._id ?? 'goal'}:${idx}`,
        title: t.title ?? '',
        description: t.description,
        dueDate: t.dueDate,
        priority: t.priority ?? 'low',
        isCompleted: t.isCompleted ?? false,
        goal: t.goal ?? raw._id,
      }))
    : []
  return {
    _id: raw._id,
    title: raw.title,
    description: raw.description,
    dueDate: raw.dueDate,
    status: raw.status,
    tasks,
    completionPercentage: raw.completionPercentage,
  }
}
