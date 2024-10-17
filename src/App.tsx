import { useEffect, useState } from 'react'
import css from './App.module.css'
import { getHeroes } from './apiService/heroes'
import HeroerList from './components/HeroesList/HeroesList'
import { Heroe } from './App.types';
import Loader from './components/Loader/Loader';

function App() {
  const [data, setData] = useState<Heroe[]>([]);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const handleHeroes = async () => {
      try {
        setLoader(true);
        const data = await getHeroes();
        console.log(data);
        setData(prevState => {
          return [...prevState, ...data.results];
        });
        setTotal(data.count);
      } catch (error: unknown) {
        if (error instanceof Error) {
          // toast.error(error.message);
        }        
      } finally {
        setLoader(false);
      }            
    }

    handleHeroes();
  }, [])
  
  return (
    <section className={css.section}>
      <h1 className={css.title}>Star Wars heroes</h1>
      {isLoader && <Loader />}   
      {total>0&&<HeroerList value={data}/>}
    </section>
  )  
}

export default App
