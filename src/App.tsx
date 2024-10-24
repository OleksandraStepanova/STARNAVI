import HeroerList from './components/HeroesList/HeroesList'
import Loader from './components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFilms } from './redux/films/operations';
import { fetchHeroes } from './redux/heroes/operations';
import { fetchShips } from './redux/ships/operations';
import { useSelector } from 'react-redux';
import { selectHeroes, selectHeroesError, selectHeroesIsLoading, selectHeroesNext, selectHeroesPrevious } from './redux/heroes/selectors';
import { AppDispatch} from './App.types';
import css from './App.module.css'
import { selectFilmsError } from './redux/films/selectors';
import { selectShipsError } from './redux/ships/selectors';


function App() {
  const dispatch: AppDispatch = useDispatch();
  const value = useSelector(selectHeroes);
  const errorHeroes = useSelector(selectHeroesError);
  const errorFilms = useSelector(selectFilmsError);
  const errorShips = useSelector(selectShipsError);
  const nextHeroes = useSelector(selectHeroesNext);
  const prevHeroes = useSelector(selectHeroesPrevious);
  const isLoader = useSelector(selectHeroesIsLoading);
  const [pageHeroes, setPageHeroes] = useState<number>(1);
  const [pageShips, setPageShips] = useState<number>(1)

 useEffect(() => {  
   dispatch(fetchHeroes(pageHeroes)).unwrap().then().catch((err:unknown) => {
     if (err instanceof Error) {
          toast.error(errorHeroes);
     } else {
       toast.error(errorHeroes);
        }
   });   
   dispatch(fetchFilms()).unwrap().then().catch((err:unknown) => {
     if (err instanceof Error) {
          toast.error(errorFilms);
     } else {
       toast.error('Something went wrong');
        }
   });  ;
}, [dispatch, pageHeroes, errorHeroes, errorFilms]);


useEffect(() => {
  dispatch(fetchShips(pageShips)).unwrap()
    .then((value) => {
      if (value.next) setPageShips(pageShips + 1);
    }).catch((err:unknown) => {
     if (err instanceof Error) {
          toast.error(errorShips);
     } else {
       toast.error('Something went wrong');
        }
   });
}, [dispatch, pageShips,errorShips]); 
 

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
      <Toaster data-testid="toaster"/>
      {isLoader && <Loader/>}   
      {!isLoader&&value.length>0 && <HeroerList data-testid="heroes-list"/>}
      {prevHeroes&&!isLoader&&<button className={css.button} onClick={handleBackButton}>Back</button>}
      {nextHeroes && !isLoader && <button className={css.button} onClick={handleMoreButton}>More heroes</button>}      
    </main>
  )  
}

export default App
