import React from "react";
import { Card } from 'antd';
import "./dashboardCard.css";

const DashboardCard = ({width, height, color, children}) => {
  return (
    <Card title="Card title" style={{ width: width, height: height, color: color }} id="dashboardCard">
      {children}
    </Card>
  );
}

export default DashboardCard;