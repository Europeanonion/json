import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WorkoutList } from '../WorkoutList'

describe('WorkoutList', () => {
  const mockExercises = [
    {
      name: 'Bench Press',
      warmupSets: '2',
      workingSets: '3',
      reps: '8-12',
      rpe: '8',
      rest: '2-3 min',
      substitutions: ['DB Press'],
      notes: 'Keep tight form'
    },
    {
      name: 'Squat',
      warmupSets: '3',
      workingSets: '4',
      reps: '5',
      rpe: '9',
      rest: '3-5 min',
      substitutions: [],
      notes: 'Focus on depth'
    }
  ]

  it('renders all exercises', () => {
    render(<WorkoutList exercises={mockExercises} />)
    expect(screen.getByText('Bench Press')).toBeInTheDocument()
    expect(screen.getByText('Squat')).toBeInTheDocument()
  })
})