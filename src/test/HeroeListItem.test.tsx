import { render, screen, fireEvent } from '@testing-library/react';
import { Heroe } from '../App.types';
import HeroeListItem from '../components/HeroeListItem/HeroeListItem';
import { vi } from 'vitest';

describe('HeroeListItem', () => {
const mockHero: Heroe = {
    id: 1,
    name: 'Hero 1',
    starships: [21, 17],
    films: [1, 2],
    height: 173,
    mass: 73,
    birth_year: '17BA',
    gender: 'male'
};

  const mockOnClick = vi.fn();

  it('renders correctly with the given hero', () => {
    render(<HeroeListItem item={mockHero} onClick={mockOnClick} />);

    expect(screen.getByRole('heading', { name: /hero 1/i })).toBeInTheDocument();
  });

  it('calls onClick with the correct hero when clicked', () => {
    render(<HeroeListItem item={mockHero} onClick={mockOnClick} />);
   
    fireEvent.click(screen.getByText(/hero 1/i)); 
      
    expect(mockOnClick).toHaveBeenCalledWith(mockHero);
  });
});