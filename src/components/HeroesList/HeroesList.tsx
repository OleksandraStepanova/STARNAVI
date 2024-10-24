import HeroeListItem from "../HeroeListItem/HeroeListItem";
import NodeGrid from "../NodeGrid/NodeGrid";
import Loader from "../Loader/Loader";
import CustomNode from "../CustomNode/CustomNode";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundery";
import { Edge, Node, useNodesState, useEdgesState, NodeTypes } from "@xyflow/react";
import { useSelector } from "react-redux";
import { selectFilms, selectFilmsIsLoading } from "../../redux/films/selectors";
import { selectShips, selectShipsIsLoading } from "../../redux/ships/selectors";
import { gridPosition } from "../../utils/gridPositon";
import { Heroe } from "../../App.types";
import css from "./HeroesList.module.css"
import { selectHeroes } from "../../redux/heroes/selectors";


const nodeTypes: NodeTypes = {
    custom: CustomNode,
} 
const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Choose your favorite hero' },
        position: { x: 52, y: 52 },    
        style: {
            backgroundColor: 'black',
            color: 'yellow',
            padding: '10px',
            borderRadius: '20px',
            fontSize: '32px',
            width: '200px',
            boxShadow:'5px 4px 10px rgba(147,112,219,0.3)'
        }
    },
]

const initialEdges: Edge[] = [];

export default function HeroerList() {
    const value = useSelector(selectHeroes);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const films = useSelector(selectFilms);
    const ships = useSelector(selectShips);   
    const loadingFilms = useSelector(selectFilmsIsLoading);
    const loadingShips = useSelector(selectShipsIsLoading);
    
    const addNode = (item: Heroe) => {
        const heroNodeId = `heroe-${item.id+Math.random()}`;
        const heroNode: Node = {
            id: heroNodeId,
            data: {
                label: item.name,
                description: `height-${item.height} / mass-${item.mass} / birth year-${item.birth_year} / gender-${item.gender}`
            },
            position: { x: 20, y: 20 },
            type:'custom',           
        };
        setNodes([heroNode]);

        const filmsID: number[] = item.films;
        const selectedFilms = films.filter(film => filmsID.includes(film.id));

        selectedFilms.forEach((film,index )=> {
                const filmNodeId = `film-${film.id + Math.random()}`;
                const filmPosition = gridPosition(index, 3, 200, 100, 200);
                const filmNode: Node = {
                    id: filmNodeId,
                    data: { label: `"${film.title}"` },
                    position: filmPosition,
                    style: {
                        backgroundColor: 'black',
                        color: 'white',
                        border: '1px solid #ffff00',
                        padding: '10px',
                        borderRadius: '30px', 
                        boxShadow:'3px 4px 10px rgba(255,255,255,0.3)'
                    }
                }
                setNodes((prevNodes) => [...prevNodes, filmNode]);
                setEdges(prevEdges => [...prevEdges, { id: `e-${heroNodeId}-${filmNodeId}`, source: heroNodeId, target: filmNodeId }]);

                const shipsIdMerged = film.starships.filter(ships => item.starships.includes(ships));        
                
                if (ships.length > 0 && shipsIdMerged.length>0) {
                    const shipsInFilm = ships.filter(ship => shipsIdMerged.includes(ship.id));
                    shipsInFilm.forEach((ship,index) => {
                        const shipPosition = gridPosition(index, 3, 100, filmNode.position.x, filmNode.position.y + 200);
                        const shipNodeId = `ship-${ship.id + Math.random()}`;
                        const shipNode: Node = {
                            id: shipNodeId,
                            data: { label: ship.name },
                            position: shipPosition,
                            style: {
                                backgroundColor: '#696969',
                                color: 'black',
                                border: '1px solid #000',
                                padding: '10px',
                                borderRadius: '8px',
                                textTransform: 'uppercase',
                                boxShadow:'0 4px 10px rgba(0,0,0,0.8)'
                            }
                        }
                        setNodes((prevNodes) => [...prevNodes, shipNode]);
                        setEdges(prevEdges => [...prevEdges, { id: `e-${filmNodeId}-${shipNodeId}`, source: filmNodeId, target: shipNodeId }]);                
                    })
                }               
            });             
    }

    return (
        <section className={css.section} data-testid="heroes-list">
            {(loadingFilms||loadingShips) && <Loader />}
            <ul className={css.list}>
                {value.map((item: Heroe) => (<HeroeListItem key={item.id} item={item} onClick={addNode} />))}
            </ul>            
            {(!loadingFilms&&!loadingShips)&&<ErrorBoundary>
                <NodeGrid
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                />
            </ErrorBoundary>}
        </section>
    )
}