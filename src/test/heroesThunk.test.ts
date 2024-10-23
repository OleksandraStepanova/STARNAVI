import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { fetchHeroes } from '../redux/heroes/operations';
import { heroesReducer } from '../redux/heroes/slice';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('axios'); 

const store = configureStore({ reducer: { heroes: heroesReducer } });

describe('fetchHeroes', () => {
  beforeEach(() => {
    store.dispatch({ type: 'heroes/reset' }); 
  });

  it('should dispatch pending and fulfilled actions on successful fetch', async () => {
    const mockResponse = {
      data: {
        results: [{ id: 1, name: 'Luke Skywalker' }],
        next: 'http://star-wars/heroes?page=2',
        prev: null,
      },
    };
   
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    await store.dispatch(fetchHeroes(1));

    const state = store.getState();
    expect(state.heroes.isLoading).toBe(false); 
    expect(state.heroes.heroes).toEqual(mockResponse.data.results);
  });

  it('should dispatch pending and rejected actions on failed fetch', async () => {
    const mockError = 'Network Error';
      
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(mockError));

    await store.dispatch(fetchHeroes(1));

    const state = store.getState();
    expect(state.heroes.isLoading).toBe(false);
    expect(state.heroes.error).toBe('Something went wrong');
  });
});