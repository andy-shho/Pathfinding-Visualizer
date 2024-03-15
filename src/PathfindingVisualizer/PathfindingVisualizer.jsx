import React, {useState, useEffect} from 'react';
import Node from './Node/Node.jsx';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/dijkstra';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './PathfindingVisualizer.css';

function PathfindingVisualizer () {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouse] = useState(false);
  const [startRow, setStartRow] = useState(10);
  const [startCol, setStartCol] = useState(15);
  const [finishRow, setFinishRow] = useState(10);
  const [finishCol, setFinishCol] = useState(35);
  const [rows, setRows] = useState(20);
  const[cols, setCols] = useState(50);
  const[resize, setResize] = useState(false);
  const[pickStart, setPickStart] = useState(false);
  const[pickFinish, setPickFinish] = useState(false);

  const visualizeStyle = {
    backgroundColor: '#265073',
    fontFamily: 'roboto',
    color: 'black',
    fontSize: 20,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
  };

  const submitStyle = {
    backgroundColor: '#265073',
    fontFamily: 'roboto',
    color: 'black',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
  };

  const startStyle = {
    backgroundColor: '#5F8670',
    fontFamily: 'Roboto',
    color: 'black',
    fontSize: 16,
    border: '1px solid',
    lineHeight: 1.5,
  };

  const finishStyle = {
    backgroundColor: '#820300',
    fontFamily: 'Roboto',
    color: 'black',
    fontSize: 16,
    border: '1px solid',
    lineHeight: 1.5,
  };

  const resetStyle = {
    backgroundColor: '#265073',
    fontFamily: 'Roboto',
    color: 'black',
    fontSize: 16,
    padding: '6px 12px 12px',
    border: '1px solid',
    lineHeight: 1.5,
  };



  useEffect (() => {
    const tempGrid = getGrid();
    setGrid(tempGrid);
  }, [resize]);

  const onReset = function() {
    for (let row = 0; row < rows; row++) {
      for(let col = 0; col < cols; col++) {
        const removeClass = document.getElementById(`node-${row}-${col}`);
        if (removeClass.classList.length > 0) {
          if (removeClass.classList.contains("node-finish")) removeClass.classList.remove("node-finish")
          if (removeClass.classList.contains("node-start")) removeClass.classList.remove("node-start")
          if (removeClass.classList.contains("node-visited")) removeClass.classList.remove("node-visited")
          if (removeClass.classList.contains("node-shortest-path")) removeClass.classList.remove("node-shortest-path")
        }
      }
    }
    const newGrid = getGrid();
    setGrid(newGrid);
  }

  const createNode = function(col, row) {
    return {
      col : col,
      row : row,
      isStart: row === startRow && col === startCol,
      isFinish: row === finishRow && col === finishCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const getGrid = () => {
    const grid = [];
      for (let row = 0; row < rows; row++) {
        const currRow = [];
        for (let col = 0; col < cols; col++) {
          currRow.push(createNode(col, row));
        }
        console.log(currRow)
        grid.push(currRow);
      }
      return grid;
  };

  const resizeGrid = function(e) {
    e.preventDefault()
    setResize(!resize)
  };

  const onRows = function(e) {
    setRows(e.target.value);
  };

  const onCols = function(e) {
    setCols(e.target.value);
  };


  const handleMouseDown = function(row, col) {
    if (pickStart) {
      if (rows > startRow && cols > startCol) {
        grid[startRow][startCol].isStart = false;
      }
      setStartRow(row)
      setStartCol(col)
      setPickStart(false)
      setResize(!resize)
    } else if (pickFinish) {
      if (rows > finishRow && cols > finishCol) {
        grid[finishRow][finishCol].isStart = false;
      }
      setFinishRow(row)
      setFinishCol(col)
      setPickFinish(false)
      setResize(!resize)
    } else {
      const newGrid = getNewGridWithWalls(grid, row, col);
      setGrid(newGrid)
      setMouse(true)
    }
  };

  const handleMouseEnter = function(row, col) {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWalls(grid, row, col);
    setGrid(newGrid)
  };

  const handleMouseUp = function(row, col) {
    setMouse(false)
  };

  const onStartClick = function() {
    setPickStart(true);
  };

  const onFinishClick = function() {
    setPickFinish(true);
  };

  const selectStart = function(row, col) {
    if (!pickStart) return;
    setStartRow(row)
    setStartCol(col)
    setPickStart(false)
  };

  const selectFinish = function(row,col) {
    if (!pickFinish) return;
    setFinishRow(row)
    setFinishCol(col)
    setPickFinish(false)
  };

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
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i)
    }
  };

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
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };
  return (
    <>
      <div className="visualize-div">
        <Button style={visualizeStyle} variant="contained" size="large" className="visualize" onClick = {visualizeDijkstra}>
          Visualize Dijkstra's Algorithm
        </Button>
      </div>
      <div className="submit-div">
        <form className="form" onSubmit = {resizeGrid}>
          <TextField variant="outlined" label="Number of Rows" placeholder='20' onChange={onRows}></TextField>
          <TextField variant="outlined" label="Number of Columns" placeholder='50' onChange={onCols}></TextField>
          <Button style={submitStyle}variant="contained" className="submit" type="submit">Confirm</Button>
        </form>
      </div>
      <div className="select-node">
        <Button style={startStyle} variant="contained" size="small" className="start-node" onClick = {onStartClick}>
            Select a Start Node
        </Button>
        <Button style={finishStyle} variant="contained" size="small" className="finish-node" onClick = {onFinishClick}>
            Select a Finish Node
        </Button>
      </div>
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
                  handleMouseUp = {handleMouseUp}
                  selectStart =  {selectStart}
                  selectFinish = {selectFinish}
                  pickStart = {pickStart}
                  pickFinish = {pickFinish}></Node>
              );
              })}
          </div>
          );
        })}
      </div>
      <Button style={resetStyle} variant="contained" size="small" className="reset-button" onClick = {onReset}>
          Reset
      </Button>
    </>
  );
};

const getNewGridWithWalls = (grid, row, col) =>{
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid
};



export default PathfindingVisualizer