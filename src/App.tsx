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
import { selectHeroes, selectHeroesIsLoading, selectHeroesNext, selectHeroesPrevious } from './redux/heroes/selectors';


function App() {
  const dispatch: AppDispatch = useDispatch();
  
  const data = useSelector(selectHeroes);
  const nextHeroes = useSelector(selectHeroesNext);
  const prevHeroes = useSelector(selectHeroesPrevious);
  const isLoader = useSelector(selectHeroesIsLoading);
  const [pageHeroes, setPageHeroes] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchHeroes(pageHeroes));
    dispatch(fetchFilms());
          
  }, [dispatch, pageHeroes])

 

  const handleMoreButton = () => {
    if (!nextHeroes) return;
    setPageHeroes((prev) => prev + 1); 
  }
  const handleBackButton = () => {
    if (!prevHeroes) return;
    setPageHeroes((prev) => prev - 1); 
  }
  return (
    <main className={css.section}>
      <h1 className={css.title}>Star Wars: heroes</h1>
      <Toaster />
      {isLoader && <Loader />}   
      {data && !isLoader && <HeroerList value={data} />}
      {prevHeroes&&!isLoader&&<button className={css.button} onClick={handleBackButton}>Back</button>}
      {nextHeroes && !isLoader && <button className={css.button} onClick={handleMoreButton}>More heroes</button>}      
    </main>
  )  
}

export default App
