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
import Socials2 from "../components/Socials2";

function SignIn() {

  const [controller, dispatch] = useSoftUIController();
  const [rememberMe, setRememberMe] = useState(true);
  const navegar = useNavigate();
  const [singData, setSingData] = useState({
    email: "",
    password: ""
  })

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleFormChange = (e) => {
    setSingData({ ...singData, [e.target.name]: e.target.value });
  };

  const handleSingIn = (e) => {
      e.preventDefault();
      SingIn(singData.email, singData.password).then(async (data) =>{
        console.log("sda")
        console.log(data.user)
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("accountID", data.user.stripe.accountID);
        if(data.user.stripeAccount){
          await setUser(dispatch, data.user)
          await setCurrencys(dispatch, data.currencys)
          navegar("/dashboard")
        }if(!data.user.stripeAccount && data.user.trparty){
          await setUser(dispatch, data.user)
          navegar("/activation-process-full")
        }else{
          await setUser(dispatch, data.user)
          navegar("/activation-process")
        }

      }).catch(error => {
        console.log(error)
        if(error === 400){
          SweetAlert("warning", "Ooops", "No user with that email or wrong password")
        }
        if(error === 407){
          SweetAlert("warning", "Ooops", "User blocked")
        }
        else{
          SweetAlert("warning", "Ooops", "Something go wrong")
        }
    })
  }

  const handleForget = () => {
    navegar("/forget")
  }

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
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
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" name="password"
                value={singData.password}
                onChange={handleFormChange} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={2}>
          <Socials2 />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSingIn}>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={1}>
          <SoftButton variant="gradient" color="dark" fullWidth onClick={handleForget}>
            Forget Password
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
