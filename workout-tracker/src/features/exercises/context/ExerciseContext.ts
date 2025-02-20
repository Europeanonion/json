import { createContext } from 'react'
import type { ExerciseContextValue } from '../types/exercise.types'

export const ExerciseContext = createContext<ExerciseContextValue | undefined>(undefined)
ExerciseContext.displayName = 'ExerciseContext' // Helps with React DevTools debugging
