import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import React from "react";

export default function ChangePassword() {
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
          Change Password
        </SoftTypography>
      </SoftBox>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <SoftBox ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Current password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Current Password" />
        </Grid>
        <Grid item xs={12}>
          <SoftBox ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              New password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="New Password" />
        </Grid>
        <Grid item xs={12}>
          <SoftBox ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Confirm new password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Confirm Password" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h5 class="mt-5">Password Requirements</h5>
          <p class="text-muted mb-2">Please follow this guide for a strong password:</p>
          <ul class="text-muted ps-4 mb-0 float-start">
            <li>
              <span class="text-sm">One special characters</span>
            </li>
            <li>
              <span class="text-sm">Min 6 characters</span>
            </li>
            <li>
              <span class="text-sm">One number (2 are recommended)</span>
            </li>
            <li>
              <span class="text-sm">Change it often</span>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} md={4}>
          <SoftBox display="flex" alignItems="end">
            <button class="btn bg-gradient-dark btn-sm float-end mt-6 mb-0">Update password</button>
          </SoftBox>
        </Grid>
      </Grid>
    </Card>
  );
}
