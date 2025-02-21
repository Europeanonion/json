import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkoutForm } from '../WorkoutForm';
import { useWorkoutContext } from '../../hooks/useWorkoutContext';
import { useExerciseContext } from '../../../exercises/hooks/useExerciseContext';
import type { Workout } from '../../types/workout.types';
import type { Exercise } from '../../../exercises/types/exercise.types';


describe('WorkoutForm', () => {
  const mockWorkoutDispatch = vi.fn();
  const mockExerciseState = { exercises: [] as Exercise[] };
  const mockWorkoutToEdit: Workout = {

    id: '1',
    name: 'Test Workout',
    phase: 'Strength',
    week: 1,
    exercises: []
  };

  beforeEach(() => {
    (useWorkoutContext as any).mockReturnValue({

      state: { workouts: [] },
      dispatch: mockWorkoutDispatch
    });

    (useExerciseContext as any).mockReturnValue({

      state: mockExerciseState,
      dispatch: vi.fn()
    });

    mockWorkoutDispatch.mockClear();
  });

  it('renders the form with default values', () => {
    render(<WorkoutForm onClose={vi.fn()} />);


    expect(screen.getByLabelText('Workout Name')).toHaveValue('');
    expect(screen.getByLabelText('Phase')).toHaveValue('');
    expect(screen.getByLabelText('Week')).toHaveValue(1);
    expect(screen.getByRole('button', { name: 'Add Workout' })).toBeInTheDocument();
  });

  it('renders the form with workoutToEdit values', () => {
    render(<WorkoutForm workoutToEdit={mockWorkoutToEdit} onClose={vi.fn()} />);


    expect(screen.getByLabelText('Workout Name')).toHaveValue(mockWorkoutToEdit.name);
    expect(screen.getByLabelText('Phase')).toHaveValue(mockWorkoutToEdit.phase);
    expect(screen.getByLabelText('Week')).toHaveValue(mockWorkoutToEdit.week);
    expect(screen.getByRole('button', { name: 'Update Workout' })).toBeInTheDocument();
  });

  it('validates the form and dispatches ADD_WORKOUT', async () => {
    render(<WorkoutForm onClose={vi.fn()} />);


    fireEvent.change(screen.getByLabelText('Workout Name'), { target: { value: 'New Workout' } });
    fireEvent.change(screen.getByLabelText('Phase'), { target: { value: 'Hypertrophy' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockWorkoutDispatch).toHaveBeenCalledWith({
      type: 'ADD_WORKOUT',
      payload: expect.objectContaining({
        name: 'New Workout',
        phase: 'Hypertrophy',
        week: 1,
        exercises: []
      })
    });
  });

  it('validates the form and dispatches UPDATE_WORKOUT', async () => {
    render(<WorkoutForm workoutToEdit={mockWorkoutToEdit} onClose={vi.fn()} />);

    fireEvent.change(screen.getByLabelText('Workout Name'), { target: { value: 'Updated Workout' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockWorkoutDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_WORKOUT',
      payload: expect.objectContaining({
        name: 'Updated Workout',
        phase: 'Strength',
        week: 1,
        exercises: []
      })
    });
  });

  it('calls onClose when the form is submitted', () => {
    const onClose = vi.fn();
    render(<WorkoutForm onClose={onClose} workoutToEdit={undefined} />);


    fireEvent.submit(screen.getByRole('form'));

    expect(onClose).toHaveBeenCalled();
  });
});
