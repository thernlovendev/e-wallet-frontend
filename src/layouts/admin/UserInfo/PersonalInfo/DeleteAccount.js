import { Card, Grid, Switch } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import React from "react";

export default function DeleteAccount() {
  return (
    <Card
      sx={{
        // backdropFilter: `saturate(200%) blur(30px)`,
        boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
        p: 2,
        mt: 3,
      }}
    >
      <SoftBox mb={3}>
        <SoftTypography variant="h5" fontWeight="bolder" color="text">
          Delete Account
        </SoftTypography>
        <SoftTypography variant="h6" fontWeight="light" color="text">
          Once you delete your account, there is no going back. Please be certain.
        </SoftTypography>
      </SoftBox>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <SoftBox ml={0.5} display="flex" justifyContent="space-between" alignItems="center">
            <SoftBox display="flex" gap={2} alignItems="center">
              <Switch />
              <SoftBox display="flex" flexDirection="column">
                <SoftTypography variant="h6" fontWeight="bold">
                  Confirm
                </SoftTypography>
                <SoftTypography variant="caption" color="secondary">
                  I want to delete my account.
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox display="flex" gap={1}>
              <SoftButton variant="outlined" color={"dark"} onClick={() => {}}>
                Deactivate
              </SoftButton>
              <SoftButton component="button" color={"error"} onClick={() => {}}>
                Delete Account
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </Card>
  );
}
