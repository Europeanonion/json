import { useContext } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'

export function useWorkoutContext() {
  const context = useContext(WorkoutContext)
  
  if (!context) {
    throw new Error('useWorkoutContext must be used within a WorkoutProvider')
  }
  
  return context
}
