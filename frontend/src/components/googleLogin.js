import React from "react";
import { GoogleLogin } from "react-google-login";
import { attemptLogin, attemptRegister } from '../store/thunks/auth';
import { useDispatch } from 'react-redux';


const clientId =
  "701049817934-2i9bdpvl02much6ldgqabiv6el46d6t9.apps.googleusercontent.com";

function Login({register}) {

  const [serverError, setServerError] = React.useState('');

  const dispatch = useDispatch();

  const onSuccessLogin = (res) => {
    const user = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    };
    dispatch(attemptLogin(user)).catch(({ response }) => {
      if (response.data.message) {
        setServerError(response.data.message);
      }
    });
  };

  const onFailureLogin = (res) => {
    console.log("Google sign in failed: ", res);
  };

  const onSuccessRegister = (res) => {
    const user = {
      username: res.profileObj.givenName,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      password2: res.profileObj.googleId
    };
    dispatch(attemptRegister(user)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
  };

  const onFailureRegister = (res) => {
    console.log("Google registration failed: ", res);
  };

  if (register === true) {
    return (
      // <Button variant="dark"  id="button2" onClick={signUp}>
      //   Sign up with Google
      // </Button>
      <GoogleLogin 
        clientId={clientId}
        buttonText="Sign up with Google"
        onSuccess={onSuccessRegister}
        onFailure={onFailureRegister}
        cookiePolicy="single_host_origin"
      />
    );
  } else {
    return (
      // <Button variant="dark" id="button2" onClick={signIn}>
      //   Sign in with Google
      // </Button>
      <GoogleLogin 
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccessLogin}
        onFailure={onFailureLogin}
        cookiePolicy="single_host_origin"
      />
    );
  }
}

export default Login;
