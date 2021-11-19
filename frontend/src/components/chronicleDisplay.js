import React from 'react';
import { Card, Progress, Badge } from 'antd';
import './dashboardCard.css';

const ChronicleDisplay = ({chronicle, viewChronicle}) => {
  return (
    <div>
      <Badge count={chronicle?.tasks?.length || 0}>
        <Card
          style={{
            backgroundColor: chronicle?.color || '#a5a0a8',
            minWidth: '35vw',
            height: '90px',
            borderRadius: '10px',
            cursor: 'pointer',
            marginBottom: '5px'
          }}
          onClick={() => {
            viewChronicle(chronicle);
          }}
          className='hvr-grow'
        >
          <p id='chronicleTitle'>{chronicle?.title}</p>
          <Progress
            percent='50'
            id='progressBarChronicle'
            strokeColor='hsl(113, 36%, 86%)'
            showInfo={false}
          />
          {chronicle?.dueDate ? (
            <p id='chronicleDueDate'>
              {new Date(chronicle.dueDate).toDateString()}
            </p>
          ) : null}
        </Card>
      </Badge>
    </div>
  );
};

export default ChronicleDisplay;
