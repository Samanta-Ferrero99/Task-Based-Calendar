/* eslint-disable react-hooks/exhaustive-deps */
// Import dependencies
import React from 'react';
import { useHistory } from 'react-router';
import { Button as AntButton, Tooltip, Progress } from 'antd';
import { Row, Col, Modal } from 'antd';
import { taskAPI } from '../api/task';
import { PlusSquareFilled } from '@ant-design/icons';

// Import components
import MiddleTask from '../components/middleTask';
import ChronicleTaskForm from '../components/chronicleTaskForm';
import EditChronicleForm from '../components/editChronicleForm';
import DashboardCard from '../components/dashboardCard';
import DashboardCardNoScroll from '../components/noScrollDashboardCard';

// The user's dashboard page -> overview of all tasks/projects
export default function ViewChroniclePage() {
  const [showEdit, setShowEdit] = React.useState(false);
  const [addTask, setAddTask] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
    const history = useHistory();
    const data = history.location.state.data;
    const user = data.user;
    const chronicle = data.chronicle;
    console.log(chronicle);

    React.useEffect(() => {
      taskAPI.getTaskByChronicle(user, chronicle._id, setTasks);
    }, []);

    const getPercentage = () => {
      const numTasks = tasks.length;
      let completeTasks = 0;
      for (let task of tasks) {
        if (task.status && task.status === 'complete') {
          completeTasks++;
        }
      }
      return Math.floor((completeTasks / numTasks) * 100);
    }

    let percent = getPercentage();

    const viewTask = (task) => {
      history.push('/view-task', { data: { task, user } });
    };

    console.log(tasks);
  // Render the page
  return (
    <>
      {/* <ProjectSidePanel /> */}

      <div className='dashboard' id='dashboard' style={{ paddingLeft: '8vw' }}>
        <Row style={{ marginTop: '35px', marginRight: '80px' }}>
          <DashboardCard
            width='100vw'
            height='100px'
            color={chronicle?.color || '#ffffff'}
          >
            <p style={{ display: 'inline-block' }} id='normalHeading1'>
              {chronicle.title}
            </p>
            <Tooltip title='edit chronicle'>
              <AntButton
                style={{
                  display: 'inline-block',
                  float: 'right',
                  marginTop: '8px',
                  right: '-5px'
                }}
                icon={<PlusSquareFilled />}
                onClick={() => setShowEdit(true)}
              />
            </Tooltip>
            <Tooltip title='add new task to chronicle'>
              <AntButton
                style={{
                  display: 'inline-block',
                  float: 'right',
                  marginTop: '8px'
                }}
                icon={<PlusSquareFilled />}
                onClick={() => setAddTask(true)}
              />
            </Tooltip>
          </DashboardCard>
        </Row>
        <Modal
          visible={showEdit}
          onCancel={() => setShowEdit(false)}
          onOk={() => history.push('/dashboard')}
        >
          <EditChronicleForm user={user} chronicle={chronicle} />
        </Modal>
        <Modal
          visible={addTask}
          onCancel={() => setAddTask(false)}
          onOk={() => history.push('/dashboard')}
        >
          <ChronicleTaskForm user={user} chronicle={chronicle} />
        </Modal>
        <br />
        <Row gutter={[24, 24]}>
          <Col span={11.5}>
            <Row>
              <DashboardCardNoScroll
                width='300px'
                height='220px'
                color='#fafafa'
                id='noScroll'
              >
                {chronicle?.description?.length ? (
                  <p id='subHeading2'>{chronicle?.description}</p>
                ) : null}
                <p id='subHeading2'>type: {chronicle?.type}</p>
                {chronicle?.dueDate?.length ? (
                  <p id='subHeading2'>
                    due on{' '}
                    {new Date(chronicle?.dueDate).toDateString().toLowerCase()}
                  </p>
                ) : null}
                <p id='subHeading2'>
                  created on{' '}
                  {new Date(chronicle?.createdDate)
                    .toDateString()
                    .toLowerCase()}
                </p>
              </DashboardCardNoScroll>
            </Row>
            <Row style={{ marginTop: '30px' }}>
              <Col span={11.5}>
                <DashboardCardNoScroll
                  width='300px'
                  height='250px'
                  color='#fafafa'
                  id='noScroll'
                >
                  <Progress
                    style={{ marginLeft: '68px', marginTop: '20px' }}
                    type='circle'
                    strokeColor={{
                      '0%': '#b8cd48',
                      '100%': chronicle?.color || '#87d068'
                    }}
                    percent={percent}
                  />
                  <h1
                    style={{ marginLeft: '68px', marginTop: '20px' }}
                    id='normalHeading2'
                  >
                    progress
                  </h1>
                </DashboardCardNoScroll>
              </Col>
            </Row>
          </Col>
          <Col>
            <DashboardCardNoScroll
              width='calc(95vw - 450px)'
              height='500px'
              color='#fafafa'
              id='noScroll'
            >
              <h1 id='normalHeading2'>tasks</h1>
              {tasks?.length ? (
                tasks?.map((task) => (
                  <MiddleTask
                    viewTask={viewTask}
                    width={'calc(95vw - 500px)'}
                    key={task?.title}
                    task={task}
                  />
                ))
              ) : (
                <p id='subHeading4'>this chronicle has no tasks</p>
              )}
            </DashboardCardNoScroll>
          </Col>
        </Row>
      </div>
    </>
  );
}
