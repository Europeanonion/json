import { render, screen } from '@testing-library/react';
import { WorkoutCard } from '../../src/components/workouts/WorkoutCard';

describe('WorkoutCard', () => {
  const mockExercise = {
    name: 'Bench Press',
    warmupSets: '2',
    workingSets: '3',
    reps: '8-12',
    rpe: '8',
    rest: '2-3 min',
    substitutions: ['DB Press', 'Machine Press'],
    notes: 'Keep tight form'
  };

  it('renders exercise details correctly', () => {
    render(<WorkoutCard exercise={mockExercise} />);
    
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('3 sets')).toBeInTheDocument();
    expect(screen.getByText('8-12 reps')).toBeInTheDocument();
    expect(screen.getByText('Keep tight form')).toBeInTheDocument();
  });
});