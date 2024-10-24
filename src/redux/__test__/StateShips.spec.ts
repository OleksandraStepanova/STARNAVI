import { fetchShips } from '../ships/operations';
import { shipsReducer, initialState } from '../ships/slice'

describe('initioal state heroes', () => {
    it('check initial state', () => {
        const state = shipsReducer(undefined, { type: 'unknown' })
        console.log(state);
        expect(state).toEqual(initialState)
    });

    it('should set isLoading to true on pending action', () => {
    const action = { type: fetchShips.pending.type };
    const state = shipsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
    });
    
    it('should save the data and set isLoading to false on fulfilled action', () => {      
        const mockData = {
            results: [
                { id: 1, name: 'Palpatine'},
                { id: 2, name: 'Palpatine'},
            ],
            next: null,            
      };
    const action = { type: fetchShips.fulfilled.type, payload: mockData };
    const state = shipsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ships).toEqual(mockData.results);
    });
    
    it('should set an error when the action is rejected', () => {    
    const error = 'Something went wrong';
    const action = { type: fetchShips.rejected.type, payload: error};
    const state = shipsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Something went wrong');
  });
})