import React from 'react';
import './dashboardCard.css';

const SmallTask = ({task, viewTask}) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '5px 5px',
        margin: '2px 5px',
      }}
      onClick={() => {
        viewTask(task);
      }}
      className='hvr-grow'
    >
      <span id='taskTitle'>{task?.title}</span>
    </div>
  );
};

export default SmallTask;
