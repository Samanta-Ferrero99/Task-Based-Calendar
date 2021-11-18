
// Import dependencies
import React, { useState } from 'react'
import { Row, Col, Form, Input, DatePicker, TimePicker, Select, Alert } from 'antd';
import { Button } from 'react-bootstrap';
import DashboardCard from "../components/dashboardCard";
import { useSelector } from 'react-redux';

import { taskStatus } from "../utils/taskStatus";
import { taskAPI } from "../api/task";
import httpService from "../services/httpService";

// Styles
const aboutUsPage = {
    padding: "40px 0px",
  };

  const rightPane = {
    marginLeft: "10px",
    paddingTop: "20px",
  };

  const hook = {
    fontSize: "2.7em",
    fontWeight: "800",
    textAlign: "left",
  };

  const contact = {
    fontSize: "2.7em",
    fontWeight: "800",
  };

  const subHook = {
    fontSize: "1.2em",
    fontWeight: "300",
    marginTop: "20px",
    textAlign: "left",
  };

  const text = {
    fontSize: "1.2em",
    fontWeight: "300",
    marginTop: "20px",
    display: "block",
  };

  const inputs = {
    display: "block",
    minWidth: "600px",
    maxWidth: "800px",
  };
  const leftPane = {
    marginLeft: "15px",
  };
  // dark green: #91a434
  // light green: #b8cd48
  const sendMessageButton = {
    marginTop: "20px",
    backgroundColor: "#b8cd48",
    border: "0px solid #b8cd48",
    marginLeft: "0px",
  };

// The user's task creation form -> ability to create a task
export default function TaskForm() {

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const { user } = useSelector((state) => state.user);

    const statusOptions = taskStatus.map((status) => {
      return <Select.Option key={status} value={status}>{status}</Select.Option>;
    });

    const paths = [
      'work', 'school', 'life'
    ];

    const pathOptions = paths.map((path) => {
      return (
        <Select.Option key={path} value={path}>
          {path}
        </Select.Option>
      );
    });

    const [form] = Form.useForm();

    const onFinish = (values) => {
      const taskObject = {
        ...values,
        'startDate': values['startDate']?.format('MM-DD-YYYY') || null,
        'dueDate': values['dueDate']?.format('MM-DD-YYYY') || null,
      };
      taskAPI.createTask(taskObject, user, setError, setSuccess);
      // if ( ) === true) {
      //   console.log("TRUE");
      //   setSuccess(true);
      //   setError(false);
      // } else {
      //   setError(true);
      //   setSuccess(false);
      // }
    };

    return (
      <>
        <Row>
          <DashboardCard width='550px' height='550px' color='#fafafa'>
            <h1
              style={{ paddingBottom: '20px', marginLeft: '20px', paddingTop: '10px' }}
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
              {
                error ? <Alert message='Could not create task' type='error' showIcon /> 
                : success ? <Alert message='Task created successfully' type='success' showIcon /> : null
              }
              <Form.Item wrapperCol={{ span: 24 }}>
                <div
                  className='d-grid gap-2'
                  style={{ paddingBottom: '10px', paddingTop: '20px' }}
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