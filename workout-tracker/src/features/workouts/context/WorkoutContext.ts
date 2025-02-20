import { createContext } from 'react'
import type { WorkoutContextValue } from '../types/workout.types'

export const WorkoutContext = createContext<WorkoutContextValue | undefined>(undefined)
WorkoutContext.displayName = 'WorkoutContext' // Helps with React DevTools debugging
