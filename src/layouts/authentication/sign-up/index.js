import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { useNavigate } from 'react-router-dom';
import curved6 from "assets/images/curved-images/curved14.jpg";
import { setUser } from "context";
import { useSoftUIController } from "context";
import { SweetAlert } from "apis/sweetAlert";
import { SignUpR } from "apis/request";

function SignUp() {
  const [controller, dispatch] = useSoftUIController();
  const navegar = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
    agreement: false,
    country: "",
    birthDay: "",
    birthMonth: "",
    birthYear: ""
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSetAgremment = () => {
    setFormData({ ...formData, agreement: !formData.agreement });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = await validateForm(formData)
    console.log(valid);
    if(valid){
      SignUpR(formData.email, formData.password, formData.name, formData.lastName, formData.phone, formData.country
        , formData.birthDay, formData.birthMonth, formData.birthYear).then(user =>{
        setUser(dispatch, user)
        navegar("/account/personal-information")
        console.log(user)
      }).catch(error => {
        console.log(error)
        if(error === 400){
          SweetAlert("warning", "Ooops", "Email already in use")
        }else{
          SweetAlert("warning", "Ooops", "Something went wrong")
        }
      })
    } else {
      //SweetAlert("warning", "Ooops", "")
    }
  };

  async function validateForm(formData) {
    let errors = {error: false};
  
    // Name validation
    if (!formData.name) {
      errors.name = "Firstname is required";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Name is required")
      return false
    }
  
    // Last name validation
    if (!formData.lastName) {
      errors.lastName = "Lastname is required";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Last name is required")
      return false
    }

    if (!formData.phone) {
      errors.phone = "Phone is required";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Phone is required")
      return false
    }

    if (!formData.country) {
      errors.country = "Country is required";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Country is required")
      return false
    }
  
    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Email is invalid")
      return false
    }
  
    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Password is required")
      return false
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Password must be at least 6 characters long")
      return false
    }
  
    // Confirm password validation
    if (formData.confirmPass !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Passwords do not match")
      return false
    }
  
    // Agreement validation
    if (!formData.agreement) {
      errors.agreement = "You must accept the Terms and Conditions";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "You must accept the Terms and Conditions")
      return false
    }
  
    // Age validation
    const today = new Date();
    const birthDate = new Date(`${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`);
    
    // Verificar si la fecha de nacimiento es válida
    if (isNaN(birthDate.getTime())) {
      errors.age = "Invalid birthdate";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "Invalid birthdate");
      return false;
    }
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) {
      errors.age = "You must be at least 18 years old";
      errors.error = true;
      await SweetAlert("warning", "Ooops", "You must be at least 18 years old");
      return false;
    }

    return true;
  }

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" >
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput 
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
              />
            </SoftBox>
            <SoftBox mb={2} display="flex">
              <SoftInput
                min="1"
                type="number"
                placeholder="Day"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleFormChange}
              />
              <SoftInput
                min="1"
                type="number"
                placeholder="Month"
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleFormChange}
              />
              <SoftInput
                min="1"
                type="number"
                placeholder="Year"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleFormChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="phone"
                placeholder="Phone n°, Include your country code"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Confirm your Password"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleFormChange}
              />
            </SoftBox>
            <select id="country-select" name="country" onChange={handleFormChange}>
              <option value="">Select a country</option>
              <option value="GB">Reino Unido</option>
              <option value="US">Estados Unidos</option>
            </select>
            <SoftBox display="flex" alignItems="center">
              <Checkbox
                checked={formData.agreement}
                onChange={handleSetAgremment}
              />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleSubmit}>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
