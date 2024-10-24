import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HeroesList from '../components/HeroesList/HeroesList';
import { rootReducer } from '../redux/store';
import { Heroe, RootState } from '../App.types';
import HeroerList from '../components/HeroesList/HeroesList';

const createMockStore = (initialState: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

const mockHeroes: Heroe[] = [
        { id: 1, name: "Luke Skywalker", height: 172, mass: 77, birth_year: "19BBY", gender: "male", films: [], starships: [] },
        { id: 2, name: "Darth Vader", height: 202, mass: 136, birth_year: "41.9BBY", gender: "male", films: [], starships: [] },
    ];

describe('HeroesList Component', () => {
  it('renders heroes list', () => {
    const store = createMockStore({
      heroes: {
        isLoading: false,
        heroes: [
          { id: 1, name: 'Luke Skywalker', films: [1, 2], starships: [2, 68], height: 175, mass: 70, birth_year: '15RT', gender: 'male' },
          { id: 2, name: 'Darth Vader', films: [5, 6], starships: [2, 68], height: 175, mass: 70, birth_year: '15RT', gender: 'male' },
        ],
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
        <HeroesList />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
    
    it('shows loader when loading films', () => {
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
      isLoading: true,
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
      <HeroesList />
    </Provider>
  );

  expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

        it("shows NodeGrid when loadingFilms and loadingShips are false", () => {
        const store = createMockStore({
            heroes: {
                isLoading: false,
                heroes: mockHeroes,
                next: null,
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
                next: "",
            },
        });

        render(
            <Provider store={store}>
                <HeroerList />
            </Provider>
        );

        expect(screen.getByTestId("node-grid")).toBeInTheDocument();
    });

    it("displays a list of heroes", () => {
        const store = createMockStore({
            heroes: {
                isLoading: false,
                heroes: mockHeroes,
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
                next: "",
            },
        });

        render(
            <Provider store={store}>
                <HeroerList />
            </Provider>
        );

        mockHeroes.forEach(hero => {
            expect(screen.getByText(hero.name)).toBeInTheDocument();
        });
    });
    
});