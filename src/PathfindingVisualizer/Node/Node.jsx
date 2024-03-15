import React from 'react';

import './Node.css';

function Node (props) {

  const extraClassName = props.isFinish
    ? 'node-finish'
    : props.isStart
    ? 'node-start'
    : props.isWall
    ? 'node-wall'
    : 'node-plain';



  return (
    <div
      id = {`node-${props.row}-${props.col}`}
      className = {`node ${extraClassName}`}
      onMouseDown={() => props.handleMouseDown(props.row, props.col)}
      onMouseEnter={() => props.handleMouseEnter(props.row, props.col)}
      onMouseUp={() => props.handleMouseUp(props.row, props.col)}></div>
  );
}

export default Node

export const defaultNode = {
  row: 0,
  col: 0
}