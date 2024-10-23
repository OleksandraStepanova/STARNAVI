import { fetchFilms } from '../films/operations'
import { filmsReducer, initialState } from '../films/slice'

describe('initioal state heroes', () => {
    it('check initial state', () => {
        const state = filmsReducer(undefined, { type: 'unknown' })
        expect(state).toEqual(initialState)
    })

    it('should set isLoading to true on pending action', () => {
    const action = { type: fetchFilms.pending.type };
    const state = filmsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
    });
    
    it('should save the data and set isLoading to false on fulfilled action', () => {      
        const mockData = {
            results: [
                { id: 1, title: 'A new hope',  starships: [32,78,95]},
                { id: 2, title: 'Return of the Jedi',  starships: [6,78,9]},
            ],         
      };
    const action = { type: fetchFilms.fulfilled.type, payload: mockData };
    const state = filmsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.films).toEqual(mockData.results);
    });

    it('should set an error when the action is rejected', () => {    
    const error = 'Something went wrong';
    const action = { type: fetchFilms.rejected.type, payload: error};
    const state = filmsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Something went wrong');
  });
})