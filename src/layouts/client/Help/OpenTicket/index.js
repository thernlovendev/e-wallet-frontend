// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import { Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";

function OpenTickets() {
  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <Card>
          <SoftBox p={3} mb={3}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <SoftTypography variant="h5">New Ticktes</SoftTypography>
            </SoftBox>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default OpenTickets;
