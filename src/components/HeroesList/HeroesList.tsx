import { Heroe } from "../../App.types";
import css from "./HeroesList.module.css"

type HeroesListProps = {
    value: Heroe[];
    // onClickImage:(item:Image)=>void
}
export default function HeroerList({value}:HeroesListProps) {
    return (<ul className={css.list}>
        {value.map((item: Heroe) => <li key={item.id}><h2>{item.name}</h2></li>)}
    </ul>)
}