import React from "react";
import { useGoogleLogin } from "react-google-login";
import { Button } from 'react-bootstrap'
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "701049817934-2i9bdpvl02much6ldgqabiv6el46d6t9.apps.googleusercontent.com";

function Login(register, setGoogleError, setUser, setAuthComplete) {
  const onSuccess = (res) => {
    console.log("Google Login Success: ", res.profileObj);
    const googleUser = {
      email: res.profileObj.email, 
      password: res.profileObj.googleId
    };
    setUser(googleUser);
    setAuthComplete(true);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Google Login failed: ", res);
    setGoogleError(true);
  };

  const onSuccessRegister = (res) => {
    console.log("Google Login Success: ", res.profileObj);
    const googleUser = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    };
    setUser(googleUser);
    setAuthComplete(true);
    refreshTokenSetup(res);
  };

  const onFailureRegister = (res) => {
    console.log("Google Login failed: ", res);
    setGoogleError(true);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  const { signUp } = useGoogleLogin({
    onSuccessRegister,
    onFailureRegister,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <>
      {register ? (
        <Button 
          variant="dark"
          id="button2" 
          onClick={signUp}>
          Sign up with Google
        </Button>
      ) : (
        <Button 
          variant="dark"
          id="button2" 
          onClick={signIn}>
          Sign in with Google
        </Button>
      )}
    </>
  );
}

export default Login;
