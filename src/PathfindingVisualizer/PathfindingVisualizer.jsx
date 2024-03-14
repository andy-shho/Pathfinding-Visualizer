import React, {useState, useEffect} from 'react';
import Node from './Node/Node.jsx';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/dijkstra';

import './PathfindingVisualizer.css';

const START_ROW = 10;
const START_COL = 15;
const FINISH_ROW = 10;
const FINISH_COL = 35;

function PathfindingVisualizer () {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouse] = useState(false);


  useEffect (() => {
    const tempGrid = getGrid();
    setGrid(tempGrid);
  }, []);

  const animateDijkstra = function(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = grid.slice();
        const newNode = {
          ...node,
          isVisited: true,
        };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 20 * i)
    }
  }

  const visualizeDijkstra = function(e) {
    e.preventDefault()
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    // const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder)
  };
  return (
    <>
      <button onClick = {visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIndex) => {
          return (<div key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const {isStart, isFinish, isVisited} = node;
              return (
                <Node
                  key = {nodeIndex}
                  isStart = {isStart}
                  isFinish = {isFinish}
                  isVisited = {isVisited}></Node>
              );
              })}
          </div>
          );
        })}
      </div>
    </>
  );
}

const getGrid = () => {
  const grid = [];
    for (let row = 0; row < 20; row++) {
      const currRow = [];
      for (let col = 0; col < 50; col++) {
        currRow.push(createNode(col, row));
      }
      grid.push(currRow);
    }
    return grid;
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === FINISH_ROW && col === FINISH_COL,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
}



export default PathfindingVisualizer