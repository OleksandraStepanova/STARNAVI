import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { fetchFilms } from '../films/operations'; 
import { filmsReducer } from '../films/slice';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('axios');

const store = configureStore({ reducer: { films: filmsReducer } });

describe('fetchFilms', () => {
  beforeEach(() => {
    store.dispatch({ type: 'films/reset' });
  });

  it('should dispatch pending and fulfilled actions on successful fetch', async () => {
    const mockResponse = {
        data: {
            results: [
            { id: 1, title: 'Film 1', starships:[8,6] },
                { id: 2, title: 'Film 2', starships: [84, 6] },
            ],
            next: 'http://star-wars/films?page=2',
            previous: null,
      }
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    await store.dispatch(fetchFilms());

    const state = store.getState();
    expect(state.films.isLoading).toBe(false);
    expect(state.films.films).toEqual(mockResponse.data.results);
  });

  it('should dispatch pending and rejected actions on failed fetch', async () => {
    const mockError = 'Network Error';
    
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(mockError));

    await store.dispatch(fetchFilms());

    const state = store.getState();
    expect(state.films.isLoading).toBe(false);
    expect(state.films.error).toBe('Something went wrong');
  });
});