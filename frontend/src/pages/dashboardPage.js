/* eslint-disable react-hooks/exhaustive-deps */
// Import dependencies
import React from "react";
import {Button as AntButton, Tooltip} from "antd";
import { Row, Col, Modal } from "antd";
import { useSelector } from 'react-redux';
import getRandomQuote from "../utils/getRandomQuote";
import { taskAPI } from '../api/task';
import {PlusSquareFilled} from "@ant-design/icons"
import { useHistory } from 'react-router';

// Import components
import ChronicleDisplay from "../components/chronicleDisplay";
import SmallTask from "../components/smallTask";
import TaskForm from "../components/taskForm";
import ChronicleForm from "../components/chronicleForm"
import DashboardCard from "../components/dashboardCard";
import DashboardCardNoScroll from '../components/noScrollDashboardCard';

// The user's dashboard page -> overview of all tasks/projects
export default function DashboardPage() {

  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const quote = getRandomQuote();
  const [chronicles, setChronicles] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [todayTasks, setTodayTasks] = React.useState([]);
  const [tomorrowTasks, setTomorrowTasks] = React.useState([]);
  const [upcomingTasks, setUpcomingTasks] = React.useState([]);
  const [showNewTask, setShowNewTask] = React.useState(false);
  const [showNewChronicle, setShowNewChronicle] = React.useState(false);

  React.useEffect(() => {
    taskAPI.getAllChronicles(user, setChronicles);
    taskAPI.getAllTasks(user, setTasks);
  }, [showNewChronicle, showNewTask]);

  React.useEffect(() => {
    setTodayTasks(getTodayTasks());
    setTomorrowTasks(getTomorrowTasks());
    setUpcomingTasks(getUpcomingTasks());
  }, [tasks]);

  const viewChronicle = (chronicle) => {
    history.push("/view-chronicle", {data: {chronicle, user}});
  }

  const getTodayTasks = () => {
    const today = [];
    const td = new Date(new Date().toDateString());
    for (let task of tasks) {
      if (task?.dueDate) {
        const taskDate = new Date(Date.parse(task?.dueDate));
        taskDate.setDate(taskDate.getDate() + 1);
        if (
          taskDate.getDate() === td.getDate() &&
          taskDate.getMonth() === td.getMonth() &&
          taskDate.getFullYear() === td.getFullYear()
        ) {
          today.push(task);
        }
      }
    }
    return today;
  }

  const getTomorrowTasks = () => {
    const tomorrow = [];
    const td = new Date(new Date().toDateString());
    td.setDate(td.getDate() + 1);
    for (let task of tasks) {
      if (task?.dueDate) {
        const taskDate = new Date(Date.parse(task?.dueDate));
        taskDate.setDate(taskDate.getDate() + 1);
        if (
          taskDate.getDate() === td.getDate() &&
          taskDate.getMonth() === td.getMonth() &&
          taskDate.getFullYear() === td.getFullYear()
        ) {
          tomorrow.push(task);
        }
      }
    }
    return tomorrow;
  };

  const getUpcomingTasks = () => {
    const upcoming = [];
    const min = new Date(new Date().toDateString());
    const max = new Date(new Date().toDateString());
    min.setDate(min.getDate() + 2);
    max.setDate(max.getDate() + 8);
    for (let task of tasks) {
      if (task?.dueDate) {
        const taskDate = new Date(Date.parse(task?.dueDate));
        taskDate.setDate(taskDate.getDate() + 1);
        if (
          taskDate.getDate() <= max.getDate() &&
          taskDate.getDate() >= min.getDate() &&
          taskDate.getMonth() <= max.getMonth() &&
          taskDate.getMonth() >= min.getMonth() &&
          taskDate.getFullYear() <= max.getFullYear() &&
          taskDate.getFullYear() >= min.getFullYear()
        ) {
          upcoming.push(task);
        }
      }
    }
    return upcoming;
  };

  const viewTask = (task) => {
    history.push('/view-task', { data: { task, user } });
  };
  
  // Render the page
  return (
    <>
      <div
        className='dashboard'
        id='dashboard'
        style={{ paddingLeft: '8vw', paddingTop: '40px' }}
      >
        <Row>
          <Tooltip title='create a new chronicle'>
            <AntButton
              style={{ marginRight: '5px' }}
              icon={<PlusSquareFilled />}
              onClick={() => setShowNewChronicle(true)}
            />
          </Tooltip>
          <Modal
            footer={null}
            visible={showNewChronicle}
            onCancel={() => setShowNewChronicle(false)}
          >
            <ChronicleForm user={user} />
          </Modal>
          <Tooltip title='create a new task'>
            <AntButton
              id='btn2'
              icon={<PlusSquareFilled />}
              onClick={() => setShowNewTask(true)}
            />
          </Tooltip>
          <Modal
            footer={null}
            visible={showNewTask}
            onCancel={() => setShowNewTask(false)}
          >
            <TaskForm user={user} chronicles={chronicles} />
          </Modal>
          <h1 id='normalHeading3'>good morning, {user.username} !</h1>
        </Row>
        <Row style={{ marginTop: '35px' }}>
          <DashboardCard width='85vw' height='120px' color='#fafafa'>
            <p id='quote'>{quote.text}</p>
            <p id='quoteAuthor'>
              {' '}
              - {quote.author === null ? 'Unknown' : quote.author}
            </p>
          </DashboardCard>
        </Row>
        <br />
        <Row gutter={[24, 24]}>
          <Col span={11.5}>
            <DashboardCardNoScroll
              width='41vw'
              height='400px'
              color='#fafafa'
              id='noScroll'
            >
              <h1 id='normalHeading1'>your chronicles</h1>
              {chronicles?.length ? (
                chronicles?.map((ch) => (
                  <ChronicleDisplay
                    viewChronicle={viewChronicle}
                    key={ch?.title}
                    chronicle={ch}
                  />
                ))
              ) : (
                <p id='subHeading3'>no chronicles to display</p>
              )}
            </DashboardCardNoScroll>
          </Col>
          <Col span={12}>
            <Row gutter={[12, 12]}>
              <Col span={5.5}>
                <DashboardCardNoScroll
                  width='20vw'
                  height='180px'
                  color='#fafafa'
                  id='noScroll'
                >
                  <h1 id='normalHeading2'>today</h1>
                  {todayTasks?.length ? (
                    todayTasks?.map((task) => (
                      <SmallTask
                        key={task?.title}
                        task={task}
                        viewTask={viewTask}
                      />
                    ))
                  ) : (
                    <p id='subHeading4'>no tasks due today!</p>
                  )}
                </DashboardCardNoScroll>
              </Col>
              <Col span={5.5}>
                <DashboardCardNoScroll
                  width='20vw'
                  height='180px'
                  color='#fafafa'
                  id='noScroll'
                >
                  <h1 id='normalHeading2'>tomorrow</h1>
                  {tomorrowTasks?.length ? (
                    tomorrowTasks?.map((task) => (
                      <SmallTask
                        key={task?.title}
                        task={task}
                        viewTask={viewTask}
                      />
                    ))
                  ) : (
                    <p id='subHeading4'>no tasks due tomorrow!</p>
                  )}
                </DashboardCardNoScroll>
              </Col>
            </Row>
            <br />
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <DashboardCardNoScroll
                  width='41vw'
                  height='180px'
                  color='#fafafa'
                  id='noScroll'
                >
                  <h1 id='normalHeading2'>deadlines approaching</h1>
                  {upcomingTasks?.length ? (
                    upcomingTasks?.map((task) => (
                      <SmallTask
                        key={task?.title}
                        task={task}
                        viewTask={viewTask}
                      />
                    ))
                  ) : (
                    <p id='subHeading4'>no upcoming deadlines!</p>
                  )}
                </DashboardCardNoScroll>
              </Col>
            </Row>
          </Col>

          <Col span={8} />
          <Col span={8} />
          <Col span={8} />
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} />
          <Col span={8} />
          <Col span={8} />
        </Row>
      </div>
    </>
  );
}
