
// Import dependencies
import React, { useState } from 'react'
import { Row, Col, Form, Input, DatePicker, TimePicker, Select } from 'antd';
import { Button } from 'react-bootstrap';
import DashboardCard from "../components/dashboardCard";
import { useSelector } from 'react-redux';

import {taskStatus} from "../utils/taskStatus";

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

// The user's task creation page -> ability to create a task
export default function TaskGeneratorPage() {

  const { user } = useSelector((state) => state.user);

    const statusOptions = taskStatus.map((status) => {
      return <Select.Option key={status} value={status}>{status}</Select.Option>;
    });

    // const options = [
    //     'work', 'class', 'life'
    //   ];

    const [form] = Form.useForm();

    const onFinish = (values) => {
      const taskObject = {
        ...values,
        'startDate': values['startDate'].format('MM-DD-YYYY'),
        'dueDate': values['dueDate'].format('MM-DD-YYYY'),
      };
      console.log(taskObject);
    };

    return (
      <>
        <Row>
          <DashboardCard width='85vw' height='800px' color='#fafafa'>
            <br />
            <h1 id='normalHeading1'>create a task:</h1>
            <p id='subHeading2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              interdum non nunc eu accumsan. Nullam sagittis vehicula leo, in
              commodo justo feugiat vel.
            </p>
            <Form name='taskForm' form={form} onFinish={onFinish}>
              <Form.Item
                label='title'
                name='title'
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
                <Input
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
              <Form.Item
                name='status'
                label='status'
              >
                <Select>
                  {statusOptions}
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <div className='d-grid gap-2' style={{ paddingBottom: '10px' }}>
                  <Button variant='dark' id='button1' type='submit'>
                    create task
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