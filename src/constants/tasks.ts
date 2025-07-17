export const tasks = [
  {
    id: 1,
    title: 'Complete project report',
    description: 'Finalize the project report for submission',
    date: 'Due Today',
    completed: false,
  },
  {
    id: 2,
    title: 'Prepare for team meeting',
    description: 'Finalize the project report for submission',
    date: 'Due Tomorrow',
    completed: false,
  },
  {
    id: 3,
    title: 'Review pull requests',
    description: 'Finalize the project report for submission',
    date: 'Due Next Week',
    completed: false,
  },
]

export const taskPriorities = [
  {
    value: 'low',
    label: 'Low',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'high',
    label: 'High',
  },
] as const
