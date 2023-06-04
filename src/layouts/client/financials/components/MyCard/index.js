import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftTypography from "components/SoftTypography";
import SoftModal from "components/SoftModal";
import MasterCard from "examples/Cards/MasterCard";
import Transactions from "layouts/client/billing/components/Transactions";

function MyCard({ title, bgColor, icon }) {
  const [newAcc, setNewAcc] = useState(false);

  const toggleNewAccount = () => setNewAcc((prev) => !prev);
  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <SoftBox
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgColor="primary"
                borderRadius="lg"
                variant="gradient"
                // flexDirection="row"
                onClick={() => setNewAcc((prev) => !prev)}
              >
                <Grid item>
                  <SoftTypography
                    component="h6"
                    fontWeight="light"
                    fontSize=".87em"
                    color="white"
                  >
                    New Card
                  </SoftTypography>
                </Grid>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
        <Transactions />
      </SoftBox>
      <SoftModal open={false && newAcc} toggle={toggleNewAccount} header="New Card" body={<></>} />
    </DashboardLayout>
  );
}

export default MyCard;
