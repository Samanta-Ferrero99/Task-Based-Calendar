import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Input } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { attemptLogin } from '../store/thunks/auth';
import { useDispatch } from 'react-redux';


import Login from "./googleLogin";

/**
 * Modal for user Login
 */
export default function LoginForm(props) {
  const [serverError, setServerError] = React.useState("");

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(attemptLogin(values)).catch(({ response }) => {
      if (response.data.message) {
        setServerError(response.data.message);
        console.log(serverError);
      }
    });
  }

  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body>
        <Button
          id='closeButton'
          variant='outline-secondary'
          onClick={props.onHide}
          style={{ float: 'right' }}
        >
          <FontAwesomeIcon
            icon={faTimes}
            style={{ color: '#b8cd48', alignItems: 'center' }}
          />
        </Button>
        <h4
          id='subHeading1'
          style={{
            paddingTop: '30px',
            paddingBottom: '25px',
            fontWeight: '300'
          }}
        >
          Welcome back, friend!
        </h4>
        <Form name='loginForm' form={form} onFinish={onFinish}>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please enter your email address!'
              }
            ]}
          >
            <Input
              onChange={(e) => {
                form.setFieldsValue({ email: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please enter your password!'
              }
            ]}
          >
            <Input.Password
              onChange={(e) => {
                form.setFieldsValue({ password: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className='d-grid gap-2' style={{ paddingBottom: '10px' }}>
              <Button variant='dark' id='button1' type='submit'>
                Log in
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div className='d-grid gap-2'>
          <Login register={false} />
        </div>
      </Modal.Body>
    </Modal>
  );
}


