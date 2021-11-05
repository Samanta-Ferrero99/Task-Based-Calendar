import React from "react";
import { Card } from 'antd';
import "./dashboardCard.css";

const DashboardCard = ({width, height, color, children}) => {
  return (
    <Card style={{ width: width, height: height, backgroundColor: color, borderRadius: "25px" }} id="dashboardCard">
      {children}
    </Card>
  );
}

export default DashboardCard;