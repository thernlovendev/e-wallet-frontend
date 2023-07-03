import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function TransactionAmount() {
    return (<>
        <SoftBox pt={3} px={3}>
            <SoftTypography variant="h6" fontWeight="medium" textAlign="left">
                Transaction Amount
            </SoftTypography>
        </SoftBox>
        <SoftBox pt={1} px={3} textAlign="left">
            <SoftTypography variant="caption" color="text">
                Total:&nbsp;
                <SoftTypography variant="caption" fontWeight="medium" textAlign="left">
                    {"$149.00"}
                </SoftTypography>
            </SoftTypography>
        </SoftBox>
    </>
    );
}

export default TransactionAmount;