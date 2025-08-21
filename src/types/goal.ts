import { Task } from './tasks'

export type Status = 'In Progress' | 'Completed'

export interface Goal {
  _id: string
  title: string
  description?: string
  dueDate?: string // ISO string
  status: Status
  tasks: Task[]
  completionPercentage?: number
}
