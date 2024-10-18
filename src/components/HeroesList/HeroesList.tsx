import {ReactFlow, Background, Edge,  Node, useNodesState, useEdgesState } from "@xyflow/react";
import { Heroe } from "../../App.types";
import '@xyflow/react/dist/style.css';
import css from "./HeroesList.module.css"
import { getFilms } from "../../apiService/films";

type HeroesListProps = {
    value: Heroe[];    
}

const initialNodes: Node[] = [
    {
        id: '',
        data: { label: 'star war' },
        position:{x:250, y:0},
    },
]

const initialEdges: Edge[] = [];

export default function HeroerList({ value }: HeroesListProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    const addNode = async (item: Heroe) => {
        const heroNodeId = `${item.id}`;
        const heroNode: Node = {
            id: heroNodeId,
            data: { label: item.name },
            position: { x: 250, y: 0 }
        };
        setNodes([heroNode]);
        setEdges([]);
        
        const films = await getFilms(item.films[0]);
        console.log(films);
        
   
    }

   
    

    return (
        <section className={css.section}>
            <ul className={css.list}>
                {value.map((item: Heroe) => <li className={css.item} key={item.id+Math.random()} onClick={()=>addNode(item)}><h2>{item.name}</h2></li>)}
            </ul>
            <div style={{ width: '100vw', height: '100vh', color:'black'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView>
                    <Background />
                </ReactFlow>
            </div>
        </section>
    )
}