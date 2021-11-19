/* eslint-disable react-hooks/exhaustive-deps */
// Import dependencies
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {Button as AntButton, Tooltip} from "antd";
import { Row, Col, Modal } from "antd";
import { useSelector } from 'react-redux';
import getRandomQuote from "../utils/getRandomQuote";
import { taskAPI } from '../api/task';
import {PlusSquareFilled} from "@ant-design/icons"

// Import components
import ChronicleDisplay from "../components/chronicleDisplay";
import SmallTask from "../components/smallTask";
import TaskForm from "../components/taskForm";
import ChronicleForm from "../components/chronicleForm"
import ProjectSidePanel from "../components/projectSidePanel";
import TaskSearch from "../components/taskSearch";
import DashboardCard from "../components/dashboardCard";
import DashboardCardNoScroll from '../components/noScrollDashboardCard';
import DashboardCalendar from "../components/calendar";

// The user's dashboard page -> overview of all tasks/projects
export default function DashboardPage() {

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
  }, []);

  React.useEffect(() => {
    console.log(tasks);
    setTodayTasks(getTodayTasks());
    setTomorrowTasks(getTomorrowTasks());
    setUpcomingTasks(getUpcomingTasks());
  }, [tasks]);

  const getTodayTasks = () => {
    const today = [];
    const td = new Date();
    for (let task of tasks) {
      console.log(task);
      if (task?.dueDate) {
        const taskDate = new Date(task?.dueDate);
        console.log(taskDate);
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
    const td = new Date();
    td.setDate(td.getDate() + 1);
    for (let task of tasks) {
      if (task?.dueDate) {
        const taskDate = new Date(task?.dueDate);
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
    const min = new Date();
    const max = new Date();
    min.setDate(min.getDate() + 2);
    max.setDate(max.getDate() + 7);
    for (let task of tasks) {
      if (task?.dueDate) {
        const taskDate = new Date(task?.dueDate);
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
  
  // Render the page
  return (
    <>
      {/* <ProjectSidePanel /> */}

      <div
        className='dashboard'
        id='dashboard'
        style={{ paddingLeft: '9vw', paddingTop: '5vh' }}
      >
        <Row
          style={{
            paddingBottom: '20px',
            float: 'right',
            position: 'relative',
            right: '85px',
            top: '-30px'
          }}
        >
          <TaskSearch  />
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
        </Row>
        <Row style={{ marginTop: '30px' }}>
          <DashboardCard width='85vw' height='280px' color='#fafafa'>
            <h1 id='normalHeading1'>good morning, {user.username} !</h1>
            <p>
              welcome to your dashboard! this page shows the summary of all of the chronicles you have created!
              you can see your created chronicles, chronicles that you have set for today and tomorrow, as well as 
              any deadlines that are fast approaching.
              <br /><br />
              want to create a task? click the + icon next to the search bar!
            </p>
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
                    key={ch?.title}
                    chronicle={ch}
                    isLoading={false}
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
                      <SmallTask key={task?.title} task={task} />
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
                      <SmallTask key={task?.title} task={task} />
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
                      <SmallTask key={task?.title} task={task} />
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
        {/* <Row>
          <Col className="leftPane" md="6" id="leftPane">
            <h1 className="hook" id="cooperHeading1">
              Welcome aboard!
            </h1>
            <h4 className="bottomNote" id="subHeading1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              interdum non nunc eu accumsan. Nullam sagittis vehicula leo, in
              commodo justo feugiat vel.
            </h4>
          </Col>
        </Row>
        <Row className="login" id="login">
          <Col>
            <h4
              className="alreadyJoined"
              id="subHeading1"
              style={{ paddingTop: "20px" }}
            >
              Learn the ins and outs of using chronicle with our new-user
              walkthrough
            </h4>
          </Col>
        </Row> */}

        {/* <Row>
          <img
            src={loginImage}
            alt="Login"
            className="registerImage"
            id="loginImage"
          />
        </Row> */}
      </div>
    </>
  );
}
