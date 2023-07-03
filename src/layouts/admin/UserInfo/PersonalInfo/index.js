// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { AppBar, Card, MenuItem, Switch } from "@mui/material";
import { Article, Delete, RocketLaunch, Tune, Widgets } from "@mui/icons-material";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import burceMars from "assets/img/ar.png";
import BasicInfo from "./BasicInfo";
import ChangePassword from "./ChangePassword";

import DeleteAccount from "./DeleteAccount";
import { useEffect, useState } from "react";
import ProfileVerification from "./ProfileVerification";
import StepsToActivate from "./stepsToActivate";
import TwoFactorAuth from "./TwoFactorAuth";
import { activateWallet } from "apis/request";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";
import { useParams } from "react-router-dom";
import { getDataUser } from "apis/request";
import AllUserTransactions from "../AllUserTransactions";

function PersonalInfo() {
  const {id} = useParams();
  const [user, setUser] = useState({
    address : {
      city: "",
      line1: "",
      state: "",
      postal_code: ""
    },
    id: "",
    name: "",
    lastName: "",
    phone: "",
    dob: {
      year: "",
      month: "",
      day: ""
    },
    email: "",
    country: "",
    transactions: [],
  })

  const [checked, setChecked] = useState(false);

  // const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  useEffect(() => {
    console.log(id)
    getDataUser(id).then(async (user) => {
      await setUser(user)
    }).catch(error => {console.log(error)})
    async function x () {
    }
    x()
  }, [id])

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
{/*              <Card>
                <SoftBox color="text" p={2}>
                  <MenuItem onClick={() => {}}>
                    <RocketLaunch />
                    &nbsp; Profile
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <Article />
                    &nbsp; Basic Info
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <Widgets />
                    &nbsp; Change Password
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <Tune />
                    &nbsp; 2FA
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <Delete />
                    &nbsp; Delete Account
                  </MenuItem>
                </SoftBox>
              </Card>*/}
            </Grid>
            <Grid item xs={12} lg={12}>
              <Card
                sx={{
                  backdropFilter: `saturate(200%) blur(30px)`,
                  backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
                    rgba(white.main, 0.8),
                  boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                  position: "relative",
                  p: 2,
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <SoftAvatar
                      src={burceMars}
                      alt="profile-image"
                      variant="rounded"
                      size="xl"
                      shadow="sm"
                    />
                  </Grid>
                  <Grid item>
                    <SoftBox height="100%" mt={0.5} lineHeight={1}>
                      <SoftTypography variant="h5" fontWeight="medium">
                        {user.name.toUpperCase() + " " + user.lastName.toUpperCase()}
                      </SoftTypography>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  <Grid item ml={"auto"}>
{/*                    <AppBar position="static">
                      <SoftBox display="flex" py={1} mb={0.25}>
                        <SoftBox width="80%" ml={2}>
                          <SoftTypography variant="button" fontWeight="medium" color="text">
                            {controller.user.stripe.accountID.length < 1 ? "Activate Account" : "Pause account"}
                          </SoftTypography>
                        </SoftBox>
                        <SoftBox mt={0.25} ml={2}>
                          <Switch
                            checked={checked}
                            onChange={handleChange}
                          />
                        </SoftBox>
                      </SoftBox>
                    </AppBar>*/}
                  </Grid>
                </Grid>
              </Card>
              {/*controller.user.stripeAccount ? 
                <></> : 
                <div style={{ marginTop: '20px' }}>
                  <StepsToActivate />
                </div>
              */}
              <BasicInfo user={user} />
              {/*controller.user.identityVerifed ? 
                <></> : 
                <div style={{ marginTop: '20px' }}>
                  <ProfileVerification />
                </div>
              */}
              <ChangePassword />
              {/*<TwoFactorAuth />*/}
              {/*<DeleteAccount />*/}
              <AllUserTransactions user={user.transactions} />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default PersonalInfo;
