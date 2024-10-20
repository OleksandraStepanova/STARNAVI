import { useEffect, useState } from 'react'
import css from './App.module.css'
import HeroerList from './components/HeroesList/HeroesList'
import { AppDispatch} from './App.types';
import Loader from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { fetchFilms } from './redux/films/operations';
import { fetchHeroes } from './redux/heroes/operations';
import { useSelector } from 'react-redux';
import { selectHeroes, selectHeroesIsLoading, selectHeroesNext } from './redux/heroes/selectors';
import {  selectShipsNext } from './redux/ships/selectors';
// import { fetchShips } from './redux/ships/operations';

function App() {
  const dispatch: AppDispatch = useDispatch();
  
  const data = useSelector(selectHeroes);
  const nextHeroes = useSelector(selectHeroesNext);
  const nextShips = useSelector(selectShipsNext);
  const isLoader = useSelector(selectHeroesIsLoading);
  const [pageHeroes, setPageHeroes] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchHeroes(pageHeroes));
    dispatch(fetchFilms());
          
  }, [dispatch, pageHeroes, nextShips])

  const handleMoreButton = () => {
    if (!nextHeroes) return;
    setPageHeroes((prev) => prev + 1); 
  }
  return (
    <main className={css.section}>
      <h1 className={css.title}>Star Wars: heroes</h1>
      <Toaster />
      {isLoader && <Loader />}   
      {data&&!isLoader && <HeroerList value={data} />}
      {nextHeroes&&!isLoader&&<button className={css.button} onClick={handleMoreButton}>More heroes</button>}
    </main>
  )  
}

export default App
