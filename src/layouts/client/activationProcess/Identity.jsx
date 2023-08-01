import React, { useEffect, useState } from 'react'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import { Grid } from '@mui/material'
import SoftButton from 'components/SoftButton'
import { useSoftUIController } from "context";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";
import SoftInput from 'components/SoftInput'
import { verifyIdentity } from 'apis/request';
import { useNavigate } from "react-router-dom";

export default function Identity({onSave, prev}) {

    const [controller, dispatch] = useSoftUIController();
    const navegar = useNavigate();
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [id, setId] = useState("");

    useEffect(() => {
        //console.log(controller.user)
    }, [controller])

    const handleImage2Upload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImage2(reader.result);
        };
    };

    const handleImage1Upload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImage1(reader.result);
        };
    };

    const handleVerifyIdentity = () => {
        verifyIdentity(image1, image2, controller.user.id, id).then(data=>{
              setUser(dispatch, data);
              SweetAlert("success", "All good", "Identity verified, you will be redirected!");
              navegar("/authentication/sign-in")
        }).catch(error => {
            if(error == 400){
              SweetAlert("warning", "Ooops", "The Numbers of ID do not match")
            }
            if(error == 401){
                SweetAlert("warning", "Ooops", "The faces do not match")
            }
            else{
                SweetAlert("warning", "Ooops", "Something go wrong")
                console.log(error);
            }
        });
    }

    const handlePrev = () => {
        prev();
    }

    return (
        <SoftBox
            pt={2}
            mb={3}
            px={2}
        >
        <SoftBox mb={2} ml={2} mt={2} display="flex" flexDirection="column">
                <SoftBox my={2}>
                <SoftTypography variant="h5" fontWeight="bold" color="text">
                    Verifi your identity
                </SoftTypography>
                </SoftBox>
                <SoftBox my={2}>
                <SoftTypography variant="h6" color="text" fontWeight="bold">
                    Please upload the following verification images:
                </SoftTypography>
                </SoftBox>
                <SoftBox my={2}>
                <SoftTypography variant="h6" fontWeight="bold" color="text">
                    ID Card or Passport
                </SoftTypography>
                <SoftInput
                    type="file"
                    name="ID"
                    onChange={handleImage1Upload}
                    accept=".jpg, .jpeg, .png, .JPG, .PNG"
                />
                </SoftBox>
                <SoftBox my={2}>
                <SoftTypography variant="h6" fontWeight="bold" color="text">
                    Selfie
                </SoftTypography>
                <SoftInput
                    type="file"
                    name="Selfie"
                    onChange={handleImage2Upload}
                    accept=".jpg, .jpeg, .png, .JPG"
                />
                </SoftBox>
                <SoftBox my={2}>
                <SoftTypography variant="h6" fontWeight="bold" color="text">
                    Passport or ID Number
                </SoftTypography>
                <SoftInput
                    type="text"
                    name="ID"
                    onChange={(event) => setId(event.target.value)}
                />
                </SoftBox>
        </SoftBox>
            <SoftBox mb={1} px={2} mt={2} display="flex" justifyContent="space-between">
                <SoftButton
                        variant="gradient"
                        color="white"
                        onClick={handlePrev}
                    >
                        Prev
                </SoftButton>
                <SoftButton
                        variant="gradient"
                        color="dark"
                        onClick={handleVerifyIdentity}
                    >
                        Submit Verification
                  </SoftButton>
            </SoftBox>
        </SoftBox>
    )
}