import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { fetchShips} from '../ships/operations';
import { shipsReducer } from '../ships/slice';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('axios');

const store = configureStore({ reducer: { ships: shipsReducer } });

describe('fetchShips', () => {
  beforeEach(() => {
    store.dispatch({ type: 'ships/reset' });
  });

  it('should dispatch pending and fulfilled actions on successful fetch', async () => {
    const mockResponse = {
      data:{results: [
        { id: 1, name: 'X-Wing' },
        { id: 2, name: 'TIE Fighter' },
      ],
      next: 'http://swapi.dev/api/starships/?page=2',
      prev: null,}
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    await store.dispatch(fetchShips(1)); 

    const state = store.getState();
    expect(state.ships.isLoading).toBe(false);
    expect(state.ships.ships).toEqual(mockResponse.data.results);
  });

  it('should dispatch pending and rejected actions on failed fetch', async () => {
    const mockError = 'Network Error';
    
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(mockError));

    await store.dispatch(fetchShips(1));

    const state = store.getState(); 
    expect(state.ships.isLoading).toBe(false);
    expect(state.ships.error).toBe('Something went wrong');
  });
});

