import React, {useState} from 'react';

import './Node.css';

function Node (props) {
  const isFinish = props.isFinish
  const isStart = props.isStart
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : '';

  return (
    <div className = {`node ${extraClassName}`}></div>
  );
}

export default Node

export const defaultNode = {
  row: 0,
  col: 0
}