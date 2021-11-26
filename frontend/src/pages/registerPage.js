import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Login from "../components/googleLogin";

import {
  attemptRegister,
} from '../store/thunks/auth';

export default function RegisterPage() {

  const [serverError, setServerError] = React.useState('');
  const [createNew, setCreateNew] = React.useState(false);

  const dispatch = useDispatch();

  // const findFormErrors = () => {
  //   const { username, email, password, password2 } = user;
  //   const newErrors = {};
  //   if (!username || username === "") newErrors.username = "Username cannot be blank";
  //   if (!email || email === "") newErrors.email = "Email cannot be blank";
  //   else if (!password || password === "")
  //     newErrors.password = "Password cannot be blank";
  //   else if (!password2 || password2 === "")
  //     newErrors.password2 = "Password confirmation cannot be blank";

  //   return newErrors;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Get our new errors
  //   const newErrors = findFormErrors();
  //   // Conditional logic:
  //   if (Object.keys(newErrors).length > 0) {
  //     // We got errors!
  //     setErrors(newErrors);
  //   } else {
  //     // No errors :)
  //     handleRegister();
  //   }
  // };

  const onFinish = (values) => {
    dispatch(attemptRegister(values)).catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
          console.log(serverError);
        }
      });
  };

  const [form] = Form.useForm();

  return (
    <Container
      className='loginPage'
      id='loginPage'
      style={{ paddingLeft: '15px' }}
    >
      <Row>
        <Col className='leftPane' md='6' id='leftPane'>
          <h1 className='hook' id='cooperHeading1'>
            Sign Up Today!
          </h1>
          <h4 className='bottomNote' id='subHeading1'>
            Choose to sign up through a Google account or by creating an account with us!
          </h4>
        </Col>
      </Row>
      {createNew ? (
        <Row style={{ paddingTop: '30px' }}>
          <Col>
            <span
              className='bottomNote'
              id='subHeading1'
              style={{ fontSize: '20px' }}
            >
              Sign up with email
            </span>
            <Button
              id='closeButton'
              variant='outline-secondary'
              onClick={() => setCreateNew(false)}
              style={{ marginLeft: '150px' }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ color: '#b8cd48', alignItems: 'center' }}
              />
            </Button>

            <Form name='registerForm' form={form} onFinish={onFinish}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid email address...'
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
                label='Username'
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please enter a username...'
                  }
                ]}
              >
                <Input
                  onChange={(e) => {
                    form.setFieldsValue({ username: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please enter a strong password...'
                  }
                ]}
              >
                <Input.Password
                  onChange={(e) => {
                    form.setFieldsValue({ password: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                label='Confirm Password'
                name='password2'
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password...'
                  }
                ]}
              >
                <Input.Password
                  onChange={(e) => {
                    form.setFieldsValue({ password2: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <div className='d-grid gap-2' style={{ paddingBottom: '10px' }}>
                  <Button variant='dark' id='button1' type='submit'>
                    Create My Account
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : (
        <>
          <Row style={{ marginTop: '20px' }}>
            {/* <Button
              id="button1"
              variant="dark"
              onClick={() => setCreateNew(true)}
              style={{ width: "500px" }}
            >
              Sign up with email
            </Button> */}
            <Col md='5' style={{ width: '200px' }}>
              <Login register={true} />
            </Col>
            <Col md='5'>
              <span style={{ marginRight: '25px' }}>or</span>
              <Button
                id='button1'
                variant='dark'
                onClick={() => setCreateNew(true)}
              >
                Sign up with email
              </Button>
            </Col>
          </Row>
        </>
      )}

      {/* <Row>
        <img
          src={loginImage}
          alt="Login"
          className="registerImage"
          id="loginImage"
        />
      </Row> */}
    </Container>
  );
}