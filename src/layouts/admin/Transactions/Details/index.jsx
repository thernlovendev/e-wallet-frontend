// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftTypography from "components/SoftTypography";
import { Card } from "@mui/material";
import SoftButton from "components/SoftButton";
import TimelineDetails from "./Timeline";
import PaymentDetails from "./PaymentDetails";
import TransactionAmount from "./TransactionAmount";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTransaction } from "apis/request";

function TransactionDetails() {
  
  const {id} = useParams();
  const [transaction, setTransaction] = useState({
    id: "",
    amount: "",

  })

  useEffect(() => {
    getTransaction(id).then(transaction => {
      console.log(transaction)
    })
  }, [id])

  return (
    <DashboardLayout>
      <Grid container spacing={3} className="justify-content-center">
        <Grid item xs={12} sm={10} xl={10} className="text-center">
          <Card
            sx={{
              boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
              p: 1,
              mt: 3,
            }}
          >
            <SoftBox
              pt={2}
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SoftBox display="flex" flexDirection="column" justifyContent="start">
                <SoftTypography variant="h6" fontWeight="medium" textAlign="left">
                  Transaction Details
                </SoftTypography>
                <SoftBox mb={1} lineHeight={0} textAlign="left">
                  <SoftTypography variant="caption" color="text" textAlign="left">
                    Code:&nbsp;
                    <SoftTypography variant="caption" fontWeight="medium">
                      243598234
                    </SoftTypography>
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
              <SoftButton variant="gradient" color="dark">
                Download
              </SoftButton>
            </SoftBox>
            <hr className="horizontal dark mt-4" />

            <Grid container spacing={0}>
              <Grid item xs={12} sm={6} xl={4}>
                <TimelineDetails />
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <PaymentDetails />
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <TransactionAmount />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default TransactionDetails;