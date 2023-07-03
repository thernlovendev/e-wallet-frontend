import { verifyIdentity } from "apis/request";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useState } from "react";
import { useSoftUIController } from "context";
import { useEffect } from "react";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";
import { Card } from "reactstrap";

function ProfileVerification () {

  const [controller, dispatch] = useSoftUIController();

  useEffect(() => {
    //console.log(controller.user)
  }, [controller])

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [id, setId] = useState("");

  const handleImage1Upload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage1(reader.result);
    };
  };

  const handleImage2Upload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage2(reader.result);
    };
  };

  const handleCompare = async () => {
    verifyIdentity(image1, image2, controller.user.id, id).then(data=>{
      console.log(data)
      if(!data.identityVerified){
        SweetAlert("warning", "Ooops", "The images do not match");
      }else{
        setUser(dispatch, data);
        SweetAlert("success", "All good", "Identity verified");
      }
    }).catch(error => {
      if(error === 400){
        SweetAlert("warning", "Ooops", "The Numbers of ID do not match")
      }
      console.log(error);
    });
  };

  return (
    <Card
      mt={5}
      sx={{
        boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
        p: 2,
        mt: 3,
        mb: 3
      }}
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
        <SoftBox my={2}>
          <SoftButton color="info" onClick={handleCompare}>
            Submit Verification
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default ProfileVerification;
