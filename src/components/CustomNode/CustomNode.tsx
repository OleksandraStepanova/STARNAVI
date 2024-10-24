
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import css from './CustomNode.module.css'

export type CustomNodeDate = Node<
    {
        label: string;
        description: string;
        date: string;
        priority: string;
    }>;

export default function CustomNode({ data }:NodeProps<CustomNodeDate>) {
    return (        
        <>            
            <div className={css.wrapper}>
                <h2 style={{textAlign:'center'}}>{data.label}</h2>
                <p className={css.text}>{data.description}</p>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />           
        </>
    )
}



 
