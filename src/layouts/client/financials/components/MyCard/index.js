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
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import SoftButton from "components/SoftButton";
import { useSoftUIController } from "context";
import { requestCreditCard } from "apis/request";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";
import { Link, useNavigate } from "react-router-dom";

function MyCard({ title, bgColor, icon }) {
  const navegar = useNavigate();
  const [newAcc, setNewAcc] = useState(false);
  const [controller, dispatch] = useSoftUIController();

  const handleCreditCardRequest = () => {
    navegar("/account/CardTerms&Conditions")
  }

  const toggleNewAccount = () => setNewAcc((prev) => !prev);
  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2}>
            {Object.keys(controller.user.stripeCard[0].id).length > 1 ? controller.user.stripeCard.map(card => {
              return(
                card.id === "in revision" ? 
                <Grid item xs={12} sm={6} xl={4}>
                  <SoftBox
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgColor="dark"
                    borderRadius="lg"
                    variant="gradient"
                    // flexDirection="row"
                  ><SoftTypography height="100%"
                    fontWeight="light"
                    fontSize=".87em"
                    color="white"
                    variant="h6">In revision</SoftTypography></SoftBox>
                </Grid> : 
                <Grid item xs={12} sm={6} xl={4}>
                <MasterCard id={card.id} number={"************" + card.last4} holder={controller.user.name + " " + controller.user.lastName} expires={card.exp_month.toString() + "/" + card.exp_year.toString()} />
                </Grid>
              )
            }) :
            <Grid item xs={12} sm={6} xl={4}>
              <SoftBox
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgColor="dark"
                borderRadius="lg"
                variant="gradient"
                // flexDirection="row"
              >
                <Grid item>
                  <SoftButton
                    height="100%"
                    component="h4"
                    fontWeight="light"
                    fontSize=".87em"
                    color="dark"
                    variant="gradient"
                    onClick={handleCreditCardRequest}
                  >
                    Request a byzen credit card
                  </SoftButton>
                </Grid>
              </SoftBox>
            </Grid>}
{/*            <Grid item xs={12} sm={6} xl={4}>
              <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
            </Grid>*/}

          </Grid>
        </SoftBox>
        <Transactions />
      </SoftBox>
      <SoftModal open={false && newAcc} toggle={toggleNewAccount} header="New Card" body={<></>} />
    </DashboardLayout>
  );
}

export default MyCard;
