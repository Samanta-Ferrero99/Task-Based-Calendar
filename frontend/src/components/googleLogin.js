import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";
import AuthService from "../services/authService";
import EventBus from "../utils/eventBus";

const clientId =
  "701049817934-2i9bdpvl02much6ldgqabiv6el46d6t9.apps.googleusercontent.com";

function Login({register}) {
  const history = useHistory();
  const onSuccessLogin = (res) => {
    const user = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    };
    AuthService.login(user).then(
      (response) => {
        console.log(`Successful login for user ${user.email}`);
        EventBus.dispatch("login");
        return history.push("/dashboard");
      },
      (error) => {
        console.log("Error while signing in with Google");
      }
    );
    refreshTokenSetup(res);
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
    AuthService.register(user).then(
      (response) => {
        console.log(`Successful registration for user ${user.email}`);
        const loginUser = {
          email: user.email,
          password: user.password,
        };
        AuthService.login(loginUser).then(
          (res) => {
            console.log(`Successful login for user ${user.email}`);
            EventBus.dispatch("login");
          },
          (err) => {
            console.log("error");
          }
        );
        return history.push("/welcome");
      },
      (error) => {
        const loginUser = {
          email: user.email,
          password: user.password,
        };
        AuthService.login(loginUser).then(
          (res) => {
            console.log(`Successful login for user ${user.email}`);
            EventBus.dispatch("login");
          },
          (err) => {
            console.log("error");
          }
        );
        return history.push("/dashboard");
      }
    );
    refreshTokenSetup(res);
  };

  const onFailureRegister = (res) => {
    console.log("Google registration failed: ", res);
  };

  // const {signIn} = useGoogleLogin({
  //   onSuccessLogin,
  //   onFailureLogin,
  //   clientId,
  //   isSignedIn: true,
  //   theme: "dark",
  //   // responseType: 'code',
  //   // prompt: 'consent',
  // });

  // const { signUp } = useGoogleLogin({
  //   onSuccessRegister,
  //   onFailureRegister,
  //   clientId,
  //   isSignedIn: true,
  //   accessType: "offline",
  //   theme: "dark",
  //   responseType: 'code',
  //   prompt: 'consent',
  // });

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
