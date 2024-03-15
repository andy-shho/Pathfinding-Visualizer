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

  const handleMouseDown = function(row, col) {
    const newGrid = getNewGridWithWalls(grid, row, col);
    setGrid(newGrid)
    setMouse(true)
  }

  const handleMouseEnter = function(row, col) {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWalls(grid, row, col);
    setGrid(newGrid)
  }

  const handleMouseUp = function(row, col) {
    setMouse(false)
  }

  const animateDijkstra = function(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // const newGrid = grid.slice();
        // const newNode = {
        //   ...node,
        //   isVisited: true,
        // };
        // newGrid[node.row][node.col] = newNode;
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i)
    }
  }

  const animateShortestPath = function(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 50 * i)
    }
  }

  const visualizeDijkstra = function(e) {
    e.preventDefault()
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };
  return (
    <>
      <button className="visualize" onClick = {visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIndex) => {
          return (<div key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const {row, col, isStart, isFinish, isVisited, isWall} = node;
              return (
                <Node
                  key = {nodeIndex}
                  isStart = {isStart}
                  isFinish = {isFinish}
                  isVisited = {isVisited}
                  isWall = {isWall}
                  row = {row}
                  col = {col}
                  handleMouseDown = {handleMouseDown}
                  handleMouseEnter = {handleMouseEnter}
                  handleMouseUp = {handleMouseUp}></Node>
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
    isWall: false,
    previousNode: null,
  };
}

const getNewGridWithWalls = (grid, row, col) =>{
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid
}



export default PathfindingVisualizer