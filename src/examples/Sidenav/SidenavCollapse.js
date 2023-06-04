// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Soft UI Dashboard React context
import { useSoftUIController, setCollapseKey } from "context";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function SidenavCollapse({
  color,
  icon,
  name,
  children,
  active,
  collapse,
  open,
  keyname: key,
  sub,
  setCollapse,
  ...rest
}) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav, collapseKey } = controller;
  return (
    <>
      <ListItem component="li" onClick={setCollapse}>
        <SoftBox {...rest} sx={(theme) => collapseItem(theme, { active, transparentSidenav })}>
          {!sub && (
            <ListItemIcon
              sx={(theme) => collapseIconBox(theme, { active: true, transparentSidenav, color })}
            >
              {typeof icon === "string" ? (
                <Icon sx={(theme) => collapseIcon(theme, { active: true })}>{icon}</Icon>
              ) : (
                icon
              )}
            </ListItemIcon>
          )}
          <ListItemText
            primary={name}
            sx={(theme) => collapseText(theme, { miniSidenav, transparentSidenav, active })}
          />
          {collapse && (active ? <ExpandLess /> : <ExpandMore />)}
        </SoftBox>
      </ListItem>
      {collapse && (
        <Collapse in={active} unmountOnExit>
          <List className="" disablePadding>
            {collapse.map(({ collapse, key, icon, name, route }) => {
              if (collapse)
                return (
                  <SidenavCollapse
                    color={color}
                    key={key}
                    keyname={key}
                    name={name}
                    icon={icon}
                    sub={true}
                    active={collapseKey.includes(key)}
                    setCollapse={() => {
                      console.log("set", [...collapseKey, key]);
                      setCollapseKey(
                        dispatch,
                        !collapseKey.includes(key)
                          ? [...collapseKey, key]
                          : collapseKey.filter((i) => i !== key)
                      );
                    }}
                    collapse={collapse}
                  ></SidenavCollapse>
                );
              return (
                <ListItem components="li" key={key}>
                  <SoftBox
                    sx={(theme) => collapseItem(theme, { active, transparentSidenav })}
                    className="sidenav-sub-collapse"
                  >
                    <Link to={route}>
                      <ListItemText
                        primary={name}
                        style={{ paddingLeft: "1rem" }}
                        sx={(theme) =>
                          collapseText(theme, {
                            miniSidenav,
                            transparentSidenav,
                            active: window.location.pathname.includes(key),
                          })
                        }
                      />
                    </Link>
                  </SoftBox>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  color: "info",
  active: false,
  collapse: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  collapse: PropTypes.any,
  open: PropTypes.bool,
  setCollapse: PropTypes.func,
  keyname: PropTypes.string,
  sub: PropTypes.bool,
};

export default SidenavCollapse;
