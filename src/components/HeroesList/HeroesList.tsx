import {ReactFlow, Background, Edge,  Node, useNodesState, useEdgesState, NodeTypes} from "@xyflow/react";
import { Heroe } from "../../App.types";
import '@xyflow/react/dist/style.css';
import css from "./HeroesList.module.css"
import { useSelector } from "react-redux";
import { selectFilms } from "../../redux/films/selectors";
import { selectShips } from "../../redux/ships/selectors";
import CustomNode from "../FlowHeroe/CustomNode";
import { useState } from "react";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

type HeroesListProps = {
    value: Heroe[];    
}
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

const gridPosition = (index: number, columns: number, cellSize: number, startX: number, startY: number) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    return { x: startX + col * cellSize, y: startY + row * cellSize };
};

export default function HeroerList({ value }: HeroesListProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const films = useSelector(selectFilms);
    const ships = useSelector(selectShips);      
    const [loading, setLoading] = useState(false); 
    
    
    
    const addNode = async (item: Heroe) => {
        const heroNodeId = `heroe-${item.id+Math.random()}`;
        const heroNode: Node = {
            id: heroNodeId,
            data: {
                label: item.name,
                description: `height-${item.height} / mass-${item.mass} / birth year-${item.birth_year} /
    gender-${item.gender}`
            },
            position: { x: 20, y: 20 },
            type:'custom',           
        };
        setNodes([heroNode]);

        const filmsID: number[] = item.films;
        const selectedFilms = films.filter(film => filmsID.includes(film.id));
        setLoading(true);       

        try {
            selectedFilms.forEach(async(film,index )=> {
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

            const shipsId: number[] = item.starships;
            const shipsIdMerged = film.starships.filter(ships => shipsId.includes(ships));
              
         
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
        });
        } catch (err:unknown) {
            if (err instanceof Error) {
          toast.error(err.message);
        }
        }finally {
            setLoading(false);
        }              
    }

    return (
        <section className={css.section}>
            <ul className={css.list}>
                {value.map((item: Heroe) => <li className={css.item} key={item.id + Math.random()} onClick={() => addNode(item)}>                    
                    <h2>{item.name}</h2>
                </li>)}
            </ul>
            {loading && <Loader/>}
            <div className={css.flow}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    >
                    <Background />
                </ReactFlow>
            </div>
        </section>
    )
}