import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import masterCardLogo from "assets/images/logos/mastercard.png";

// Soft UI Dashboard React examples
import borders from "assets/theme/base/borders";
import Bill from "./Bill";

function PaymentDetails() {
  const { borderWidth, borderColor } = borders;
  return (
    <>
      <SoftBox pt={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Payment Method
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox
          border={`${borderWidth[1]} solid ${borderColor}`}
          borderRadius="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <SoftBox component="img" src={masterCardLogo} alt="master card" width="10%" mr={2} />
          <SoftTypography variant="h6" fontWeight="medium">
            ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox pt={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Billing Information
        </SoftTypography>
      </SoftBox>
      <SoftBox px={2}>
        <Bill
          name="Lukas Thern Loven"
          ID="243598234"
          Fingerprint="UKztTqLj2HS5t4d0"
          Type="Mastercard credit card"
          Issuer="SEB KORT BANK AB"
        />
      </SoftBox>
    </>
  );
}

export default PaymentDetails;