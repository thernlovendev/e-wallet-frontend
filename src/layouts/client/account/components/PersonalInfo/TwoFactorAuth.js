import { Card, Grid } from "@mui/material";
import SoftBadge from "components/SoftBadge";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import React, { useEffect, useState } from "react";
import { useSoftUIController } from "context";
import { confirmPhone } from "apis/request";
import SmsConfirm from "components/SMSconfirm";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";
import { confirmPhoneCode } from "apis/request";
import SoftModal from "components/SoftModal";
import SoftInput from "components/SoftInput";
import { editPhone } from "apis/request";
import { confirmPhoneCode2 } from "apis/request";


export default function TwoFactorAuth() {
  const [controller, dispatch] = useSoftUIController();
  const [SHOW, setSHOW] = useState(false);
  const [SHOW2, setSHOW2] = useState(false);
  const [phone, setPhone] = useState(0);
  const [countryCode, setCountryCode] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState(false);

  useEffect(()=>{

  },[controller])

  const handleChange = (e) => {
    if(e.target.name === "phone"){
        setPhone(e.target.value)
    }
    if(e.target.name === "countryCode"){
        setCountryCode(e.target.value)
    }
    if(e.target.name === "code"){
      setCode(e.target.value)
    }
  }

  const ConfirmCode = (code) => {
    confirmPhoneCode(controller.user.id, code).then(async (user) => {
      setUser(dispatch, user)
      setSHOW(false)
      await SweetAlert("success", "All good", "Phone Confirmed")
    }).catch(error => {
      if (error === 400){
        SweetAlert("warning", "Ooops", "Wrong code")
      }
      if(error === 404){
        SweetAlert("warning", "Ooops", "Something went wrong")
      }
    })
  }

  const handleConfirmPhone = () => {
    confirmPhone(controller.user.id, controller.user.phone).then(user => {
      setSHOW(true)
    }).catch(error => {
      if(error === 404){
        SweetAlert("warning", "Ooops", "Something went wrong");
      }

    })
  }

  const hanleWork = () => {
    SweetAlert("warning", "Ooops", "We are working on this")
  }

  const handleEditPhone = async () => {
    setSHOW2(true)
    console.log(SHOW2)
  }

  const handleSetPhone = () => {
    const Phone = countryCode + phone
    editPhone(controller.user.id, Phone).then(result => {
      setShowCode(true)
    }).catch(error => {
      if(error === 400){
        SweetAlert("warning", "Ooops", "Bad phone number or country code");
      }
      if(error === 404){
        SweetAlert("warning", "Ooops", "Something went wrong");
      }
    })
  }

  const ConfirmCode2 = () => {
    const Phone = countryCode + phone
    confirmPhoneCode2(controller.user.phone, code, Phone).then(user => {

    }).catch(error => {
      if(error === 400){
        SweetAlert("warning", "Ooops", "Wrong code");
      }
      if(error === 404){
        SweetAlert("warning", "Ooops", "Something went wrong");
      }
    })
  }

  const handleShow = () => {
    setSHOW2(!SHOW2)
  }

  return (
    <Card
      sx={{
        // backdropFilter: `saturate(200%) blur(30px)`,
        boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
        p: 2,
        mt: 3,
      }}
    >
      <SoftBox mb={4} display="flex" justifyContent="space-between">
        <SoftTypography variant="h5" fontWeight="bolder" color="text">
          Two-factor authentication
        </SoftTypography>
        {controller.user.phoneVerified ? <></> :
          <SoftButton variant="outlined" color="warning" size="small" onClick={handleConfirmPhone}>
            Confirm your phone
          </SoftButton>
        }
        <SoftBadge
          variant="gradient"
          badgeContent={controller.user.phoneVerified ? "Enabled" : "No Enabled"}
          color={controller.user.phoneVerified ? "succes" : "warning"}
          size="xs"
          container
        ></SoftBadge>
      </SoftBox>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <SoftBox ml={0.5} display="flex" justifyContent="space-between" alignItems="center">
            <SoftTypography component="h6" variant="title" fontWeight="light">
              Security keys
            </SoftTypography>
            <SoftBox ml={0.5} display="flex" alignItems="center" gap={1}>
              <SoftTypography component="p" variant="caption" fontWeight="light">
                No Security Keys
              </SoftTypography>
              <SoftButton variant="outlined" color="dark" size="small" onClick={hanleWork}>
                Add
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Grid>
        <hr className="horizontal dark mt-4" />
        <Grid item xs={12}>
          <SoftBox ml={0.5} display="flex" justifyContent="space-between" alignItems="center">
            <SoftTypography component="h6" variant="title" fontWeight="light">
              SMS number
            </SoftTypography>
            <SoftBox ml={0.5} display="flex" alignItems="center" gap={1}>
              <SoftTypography component="p" variant="caption" fontWeight="light">
                +{controller.user.phone}
              </SoftTypography>
              <SoftButton variant="outlined" color="dark" size="small" onClick={handleEditPhone} >
                Edit
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Grid>
        <hr class="horizontal dark mt-4" />
        <Grid item xs={12}>
          <SoftBox ml={0.5} display="flex" justifyContent="space-between" alignItems="center">
            <SoftTypography component="h6" variant="title" fontWeight="light">
              Authenticator app
            </SoftTypography>
            <SoftBox ml={0.5} display="flex" alignItems="center" gap={1}>
              <SoftTypography component="p" variant="caption" fontWeight="light">
                Not Configured
              </SoftTypography>
              <SoftButton variant="outlined" color="dark" size="small" onClick={hanleWork}>
                SET UP
              </SoftButton>
            </SoftBox>
      {     <SmsConfirm show={SHOW} onSave={ConfirmCode} resend={handleConfirmPhone} />}
          </SoftBox>
        </Grid>
      </Grid>
      <SoftModal
        header="Edit your CellPhone number"
        //toggle={toggleAddMoney}
        open={SHOW2}
        body={
          <>{!showCode ?
            <SoftBox display="flex" gap="5px" >
              <SoftInput
                  min="1"
                  type="number"
                  placeholder="country code"
                  name="countryCode"
                  onChange={handleChange}
              />
              <SoftInput
                  min="1"
                  type="number"
                  placeholder="cellphone number"
                  name="phone"
                  onChange={handleChange}
              />
            </SoftBox> : 
            <div class="row mt-2">
              <div class="form-group col-10">
                  <input
                    type="number"
                    class="form-control"
                    name="phone"
                    placeholder="SMS code"
                    onChange={handleChange}
                  />
                </div>
              </div>
            }
          </>
        }
        footer={
        <>
          {!showCode ? 
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"secondary"} onClick={handleShow}>
              Cancel
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={handleSetPhone} >
              SetPhone
            </SoftButton>
          </SoftBox> : 
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"success"} onClick={ConfirmCode2}>
              Confirm Code
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={handleSetPhone} >
              Re-Send Code
            </SoftButton>
          </SoftBox>
          }
        </>
        }
      />
    </Card>
  );
}












