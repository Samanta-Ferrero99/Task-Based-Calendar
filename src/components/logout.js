import React from "react";
import { useGoogleLogout } from "react-google-login";
import { Button } from "react-bootstrap";

const clientId =
  "701049817934-2i9bdpvl02much6ldgqabiv6el46d6t9.apps.googleusercontent.com";

function Logout() {
  const onLogoutSuccess = (res) => {
    console.log("Logged out Successfully: ", res.profileObj);
    alert("Logged out Successfully ✌");
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const loginButton = {
    marginTop: "20px",
    backgroundColor: "#b8cd48",
    border: "0px solid #b8cd48",
  };

  return (
    <Button onClick={signOut} style={loginButton}>
      Log Out
    </Button>
  );
}

export default Logout;
