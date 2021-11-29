/* eslint-disable react-hooks/exhaustive-deps */
// Import dependencies
import React from 'react';
import { useHistory } from 'react-router';
import { Button as AntButton, Tooltip } from 'antd';
import { Row, Col, Modal } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

// Import components
import EditTaskForm from '../components/editTaskForm';
import DashboardCard from '../components/dashboardCard';

// The user's dashboard page -> overview of all tasks/projects
export default function ViewTaskPage() {
  const [showEdit, setShowEdit] = React.useState(false);
  const history = useHistory();
  const data = history.location.state.data;
  const user = data.user;
  const task = data.task;

  // Render the page
  return (
    <>
      <div className='dashboard' id='dashboard' style={{ paddingLeft: '8vw' }}>
        <Row style={{ marginTop: '35px', marginRight: '80px' }}>
          <DashboardCard width='100vw' height='100px' color='#ffffff'>
            <p style={{ display: 'inline-block' }} id='normalHeading1'>
              {task.title}
            </p>
            <Tooltip title='edit task'>
              <AntButton
                style={{
                  display: 'inline-block',
                  float: 'right',
                  marginTop: '8px'
                }}
                icon={<PlusSquareFilled />}
                onClick={() => setShowEdit(true)}
              />
            </Tooltip>
          </DashboardCard>
        </Row>
        <Modal
          visible={showEdit}
          onCancel={() => setShowEdit(false)}
          onOk={() => history.push('/dashboard')}
        >
          <EditTaskForm user={user} task={task} />
        </Modal>
        <br />
        <Row gutter={[24, 24]}>
          <Col span={11.5}>
            <Row style={{ marginRight: '80px' }}>
              <DashboardCard width='100vw' height='250px' color='#fafafa'>
                {task?.description?.length ? (
                  <p id='subHeading2'>{task?.description}</p>
                ) : (
                  <p id='subHeading2'>no description</p>
                )}
                <p id='subHeading2'>status: {task?.status}</p>
                {task?.startDate?.length ? (
                  <p id='subHeading2'>
                    start on{' '}
                    {new Date(task?.startDate).toDateString().toLowerCase()}
                  </p>
                ) : null}
                {task?.dueDate?.length ? (
                  <p id='subHeading2'>
                    due on{' '}
                    {new Date(task?.dueDate).toDateString().toLowerCase()}
                  </p>
                ) : null}
                <p id='subHeading2'>
                  created on{' '}
                  {new Date(task?.createdDate).toDateString().toLowerCase()}
                </p>
              </DashboardCard>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
