import { fetchHeroes } from '../heroes/operations';
import { heroesReducer, initialState } from '../heroes/slice'

describe('initioal state heroes', () => {
  it('check initial state', () => {
    const state = heroesReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should set isLoading to true on pending action', () => {
    const action = { type: fetchHeroes.pending.type };
    const state = heroesReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should save the data and set isLoading to false on fulfilled action', () => {      
        const mockData = {
            results: [
                { id: 1, name: 'Palpatine', films: [1, 2], starships: [2, 68], height: 175, mass: 70, birth_year: '15RT', gender: 'male' },
                { id: 2, name: 'Palpatine', films: [5 ,2], starships: [13, 27], height: 100, mass: 50, birth_year: '15YRT', gender:'male'},
            ],
            next: null,
            previous: null,            
      };
    const action = { type: fetchHeroes.fulfilled.type, payload: mockData };
    const state = heroesReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.heroes).toEqual(mockData.results);
  });

  it('should set an error when the action is rejected', () => {    
    const error = 'Something went wrong';
    const action = { type: fetchHeroes.rejected.type, payload: error};
    const state = heroesReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Something went wrong');
  });
})