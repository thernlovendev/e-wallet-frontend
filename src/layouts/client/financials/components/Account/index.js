import { useState } from "react";
// @mui material components
import { Grid, Menu, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";
import Transaction from "layouts/client/billing/components/Transaction";

// Billing page components
import PropTypes from "prop-types";
import burceMars from "assets/img/ar.png";
import gbImg from "assets/img/gb96.png"
import usImg from "assets/img/us.png"
import eurImg from "assets/img/euro.png"

function CountryTransactions({ bgColor, title, icon}) {
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
      <MenuItem onClick={closeMenu} className="text-info">
        Freeze Account
      </MenuItem>
      <MenuItem onClick={closeMenu} className="text-danger">
        Close Account
      </MenuItem>
    </Menu>
  );
  return (
    <Card>
      <SoftBox bgColor={bgColor} variant="gradient">
        <SoftBox p={2}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <SoftAvatar
                src={icon === "GBP" ? gbImg : icon === "USD" ? usImg : icon === "EUR" ? eurImg : <></>}
                alt="profile-image"
                variant="rounded"
                size="lg"
                shadow="sm"
              />
            </Grid>
            <Grid item xs={8}>
              <SoftBox ml={2} lineHeight={1}>
                <SoftTypography
                  component="h5"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={2}>
              <SoftBox display="flex" color="text" justifyContent="center">
                <Icon
                  sx={{ cursor: "pointer", fontWeight: "bold" }}
                  fontSize="medium"
                  onClick={openMenu}
                >
                  more_vert
                </Icon>
              </SoftBox>
              {renderMenu}
            </Grid>
          </Grid>
{/*          <SoftBox pt={3} pb={2}>
            <SoftBox mb={2}>
              <SoftTypography
                variant="caption"
                color="text"
                fontWeight="bold"
                textTransform="uppercase"
              >
                newest
              </SoftTypography>
            </SoftBox>
            <SoftBox
              component="ul"
              display="flex"
              flexDirection="column"
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
            >
              <Transaction
                color="error"
                icon="arrow_downward"
                name="Netflix"
                description="27 March 2020, at 12:30 PM"
                value="- $ 2,500"
              />
              <Transaction
                color="success"
                icon="arrow_upward"
                name="Apple"
                description="27 March 2020, at 04:30 AM"
                value="+ $ 2,000"
              />
            </SoftBox>
          </SoftBox>*/}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of CountryTransactions
CountryTransactions.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the CountryTransactions
CountryTransactions.propTypes = {
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
  icon: PropTypes.string.isRequired,
/*  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,*/
};

export default CountryTransactions;
