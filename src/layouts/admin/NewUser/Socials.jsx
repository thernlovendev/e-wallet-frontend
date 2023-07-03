import React from 'react'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import { Grid } from '@mui/material'

export default function Socials() {
    return (
        <SoftBox
            pt={2}
            mb={3}
            px={2}
        >
            <SoftBox display="flex" flexDirection="column" justifyContent="start">
                <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                    Socials
                </SoftTypography>
            </SoftBox>
            <SoftBox textAlign="left">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} xl={12}>
                        <label>Twitter Handle</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="@soft"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} xl={12}>
                        <label>Facebook Account</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="https://..."
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} xl={12}>
                        <label>Instagram Account</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="https://..."
                        />
                    </Grid>
                </Grid>
            </SoftBox>
        </SoftBox>
    )
}