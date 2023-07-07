// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CountryTransactions from "./components/Account";

import usImg from "assets/img/us.png";
import gbImg from "assets/img/gb96.png"
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import SoftModal from "components/SoftModal";
import { useSoftUIController } from "context";

function Accounts({ title, bgColor, icon }) {
  const [newAcc, setNewAcc] = useState(false);
  const [controller, dispatch] = useSoftUIController();

  useEffect(() => {

  }, [controller])

  const toggleNewAccount = () => setNewAcc((prev) => !prev);
  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {controller.user.amount.map(account => {
              return(
              <Grid item xs={12} sm={6} xl={4}>
                <CountryTransactions
                  title={{ text: account.currency + " " + account.amount.toFixed(2), fontWeight: "bold" }}
                  icon={account.currency}
                />
              </Grid>
              )
            })}
          </Grid>
        </SoftBox>
      </SoftBox>
      <SoftModal
        open={newAcc}
        toggle={toggleNewAccount}
        header="New Account"
        body={
          <>
            <div class="row">
              <div class="form-group col-12">
                <label for="">Select Currency</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>SEK</option>
                  <option>SGD</option>
                </select>
              </div>
            </div>
          </>
        }
        footer={
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"secondary"} onClick={toggleNewAccount}>
              Cancel
            </SoftButton>
            <SoftButton component="button" color={"primary"}>
              Open Account
            </SoftButton>
          </SoftBox>
        }
      />
    </DashboardLayout>
  );
}

export default Accounts;
