import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WorkoutList } from '../WorkoutList'
import { WorkoutContext } from '../../context/WorkoutContext'

describe('WorkoutList', () => {
  const mockExercises = [
    {
      id: '1',
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
      id: '2',
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

  const mockState = {
    workouts: [{
      id: '1',
      name: 'Workout 1',
      phase: 'Strength',
      week: 1,
      exercises: mockExercises
    }],
    selectedWorkout: null,
    isLoading: false,
    error: null
  }

  const renderWithContext = (state = mockState) => {
    return render(
      <WorkoutContext.Provider value={{ state, dispatch: () => {} }}>
        <WorkoutList />
      </WorkoutContext.Provider>
    )
  }

  it('renders all exercises from the current workout', () => {
    renderWithContext()
    expect(screen.getByText('Bench Press')).toBeInTheDocument()
    expect(screen.getByText('Squat')).toBeInTheDocument()
  })

  it('shows loading spinner when no workouts', () => {
    renderWithContext({
      ...mockState,
      workouts: []
    })
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
