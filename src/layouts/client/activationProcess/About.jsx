import React from 'react'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import { Grid } from '@mui/material'

export default function About() {
    return (<>
        <SoftBox
            pt={2}
            mb={3}
            px={2}
        >
            <SoftBox display="flex" flexDirection="column" justifyContent="start">
                <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                    About
                </SoftTypography>
                <SoftBox mb={1} lineHeight={0} textAlign="left">
                    <SoftTypography
                        variant="h6"
                        fontWeight="light"
                        color="text"
                        textAlign="left"
                    >
                        Mandatory information
                    </SoftTypography>
                </SoftBox>
            </SoftBox>
            <SoftBox textAlign="left">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={4}>
                        <label>First Name</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="eg. Michael"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={4}>
                        <label>Last Name</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="eg. Prior"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={4}>
                        <label>User Role</label>
                        <select
                            class="form-select"
                            id="inputGroupSelect03"
                            aria-label="Example select with button addon"
                        >
                            <option selected>Choose role</option>
                            <option value="1">Admin</option>
                            <option value="2">Agent</option>
                            <option value="3">User</option>
                        </select>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Company</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="eg. Creative Tim"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Email Address</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="email"
                            placeholder="eg. soft@dashboard.com"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Password</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="password"
                            placeholder="******"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Repeat Password</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="password"
                            placeholder="******"
                        />
                    </Grid>
                </Grid>
            </SoftBox>
        </SoftBox>
    </>)
}