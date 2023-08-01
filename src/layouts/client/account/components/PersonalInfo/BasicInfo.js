import { AppBar, Card, Grid, Switch } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import React from "react";
import { useSoftUIController } from "context";
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import { verifyAddress } from "apis/request";
import { setCurrencys } from "context";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";
import { editProfileInfo } from "apis/request";

export default function BasicInfo() {
  const [controller, dispatch] = useSoftUIController();
  const [checked, setChecked] = useState(false);
  const [formDataAddress, setFormDataAddress] = useState({
    city : controller.user.address.city,
    line1 : controller.user.address.line1,
    state : controller.user.address.state,
    postal_code : controller.user.address.postal_code
  });
  const [name, setName] = useState (controller.user.name);
  const [lastName, setLastName] = useState (controller.user.lastName);
  const [email, setEmail] = useState(controller.user.email);

  const handleFormChange = (e) => {
    setFormDataAddress({ ...formDataAddress, [e.target.name]: e.target.value });
    console.log(formDataAddress)
  };

  const handleFormChange2 = async (e) => {
    if(e.target.name === "name"){
      setName(e.target.value);
    }
    if(e.target.name === "lastName"){
      setLastName(e.target.value)
    }
    if(e.target.name === "email"){
      setEmail(e.target.value)
    }
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  useEffect(() => {
    console.log(controller)
    async function x () {

    }
    x()
  }, [controller.user])

  const handleEditInfo = () => {
    const data = {
      name: name,
      lastName: lastName,
      email: email
    }
    editProfileInfo(controller.user.id, data).then(async (user) => {
      console.log(user)
      await setUser(dispatch, user)
      SweetAlert("success", "Good", "Info edited");
    }).catch(error => {
      if(error === 404){
        SweetAlert("warning", "Ooops", "Something went wrong");
      }
    })
  }

  const handleConfirmAddress = async () => {
    try {
      const user = await verifyAddress(controller.user.id, formDataAddress, controller.user.country);
      console.log(user);
      await setUser(dispatch, user);
      SweetAlert("success", "Good", "Address confirmed");
    } catch (error) {
      if (error === 400) {
        SweetAlert("warning", "Ooops", "Wrong Address");
      }else{
        SweetAlert("warning", "Ooops", "Something went wrong");
      }
    }
  };

  if(checked){
    return(
      <Card
      mb={2}
      sx={{
        // backdropFilter: `saturate(200%) blur(30px)`,
        boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
        p: 2,
        mt: 3,
        mb: 3
      }}
    >
      <SoftBox mb={3} display="flex" justifyContent="space-between">
        <SoftTypography variant="h5" fontWeight="bolder" color="text">
          Editing Basic Info
        </SoftTypography>
        <Grid item ml={"auto"}>
          <AppBar position="static">
            <SoftBox display="flex" py={1} mb={0.25}>
              <SoftBox width="80%" ml={2}>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Edit Info
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={0.25} ml={2}>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                />
              </SoftBox>
            </SoftBox>
          </AppBar>
        </Grid>
      </SoftBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SoftBox mb={2}>
            <SoftBox ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                First Name
              </SoftTypography>
            </SoftBox>
            <SoftInput name="name" type="text" placeholder={controller.user.name} onChange={handleFormChange2}/>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <SoftBox mb={2}>
            <SoftBox ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Last Name
              </SoftTypography>
            </SoftBox>
            <SoftInput name="lastName" type="text" placeholder={controller.user.lastName} onChange={handleFormChange2}/>
          </SoftBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
{/*          <SoftBox mb={1}>
            <SoftBox ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                I'm
              </SoftTypography>
            </SoftBox>
            <select className="form-control" name="choices-gender" id="choices-gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </SoftBox>*/}
          <Grid item xs={12} md={6}>
            <SoftBox mb={2}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  ID Number
                </SoftTypography>
              </SoftBox>
              <SoftInput type="number" value={controller.user.idNumber} onChange={handleFormChange2}/>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
          <SoftBox mb={2}>
            <SoftBox ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Phone Number
              </SoftTypography>
            </SoftBox>
            <SoftInput type="number" placeholder={controller.user.phone} />
          </SoftBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} md={5}>
        <SoftBox mb={2} display="flex" gap={2}>
              <div class="col-sm-5 col-5">
                <label class="form-label mt-4">Birth Date</label>
                <SoftBox mb={2}>
                  <SoftBox ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Year
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput name="year" type="text" value={controller.user.dob.year} onChange={handleFormChange2}/>
                </SoftBox>
              </div>
              <div class="col-sm-4 col-3">
                <label class="form-label mt-4">&nbsp;</label>
                <SoftBox mb={2}>
                  <SoftBox ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Month
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput name="month" type="text" value={controller.user.dob.month} onChange={handleFormChange2} />
                </SoftBox>
              </div>
              <div class="col-sm-3 col-4">
                <label class="form-label mt-4">&nbsp;</label>
                <SoftBox mb={2}>
                  <SoftBox ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Day
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput name="day" type="text" value={controller.user.dob.day} onChange={handleFormChange2}/>
                </SoftBox>
              </div>
            </SoftBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SoftBox mb={2}>
            <SoftBox ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SoftTypography>
            </SoftBox>
            <SoftInput name="email" type="text" placeholder={controller.user.email} onChange={handleFormChange2}/>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <SoftBox mb={2}>
            <SoftBox ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Confirmation Email
              </SoftTypography>
            </SoftBox>
            <SoftInput type="text" placeholder={controller.user.email}  />
          </SoftBox>
        </Grid>
      </Grid>
      <SoftBox my={2}>
          <SoftButton color="info" onClick={handleEditInfo}>
            Save Your Changes
          </SoftButton>
        </SoftBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SoftBox mb={2}>
            <SoftBox ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Your location
              </SoftTypography>
            </SoftBox>
            <SoftTypography ml={1}  component="label" variant="caption" fontWeight="bold">
                State or province
            </SoftTypography>
            <SoftInput type="text" name={"state"} placeholder={controller.user.address.state} onChange={handleFormChange} />
            <SoftTypography ml={1}  component="label" variant="caption" fontWeight="bold">
                City
            </SoftTypography>
            <SoftInput type="text" name={"city"} placeholder={controller.user.address.city} onChange={handleFormChange}/>
            <SoftTypography ml={1}  component="label" variant="caption" fontWeight="bold">
                Street and number
            </SoftTypography>
            <SoftInput type="text" name={"line1"} placeholder={controller.user.address.line1} onChange={handleFormChange}/>
            <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                Postal Code
            </SoftTypography>
            <SoftInput type="text"  name={"postal_code"} placeholder={controller.user.address.postal_code} onChange={handleFormChange}/>
          </SoftBox>
          <SoftBox my={2}>
          <SoftButton color="info" onClick={handleConfirmAddress}>
            Confirm Your Adrress
          </SoftButton>
        </SoftBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
{/*          <SoftBox mb={2}>
            <SoftBox ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Language
              </SoftTypography>
            </SoftBox>
            <select className="form-control" name="choices-language" id="choices-language">
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </SoftBox>*/}
        </Grid>
      </Grid>
    </Card>
    )
  }else{
    return (
      <Card
        sx={{
          // backdropFilter: `saturate(200%) blur(30px)`,
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          p: 2,
          mt: 3,
        }}
      >
        <SoftBox mb={3} display="flex" justifyContent="space-between">
          <SoftTypography variant="h5" fontWeight="bolder" color="text">
            Basic Info
          </SoftTypography>
          <Grid item ml={"auto"}>
            <AppBar position="static">
              <SoftBox display="flex" py={1} mb={0.25}>
                <SoftBox width="80%" ml={2}>
                  <SoftTypography variant="button" fontWeight="regular" color="text">
                    Edit Info
                  </SoftTypography>
                </SoftBox>
                <SoftBox mt={0.25} ml={2}>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                  />
                </SoftBox>
              </SoftBox>
            </AppBar>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SoftBox mb={2}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  First Name
                </SoftTypography>
              </SoftBox>
              <SoftInput type="text" value={controller.user.name}/>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox mb={2}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Last Name
                </SoftTypography>
              </SoftBox>
              <SoftInput type="text" value={controller.user.lastName} />
            </SoftBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
      {/*          <SoftBox mb={1}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  I'm
                </SoftTypography>
              </SoftBox>
              <select className="form-control" name="choices-gender" id="choices-gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </SoftBox>*/}
            <Grid item xs={12} md={6}>
              <SoftBox mb={2}>
                <SoftBox ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    ID Number
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="number" value={controller.user.idNumber}/>
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={6}>
            <SoftBox mb={2}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Phone Number
                </SoftTypography>
              </SoftBox>
              <SoftInput type="text" value={controller.user.phone} />
            </SoftBox>
            </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5} md={5}>
            <SoftBox mb={2} display="flex" gap={2}>
              <div class="col-sm-5 col-5">
                <label class="form-label mt-4">Birth Date</label>
                <SoftBox mb={2}>
                  <SoftBox ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Year
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput type="text" value={controller.user.dob.year} />
                </SoftBox>
              </div>
              <div class="col-sm-4 col-3">
                <label class="form-label mt-4">&nbsp;</label>
                <SoftBox mb={2}>
                  <SoftBox ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Month
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput type="text" value={controller.user.dob.month} />
                </SoftBox>
              </div>
              <div class="col-sm-3 col-4">
                <label class="form-label mt-4">&nbsp;</label>
                <SoftBox mb={2}>
                  <SoftBox ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Day
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput type="text" value={controller.user.dob.day} />
                </SoftBox>
              </div>
            </SoftBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SoftBox mb={2}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Email
                </SoftTypography>
              </SoftBox>
              <SoftInput type="text" value={controller.user.email} />
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox mb={2}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Confirmation Email
                </SoftTypography>
              </SoftBox>
              <SoftInput type="text" value={controller.user.email}  />
            </SoftBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SoftBox mb={2}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Your location
                </SoftTypography>
              </SoftBox>
              <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                  State or province
              </SoftTypography>
              <SoftInput type="text" value={controller.user.address.state} />
              <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                  City
              </SoftTypography>
              <SoftInput type="text" value={controller.user.address.city} />
              <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                  Street and number
              </SoftTypography>
              <SoftInput type="text" value={controller.user.address.line1} />
              <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                  Postal Code
              </SoftTypography>
              <SoftInput type="text" value={controller.user.address.postal_code} />
            </SoftBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
      {/*          <SoftBox mb={2}>
              <SoftBox ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Language
                </SoftTypography>
              </SoftBox>
              <select className="form-control" name="choices-language" id="choices-language">
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </SoftBox>*/}
          </Grid>
        </Grid>
      </Card>
    );
  }

}
