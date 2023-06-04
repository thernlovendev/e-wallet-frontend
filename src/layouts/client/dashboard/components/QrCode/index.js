// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import qrcodeImg from "assets/img/qr-code.png";
import SoftInput from "components/SoftInput";

function QrCode() {
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          QR Code
        </SoftTypography>
        <SoftButton variant="outlined" color="info" size="small">
          Generate
        </SoftButton>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox>
          <SoftBox
            component="img"
            src={qrcodeImg}
            alt="qr"
            display="block"
            width="100%"
            height="100%"
          />
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Your QR Code
              </SoftTypography>
            </SoftBox>
            <SoftInput type="text" value="AbJKKl-lMb4-3M235Bv6-CX89745-5TV873CV23" disabled />
          </SoftBox>
        </SoftBox>
        {/*<hr className="horizontal dark mt-4" />
        <SoftTypography component="h6" fontWeight="bold">
          Permissions
        </SoftTypography>
        <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox mt={0.25}>
            <Switch />
          </SoftBox>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              App allowed
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox mt={0.25}>
            <Switch />
          </SoftBox>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              TopUp allowed
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox mt={0.25}>
            <Switch />
          </SoftBox>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              Withdrawals allowed
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox mt={0.25}>
            <Switch />
          </SoftBox>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              Transactions allowed
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftButton component="button" color={"primary"}>
          Update Permissions
        </SoftButton>*/}
      </SoftBox>
    </Card>
  );
}

export default QrCode;
