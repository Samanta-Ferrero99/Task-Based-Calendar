import React from 'react';
import { Card } from 'antd';
import './dashboardCard.css';

const DashboardCardNoScroll = ({ width, height, color, children }) => {
  return (
    <Card
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: '25px',
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}
      id='noScroll'
    >
      {children}
    </Card>
  );
};

export default DashboardCardNoScroll;
