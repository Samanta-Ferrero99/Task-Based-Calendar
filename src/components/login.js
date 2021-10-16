import React from "react";
import { useGoogleLogin } from "react-google-login";
import { Button } from 'react-bootstrap'
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "701049817934-2i9bdpvl02much6ldgqabiv6el46d6t9.apps.googleusercontent.com";

function Login() {
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    // alert(
    //   `Logged in successfully, welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢`
    );
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

  const loginButton = {
    marginTop: "20px",
    backgroundColor: "#b8cd48",
    border: "0px solid #b8cd48",
  };

  return (
    <Button
      onClick={signIn}
      style={loginButton}

    >
      Log In
    </Button>
  );
}

export default Login;
