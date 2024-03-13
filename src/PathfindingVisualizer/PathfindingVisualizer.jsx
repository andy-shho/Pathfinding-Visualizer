import React, {useState, useEffect} from 'react';
import Node from './Node/Node.jsx';

import './PathfindingVisualizer.css';

function PathfindingVisualizer() {
  const [nodes, setNodes] = useState([]);

  useEffect (() => {
    const nodes = [];
    for (let row = 0; row < 20; row++) {
      const currRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45,
        };
        currRow.push(currentNode);
      }
      nodes.push(currRow);
    }
    setNodes(nodes)
  })

  return (
    <div className="grid">
      {nodes.map((row, rowIndex) => {
        return <div key={rowIndex}>
          {row.map((node, nodeIndex) => {
            const {isStart, isFinish} = node;
            return (
              <Node
                key = {nodeIndex}
                isStart = {isStart}
                isFinish = {isFinish}></Node>
            );
            })}
        </div>
      })}
    </div>
  );
}
export default PathfindingVisualizer