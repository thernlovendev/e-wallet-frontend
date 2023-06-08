// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Transaction from "layouts/client/billing/components/Transaction";

import { useSoftUIController } from "context";
import { useEffect, useState } from "react";

function Transactions() {

  const [controller, dispatch] = useSoftUIController();
  const [transactions , setTransactions] = useState([])

  useEffect(() => {
    controller.user.transactions.sort(function (a, b) {
      if(a.date > b.date) {
        return -1;
      }
      if(a.datev < b.date){
        return 1;
      }
      return 0;
    })
  },[controller])

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Recent Transactions
        </SoftTypography>
        <SoftBox display="flex" alignItems="flex-start">
{/*          <SoftBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </SoftBox>*/}
{/*          <SoftTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </SoftTypography>*/}
        </SoftBox>
      </SoftBox>
      <SoftBox pt={3} pb={2} px={2}>
        <SoftBox mb={2}>
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            newest
          </SoftTypography>
        </SoftBox>
        <SoftBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {controller.user.transactions.map(transaction => {
            return (
                <Transaction
                key={transaction.id}
                color= { transaction.amount > 0 ? "success" : "error"}
                icon={transaction.action === "charge" ? "arrow_upward" : "arrow_downward"}
                name= {transaction.action.toUpperCase() + " " + transaction.currency}
                description={transaction.date}
                value= {transaction.currency + " " + transaction.amount}
              />
            )
          })}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Transactions;
