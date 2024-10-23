import { Heroe } from "../../App.types";
import css from './HeroeListItem.module.css'

type HeroeListItemProps = {
  item: Heroe;
  onClick: (item: Heroe) => void;
};

export default function HeroeListItem({ item, onClick }: HeroeListItemProps) {
  return (
    <li className={css.item} key={item.id + Math.random()} onClick={() => onClick(item)}>
      <h2>{item.name}</h2>
    </li>
  );
}