import React from "react";
//import { UseGoogleLoginProps } from "react-google-login";
import { Navbar, Container, Nav } from "react-bootstrap";
// import Login from "../components/login";
import LogOut from "../components/logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

//const props = UseGoogleLoginProps.isSignedIn;

// const loginButton = {
//   marginTop: "30px",
//   //marginBottom: "30px",
//   height: "10x",
//   width: "90px",
//   backgroundColor: "#b8cd48",
//   border: "0px solid #b8cd48",
// };

const NavBar = props => {
  if (props.isSignedIn === true) {
    // Someone is logged in.
    return (
      <Navbar variant="light" expand="lg" style={{ marginTop: "25px" }}>
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              fontFamily: "Open Sans",
              fontWeight: "800",
              fontSize: "1.6em",
              color: "#b8cd48",
            }}
          >
            chronicle
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ border: "0px solid white" }}
          >
            <FontAwesomeIcon icon={faBars} style={{ color: "#b8cd48", alignItems: 'center' }} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              { <Nav.Link
                href="/dashboard"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400, marginTop: "30px" }}
              >
                Dashboard
              </Nav.Link> }
              <Nav.Link
                href="/calendar"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400, marginTop: "30px" }}
              >
                Calendar
              </Nav.Link>
              <Nav.Link
                href="/about-us"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400, marginTop: "30px" }}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                href="/settings"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400, marginTop: "30px" }}
              >
                Settings
              </Nav.Link>
              <Nav.Link
                href="/"
                style={{ color: "#91a434", fontSize: "15px", fontWeight: 400, marginBottom: "20px" }}
              >
                <LogOut />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    // No one is logged in.
    return (
      <Navbar variant="light" expand="lg" style={{ marginTop: "25px" }}>
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              fontFamily: "Open Sans",
              fontWeight: "800",
              fontSize: "1.6em",
              color: "#b8cd48",
            }}
          >
            chronicle
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ border: "0px solid white" }}
          >
            <FontAwesomeIcon icon={faBars} style={{ color: "#b8cd48" }} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            { <Nav className="me-auto">
              {/* <Nav.Link
                href="/dashboard"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
              >
                Dashboard
              </Nav.Link>}
              <Nav.Link
                href="/calendar"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
              >
                Calendar
              </Nav.Link> */}
              <Nav.Link
                href="/about-us"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                href="/settings"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
              >
                Settings
              </Nav.Link>
              <Nav.Link
              href="/login"
              style={{ color: "#b8cd48", fontSize: "15px", fontWeight: 600 }}
            >
              Log In
            </Nav.Link>
            </Nav>
           }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
};

export default NavBar;

// Original navigation bar function listed below:

// export default function NavBar() {
//   return (
//     <Navbar variant="light" expand="lg" style={{ marginTop: "25px" }}>
//       <Container>
//         <Navbar.Brand
//           href="/"
//           style={{
//             fontFamily: "Open Sans",
//             fontWeight: "800",
//             fontSize: "1.6em",
//             color: "#b8cd48",
//           }}
//         >
//           chronicle
//         </Navbar.Brand>
//         <Navbar.Toggle
//           aria-controls="basic-navbar-nav"
//           style={{ border: "0px solid white" }}
//         >
//           <FontAwesomeIcon icon={faBars} style={{ color: "#b8cd48" }} />
//         </Navbar.Toggle>
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {/* <Nav.Link
//               href="/dashboard"
//               style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
//             >
//               Dashboard
//             </Nav.Link> */}
//             <Nav.Link
//               href="/calendar"
//               style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
//             >
//               Calendar
//             </Nav.Link>
//             <Nav.Link
//               href="/about-us"
//               style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
//             >
//               About Us
//             </Nav.Link>
//             <Nav.Link
//               href="/settings"
//               style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
//             >
//               Settings
//             </Nav.Link>
//             <Nav.Link
//               href="/login"
//               style={{ color: "#91a434", fontSize: "15px", fontWeight: 400 }}
//             >
//               Log In
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }
