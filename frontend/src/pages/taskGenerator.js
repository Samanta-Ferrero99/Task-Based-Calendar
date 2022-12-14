
// Import dependencies
import React from 'react'
import { Row, Form, Input, DatePicker, Modal, Select, Rate, Alert } from 'antd';
import {CirclePicker} from "react-color";
import { Button } from 'react-bootstrap';
import DashboardCard from "../components/dashboardCard";
import { useSelector } from 'react-redux';

import { taskStatus } from "../utils/taskStatus";
import { taskAPI } from "../api/task";


// The user's task creation form -> ability to create a task
export default function TaskForm() {

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [openColor, setOpenColor] = React.useState(false);
  const [color, setColor] = React.useState("");

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
      const chronicleObject = {
        ...values,
        'dueDate': values['dueDate']?.format('MM-DD-YYYY') || null,
        'color': color.hex,
      };
      console.log(chronicleObject);
      taskAPI.createChronicle(chronicleObject, user, setError, setSuccess);
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
          <DashboardCard width='550px' height='580px' color='#fafafa'>
            <h1
              style={{
                paddingBottom: '20px',
                marginLeft: '20px',
                paddingTop: '10px'
              }}
              id='normalHeading1'
            >
              begin a new chronicle
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
              <Form.Item name='type' label='type'>
                <Select>{pathOptions}</Select>
              </Form.Item>
              <Form.Item
                label='title'
                name='title'
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'chronicle must have a title!'
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
              <Form.Item name='priority' label='priority'>
                <Rate />
              </Form.Item>
              <Form.Item name='status' label='status'>
                <Select>{statusOptions}</Select>
              </Form.Item>

              <Form.Item>
                <Button
                  variant='dark'
                  id='colorPicker'
                  style={{ position: 'absolute', left: '265px', top: '0px' }}
                  onClick={() => setOpenColor(true)}
                >
                  set color
                </Button>
                <Modal
                  centered
                  width={325}
                  visible={openColor}
                  onOk={() => setOpenColor(false)}
                  onCancel={() => setOpenColor(false)}
                >
                  <CirclePicker onChangeComplete={(color) => setColor(color)} color={color} />
                </Modal>
                <Button
                  variant='dark'
                  id='button1'
                  type='submit'
                  style={{ position: 'absolute', left: '375px', top: '0px' }}
                >
                  submit
                </Button>
              </Form.Item>
              {error ? (
                <Alert message='could not create chronicle' type='error' showIcon />
              ) : success ? (
                <Alert
                  message='chronicle created successfully'
                  type='success'
                  showIcon
                />
              ) : null}
            </Form>
          </DashboardCard>
        </Row>
        <br />
      </>
    );
}