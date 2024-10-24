import { ReactFlow, Background, Edge, Node, NodeTypes, EdgeChange, NodeChange } from "@xyflow/react";
import css from './NodeGrid.module.css';
import '@xyflow/react/dist/style.css';

type NodeGridProps = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  nodeTypes: NodeTypes;
};

export default function NodeGrid({ nodes, edges, onNodesChange, onEdgesChange, nodeTypes }: NodeGridProps) {
  return (
    <div className={css.flow} data-testid="node-grid">
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
  );
}