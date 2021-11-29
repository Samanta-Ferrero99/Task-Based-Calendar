// Import dependencies
import React from 'react';
import { Row, Form, Input, DatePicker, Rate, Select, Alert, Modal } from 'antd';
import { CirclePicker } from 'react-color';
import { Button } from 'react-bootstrap';
import DashboardCard from '../components/dashboardCard';

import { taskStatus } from '../utils/taskStatus';
import { taskAPI } from '../api/task';

// The user's task creation form -> ability to create a task
export default function EditChronicle({chronicle, user}) {

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [openColor, setOpenColor] = React.useState(false);
  const [color, setColor] = React.useState('');

  const statusOptions = taskStatus.map((status) => {
    return (
      <Select.Option key={status} value={status}>
        {status}
      </Select.Option>
    );
  });

  const paths = ['work', 'school', 'life'];

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
      _id: chronicle._id,
      type: values['type'] || chronicle.type,
      description: values['description'] || chronicle.description,
      dueDate: values['dueDate']?.format('MM-DD-YYYY') || chronicle.dueDate,
      color: color.hex || chronicle.color,
      status: values['status'] || chronicle.status,
      priority: values['priority'] || chronicle.priority,
    };
    console.log(chronicleObject);
    taskAPI.editChronicle(chronicleObject, user, setError, setSuccess);
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
            edit {chronicle?.title}
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
                style={{ position: 'absolute', left: '185px', top: '0px' }}
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
                <CirclePicker
                  onChangeComplete={(color) => setColor(color)}
                  color={color}
                />
              </Modal>
              <Button
                variant='dark'
                id='button1'
                type='submit'
                style={{ position: 'absolute', left: '297px', top: '0px' }}
              >
                submit
              </Button>
            </Form.Item>
            {error ? (
              <Alert
                message='could not edit chronicle'
                type='error'
                showIcon
              />
            ) : success ? (
              <Alert
                message='chronicle edited successfully'
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
