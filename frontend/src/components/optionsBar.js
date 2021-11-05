import React from "react";
import {Drawer, Button} from "antd";
import { animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

import useBoop from "../hooks/useBoop";
import "./optionsBar.css";

// purple: #a19ab5
// orange: #df7538
// dark purple: #675065
// deep purple: #5c3350
// off white: #fafafa
const OptionsBar = (props) => {
  const [style, trigger] = useBoop({x: 1});
  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const sideBarButtonStyle = visible
    ? {
        position: "absolute",
        left: "255px",
        top: "90vh",
      }
    : {
        position: "absolute",
        left: "-5px",
        top: "90vh",
      };

  const drawerIcon = visible ? solid("caret-left") : solid("caret-right");
  
  return (
    <>
      <Button onClick={visible? onClose : showDrawer} size="large" style={sideBarButtonStyle}>
        <animated.span style={style} onMouseEnter={trigger}>
          Tools
          <FontAwesomeIcon
            icon={drawerIcon}
            style={{
              fontSize: "1.5em",
              top: "-10px",
              color: "#ffffff",
            }}
          />
        </animated.span>
      </Button>

      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={onClose}
        visible={visible}
        mask={false}
        closable={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default OptionsBar;
