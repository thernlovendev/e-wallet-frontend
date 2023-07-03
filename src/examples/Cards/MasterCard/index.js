// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { Grid, Menu, MenuItem } from "@mui/material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import curved14 from "assets/images/curved-images/curved14.jpg";
import visaLogo from "assets/images/logos/visa.png"
import payzenLogo from "assets/logoP.png";
import { useState } from "react";
import { useSoftUIController } from "context";
import { cancelCard } from "apis/request";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";

function MasterCard({ color, number, holder, expires, id }) {
  const numbers = [...`${number}`];
  const [menu, setMenu] = useState(null);
  const [controller, dispatch] = useSoftUIController();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  if (numbers.length < 16 || numbers.length > 16) {
    throw new Error(
      "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
    );
  }

  const handleCancelLost = () => {
    cancelCard(id, controller.user.id, "lost").then(user => {
      setUser(dispatch, user)
      SweetAlert("success", "All good", "Card cancelation requested send");
      closeMenu();
    }).catch(error => {
      if(error === 404){
        SweetAlert("warning", "Ooops", "Something went wrong");
        closeMenu();
      }
    })
  }

  const handleCancelRob = () => {
    cancelCard(id, controller.user.id, "stolen").then(user => {
      setUser(dispatch, user)
      SweetAlert("success", "All good", "Card cancelation requested send");
      closeMenu();
    }).catch(error => {
      if(error === 404){
        SweetAlert("warning", "Ooops", "Something went wrong");
        closeMenu();
      }
    })
  }

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
      <MenuItem onClick={handleCancelLost} className="text-danger">
        Cancel Card for lost
      </MenuItem>
      <MenuItem onClick={handleCancelRob} className="text-danger">
        Cancel Card for rob
      </MenuItem>
    </Menu>
  );

  const num1 = numbers.slice(0, 4).join("");
  const num2 = numbers.slice(4, 8).join("");
  const num3 = numbers.slice(8, 12).join("");
  const num4 = numbers.slice(12, 16).join("");

  return (
    <Card
      sx={({
        palette: { gradients },
        functions: { linearGradient, rgba },
        boxShadows: { xl },
      }) => ({
        background: gradients[color]
          ? `${linearGradient(
              rgba(gradients[color].main, 0.8),
              rgba(gradients[color].state, 0.8)
            )}, url(${curved14})`
          : `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
            )}, url(${curved14})`,
        boxShadow: xl,
      })}
    >
      <SoftBox p={2}>
        <SoftBox color="white" p={1} lineHeight={0} display="inline-block">
          <Icon fontSize="default">wifi</Icon>
        </SoftBox>
        <SoftTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 5, pb: 1 }}>
          {num1}&nbsp;&nbsp;&nbsp;{num2}&nbsp;&nbsp;&nbsp;{num3}&nbsp;&nbsp;&nbsp;{num4}
        </SoftTypography>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          <SoftBox display="flex" alignItems="center">
            <SoftBox mr={3} lineHeight={1}>
              <SoftTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Card Holder
              </SoftTypography>
              <SoftTypography
                variant="h6"
                color="white"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {holder}
              </SoftTypography>
            </SoftBox>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Expires
              </SoftTypography>
              <SoftTypography variant="h6" color="white" fontWeight="medium">
                {expires}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" justifyContent="flex-end" width="20%">
            <SoftBox component="img" src={payzenLogo} alt="master card" width="80%" mt={1} />
          </SoftBox>
          <SoftBox display="flex" justifyContent="flex-end" width="20%">
            <SoftBox component="img" src={visaLogo} alt="master card" width="60%" mt={1} />
          </SoftBox>
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
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of MasterCard
MasterCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the MasterCard
MasterCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  number: PropTypes.number.isRequired,
  holder: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
};

export default MasterCard;
