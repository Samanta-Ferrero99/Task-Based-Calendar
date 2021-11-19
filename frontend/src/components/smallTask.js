import React from 'react';
import { Card, Progress, Badge } from 'antd';
import './dashboardCard.css';

const SmallTask = ({task}) => {
  return (
    <p
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '5px 5px',
        margin: '2px 0px',
      }}
      onClick={() => {
        console.log('click card');
      }}
      className='hvr-grow'
    >
      <span id='taskTitle'>{task?.title}</span>
    </p>
  );
};

export default SmallTask;
