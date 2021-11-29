import React from 'react';
import { Calendar, Badge } from 'antd';
import { taskAPI } from '../api/task';
import { useSelector } from 'react-redux';
import moment from 'moment';



const DashboardCalendar = () => {
  const { user } = useSelector((state) => state.user);
  const [tasks, setTasks] = React.useState([]);
  React.useEffect(() => {
    taskAPI.getAllTasks(user, setTasks);
  }, [user]);

  function getListData(value) {
    let listData = [];
    let valueDate = moment(value);
    for (let task of tasks) {
      let taskDate = moment(task?.dueDate);
      let t = taskDate.format('YYYY-MM-DD');
      let v = valueDate.format('YYYY-MM-DD');
      if (t === v) {
        if (task?.status === 'complete') {
          listData.push({ type: 'success', content: task?.title });
        } else if (task?.status === 'in progress') {
          listData.push({ type: 'success', content: task?.title });
        } else if (task?.status === 'next up' || task?.status === 'backlog') {
          listData.push({ type: 'warning', content: task?.title });
        } else {
          listData.push({ type: 'error', content: task?.title });
        }
      }
    }
    return listData;
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className='events'>
        {listData.map((item) => (
          <div key={item.content}>
            <Badge key={item.content} status={item.type} text={item.content} />
            <br />
          </div>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};
export default DashboardCalendar;
