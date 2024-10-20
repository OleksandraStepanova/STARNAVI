import {ReactFlow, Background, Edge,  Node, useNodesState, useEdgesState, NodeTypes} from "@xyflow/react";
import { AppDispatch, Heroe } from "../../App.types";
import '@xyflow/react/dist/style.css';
import css from "./HeroesList.module.css"
import { useSelector } from "react-redux";
import { selectFilms } from "../../redux/films/selectors";
import { selectShips } from "../../redux/ships/selectors";
import { useDispatch } from "react-redux";
import { fetchShipsById } from "../../redux/ships/operations";
import CustomNode from "../FlowHeroe/CustomNode";
import { useState } from "react";
import Loader from "../Loader/Loader";

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
        position: { x: 20, y: 20 },    
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

// const calculateNodePosition = (radius:number, angle:number, centerX:number, centerY:number) => {
//     const x = centerX + radius * Math.cos(angle);
//     const y = centerY + radius * Math.sin(angle);
//     return { x, y };
// }
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
    const dispatch: AppDispatch = useDispatch();   
    const [loading, setLoading] = useState(false);
    console.log(ships);
    
    
    const addNode = async (item: Heroe) => {
        const heroNodeId = `heroe-${item.id+Math.random()}`;
        const heroNode: Node = {
            id: heroNodeId,
            data: {
                label: item.name,
                description: `height-${item.height} / mass-${item.mass} / birth year-${item.birth_year} /
    gender-${item.gender}`
            },
            position: { x: 250, y: 10 },
            type:'custom',           
        };
        setNodes([heroNode]);

        const filmsID: number[] = item.films;
        const selectedFilms = films.filter(film => filmsID.includes(film.id));
        setLoading(true);

        try {
            selectedFilms.forEach(async(film )=> {
            const filmNodeId = `film-${film.id + Math.random()}`;
            const filmNode: Node = {
                id: filmNodeId,
                data: { label: `"${film.title}"` },
                position: { x: film.id * 180 - 160, y: 200 },
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
            const shipPromises = shipsIdMerged.map(shipId => dispatch(fetchShipsById(shipId)));
            await Promise.all(shipPromises);          
         
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
        } catch (err) {
             console.error("Failed to fetch ships:", err);
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