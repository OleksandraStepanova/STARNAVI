import HeroerList from './components/HeroesList/HeroesList'
import Loader from './components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFilms } from './redux/films/operations';
import { fetchHeroes } from './redux/heroes/operations';
import { fetchShips } from './redux/ships/operations';
import { useSelector } from 'react-redux';
import { selectHeroes, selectHeroesIsLoading, selectHeroesNext, selectHeroesPrevious } from './redux/heroes/selectors';
import { AppDispatch} from './App.types';
import css from './App.module.css'


function App() {
  const dispatch: AppDispatch = useDispatch();
  
  const data = useSelector(selectHeroes);
  const nextHeroes = useSelector(selectHeroesNext);
  const prevHeroes = useSelector(selectHeroesPrevious);
  const isLoader = useSelector(selectHeroesIsLoading);
  const [pageHeroes, setPageHeroes] = useState<number>(1);
  const [pageShips, setPageShips] = useState<number>(1)

 useEffect(() => {
  dispatch(fetchFilms());
  dispatch(fetchHeroes(pageHeroes)).unwrap().catch((err) => {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  });
}, [dispatch, pageHeroes]);


useEffect(() => {
  dispatch(fetchShips(pageShips)).unwrap()
    .then((value) => {
      if (value.next) setPageShips(pageShips + 1);
    })
    .catch((err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    });
}, [dispatch, pageShips]); 

 
 

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
