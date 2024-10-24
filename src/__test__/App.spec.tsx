import { render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import {rootReducer} from '../redux/store';
import { RootState } from '../App.types';
import { vi } from 'vitest';
import { toast } from 'react-hot-toast';

class MockResizeObserver {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

const createMockStore = (initialState:RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

vi.mock('react-hot-toast', async () => {
  const original = await vi.importActual<{ toast: typeof toast }>('react-hot-toast');
  return {
    ...original,
    toast: {
      error: vi.fn(),
      success: vi.fn(),
    },
    Toaster: () => <div data-testid="toaster" />,
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    const store = createMockStore({
      heroes: {
        isLoading: false,
        heroes: [],
        next: null,
        previous: null,
        error: null,
      },
        films: {
        films: [],
        isLoading: false,
        error: null,
      },
      ships: {
        ships: [],
        isLoading: false,
        error: null,
        next:'',
      }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Star Wars: heroes/i)).toBeInTheDocument();
  });

it('shows a loader when isLoading is true', () => {
    const store = createMockStore({
        heroes: {
            isLoading: true,
            heroes: [],
            next: null,
            previous: null,
            error: null,
        },
        films: {
            films: [],
            isLoading: false,
            error: null,
        },
        ships: {
            ships: [],
            isLoading: false,
            error: null,
            next: '',
        }
    });

    render(
        <Provider store={store}>
            <App />
        </Provider>
    );


    expect(screen.getByTestId('loader')).toBeInTheDocument(); 
});

  it('ddisplays HeroesList when data is loaded', async () => {    
    const store = createMockStore({
      heroes: {
        isLoading: false,
        heroes: [
          { id: 1, name: 'Luke Skywalker', films: [1, 2], starships: [2, 68], height: 175, mass: 70, birth_year: '15RT', gender: 'male'  },
          { id: 2, name: 'Darth Vader', films: [5, 6], starships: [2, 68], height: 175, mass: 70, birth_year: '15RT', gender: 'male'  },
        ],
        next: 'http//:next-page',
        previous: null,
        error: null,
      },
      films: {
        films: [
          { id: 1, title: 'A new hope',  starships: [32,78,95]},
          { id: 2, title: 'Return of the Jedi',  starships: [6,78,9]},
        ],
        isLoading: false,
        error: null,
      },
      ships: {
        ships: [
          { id: 1, name: 'Palpatine'},
          { id: 2, name: 'Palpatine'},
        ],
        isLoading: false,
        error: null,
        next:'http//:next-page',
      }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('heroes-list')).toBeInTheDocument();
    });
  });
});