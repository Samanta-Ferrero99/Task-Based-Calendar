import React from 'react';
import './dashboardCard.css';

const MiddleTask = ({ task, width, viewTask }) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '5px 5px',
        margin: '2px 0px',
        width: width || ''
      }}
      onClick={() => {
        viewTask(task);
      }}
      className='hvr-grow'
    >
      <p id='taskTitle'>{task?.title}</p>
      {task?.description?.length ? (
        <p id='taskTitle'>{task?.description}</p>
      ) : null}
      {task?.status?.length ? <p id='taskTitle'>{task?.status}</p> : null}
      {task?.startDate?.length ? (
        <p id='taskTitle'>
          due on {new Date(task?.startDate).toDateString().toLowerCase()}
        </p>
      ) : null}
      {task?.dueDate?.length ? (
        <p id='taskTitle'>
          due on {new Date(task?.dueDate).toDateString().toLowerCase()}
        </p>
      ) : null}
    </div>
  );
};

export default MiddleTask;
