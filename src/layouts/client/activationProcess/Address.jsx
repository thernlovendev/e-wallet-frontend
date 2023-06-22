import React, { useState } from 'react'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import { Grid } from '@mui/material'
import SoftButton from "components/SoftButton";
import { useSoftUIController } from "context";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";
import { verifyAddress } from 'apis/request';

export default function Address({onSave}) {

    const [controller, dispatch] = useSoftUIController();
    const [line1, setLine1] = useState("");
    const [city, setCity] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [state, setState] = useState("");

    const handleChange = async (e) => {
        if(e.target.name === "line1"){
            setLine1(e.target.value)
        }
        if(e.target.name === "city"){
            setCity(e.target.value)
        }
        if(e.target.name === "postal_code"){
            setPostalCode(e.target.value)
        }
        if(e.target.name === "state"){
            setState(e.target.value)
        }
    }

    const handleSaveAddress = () => {
        const address = {
            city: city,
            line1: line1,
            postal_code: postal_code,
            state: state
        }
        verifyAddress(controller.user.id, address, controller.user.country).then(async (user) => {
            await setUser(dispatch, user);
            SweetAlert("success", "All good", "Address verified");
            onSave();
        }).catch(error => {
            if (error === 400) {
                SweetAlert("warning", "Ooops", "Wrong Address");
            }else{
                SweetAlert("warning", "Ooops", "Something went wrong");
            }
        })
        
    }

    return (
        <SoftBox
            pt={2}
            mb={3}
            px={2}
        >
            <SoftBox display="flex" flexDirection="column" justifyContent="start">
                <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                    Verify your Address
                </SoftTypography>
            </SoftBox>
            <SoftBox textAlign="left">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} xl={12}>
                        <label>Address 1</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="ex. 289 Westburn Rd"
                            name='line1'
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>City</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="ex. Aberdeen"
                            name='city'
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} xl={3}>
                        <label>State</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="ex. Escocia"
                            name='state'
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} xl={3}>
                        <label>Postal Code</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="ex. AB10"
                            name='postal_code'
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </SoftBox>
            <SoftBox mb={1} mt={2} px={2} display="flex" justifyContent="flex-end">
                <SoftButton
                        variant="gradient"
                        color="dark"
                        onClick={handleSaveAddress}
                    >
                        Next
                </SoftButton>
            </SoftBox> 
        </SoftBox>
    )
}