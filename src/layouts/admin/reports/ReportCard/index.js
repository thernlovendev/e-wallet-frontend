import { useState } from "react";
// @mui material components
import { Menu, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import PropTypes from "prop-types";

function ReportCard({ bgColor, title, subTitle, count, icon }) {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another Action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else here</MenuItem>
    </Menu>
  );
  return (
    <Card>
      <SoftBox bgColor={bgColor} variant="gradient">
        <SoftBox p={2}>
          <SoftBox display="flex" justifyContent="space-between">
            <SoftBox
              variant="gradient"
              bgColor={bgColor === "white" ? icon.color : "white"}
              color={bgColor === "white" ? "white" : "dark"}
              width="3rem"
              height="3rem"
              borderRadius="md"
              display="flex"
              justifyContent="center"
              alignItems="center"
              shadow="md"
            >
              <Icon fontSize="small" color="inherit">
                {icon.component}
              </Icon>
            </SoftBox>
            <SoftBox display="flex" color="text" justifyContent="center">
              <Icon
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                fontSize="medium"
                onClick={openMenu}
              >
                more_vert
              </Icon>
              {renderMenu}
            </SoftBox>
          </SoftBox>
          <SoftBox pt={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography
                component="h5"
                color={bgColor === "white" ? "text" : "white"}
                textTransform="capitalize"
                fontWeight={title.fontWeight}
              >
                {title.text}
              </SoftTypography>
            </SoftBox>
            <SoftBox lineHeight={1} display="flex" justifyContent="space-between">
              <SoftTypography
                component="h6"
                color={bgColor === "white" ? "text" : "white"}
                textTransform="capitalize"
                fontWeight={subTitle.fontWeight}
              >
                {subTitle.text}
              </SoftTypography>
              <SoftTypography
                component="h6"
                color={bgColor === "white" ? "text" : "white"}
                textTransform="capitalize"
                fontWeight={count.fontWeight}
              >
                {count.text}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of ReportCard
ReportCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the ReportCard
ReportCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  subTitle: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
};

export default ReportCard;