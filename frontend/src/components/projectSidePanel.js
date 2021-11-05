import React from "react";
import { Drawer, Button } from "antd";
import { animated } from "react-spring";

import useBoop from "../hooks/useBoop";

import LogOut from "../components/logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

// purple: #a19ab5
// orange: #df7538
// dark purple: #675065
// deep purple: #5c3350
// off white: #fafafa
const ProjectSidePanel = (props) => {
  const [style, trigger] = useBoop({ x: 1 });
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
        left: "calc(87.5vw - 258px)",
      }
    : {
        position: "absolute",
        left: "87.5vw",
      };

  const drawerIcon = visible ? solid("caret-right") : solid("caret-left");

  return (
    <>
      <Button
        onClick={visible ? onClose : showDrawer}
        size="large"
        style={sideBarButtonStyle}
      >
        <animated.span style={style} onMouseEnter={trigger}>
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
        placement="right"
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

export default ProjectSidePanel;
