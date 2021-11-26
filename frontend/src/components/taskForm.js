// Import dependencies
import React from 'react';
import {
  Row,
  Form,
  Input,
  DatePicker,
  Select,
  Alert
} from 'antd';
import { Button } from 'react-bootstrap';
import DashboardCard from '../components/dashboardCard';

import { taskStatus } from '../utils/taskStatus';
import { taskAPI } from '../api/task';


// The user's task creation form -> ability to create a task
export default function TaskForm({user, chronicles}) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const statusOptions = taskStatus.map((status) => {
    return (
      <Select.Option key={status} value={status}>
        {status}
      </Select.Option>
    );
  });

  const chronicleOptions = chronicles?.map((ch) => {
    return (
      <Select.Option key={ch?.title} value={ch?.id}>
        {ch?.title}
      </Select.Option>
    )
  });

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const taskObject = {
      ...values,
      startDate: values['startDate']?.format('MM-DD-YYYY') || null,
      dueDate: values['dueDate']?.format('MM-DD-YYYY') || null
    };
    taskAPI.createTask(taskObject, user, setError, setSuccess);
  };

  return (
    <>
      <Row style={{ marginTop: '30px' }}>
        <DashboardCard width='550px' height='580px' color='#fafafa'>
          <h1
            style={{
              paddingBottom: '20px',
              marginLeft: '20px',
              paddingTop: '10px'
            }}
            id='normalHeading1'
          >
            create a task:
          </h1>
          <Form
            style={{ marginLeft: '20px', marginRight: '20px' }}
            name='taskForm'
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            layout='horizontal'
          >
            <Form.Item
              label='title'
              name='title'
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'tasks must have a title!'
                }
              ]}
            >
              <Input
                onChange={(e) => {
                  form.setFieldsValue({ title: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item label='description' name='description'>
              <Input.TextArea
                onChange={(e) => {
                  form.setFieldsValue({ description: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name='startDate'
              label='start date'
              rules={[
                {
                  type: 'object'
                }
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name='dueDate'
              label='due date'
              rules={[
                {
                  type: 'object'
                }
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item name='status' label='status'>
              <Select>{statusOptions}</Select>
            </Form.Item>
            <Form.Item name='chronicle' label='chronicle'>
              <Select>{chronicleOptions}</Select>
            </Form.Item>
            {error ? (
              <Alert message='could not create task' type='error' showIcon />
            ) : success ? (
              <Alert
                message='task created successfully'
                type='success'
                showIcon
              />
            ) : null}
            <Form.Item wrapperCol={{ span: 24 }}>
              <div
                className='d-grid gap-2'
                style={{ paddingBottom: '10px', paddingTop: '10px' }}
              >
                <Button variant='dark' id='button1' type='submit'>
                  submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </DashboardCard>
      </Row>
      <br />
    </>
  );
}
