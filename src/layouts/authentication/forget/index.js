import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useSoftUIController } from "context";
import { SingInPass } from "apis/firebase";
import { setUser } from "context";
import { setCurrencys } from "context";
import { SingIn } from "apis/request";
import { SweetAlert } from "apis/sweetAlert";
import { resetPass } from "apis/request";

function ForgetPass () {
    const [singData, setSingData] = useState({
        email: ""
    })
    const navegar = useNavigate();

    const handleFormChange = (e) => {
        setSingData({ ...singData, [e.target.name]: e.target.value });
    };

    const handleSingIn = () => {
        navegar("/authentication/sign-in")
    }

    const handleForget = () => {
        resetPass(singData.email).then(data => {
            SweetAlert("success", "All good", "Check your email!")
        }).catch(error => {
            SweetAlert("warning", "Ooops", "Something go wrong")
        })
    }

    return(
    <CoverLayout
      title="Welcome back"
      description="Enter your email to reset your password"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" name="email"
                value={singData.email}
                onChange={handleFormChange}/>
        </SoftBox>
        <SoftBox mt={1}>
          <SoftButton variant="gradient" color="dark" fullWidth onClick={handleForget}>
            Reset Password
          </SoftButton>
        </SoftBox>
        <SoftBox mt={1} mb={0}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSingIn}>
            sign in
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default ForgetPass;