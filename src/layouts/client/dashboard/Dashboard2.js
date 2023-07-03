// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Footer from "examples/Footer";

// Soft UI Dashboard React base styles
import MasterCard from "examples/Cards/MasterCard";
import PaymentMethod from "layouts/client/billing/components/PaymentMethod";
import Transactions from "layouts/client/billing/components/Transactions";
import Invoices from "layouts/client/billing/components/Invoices";
import BillingInformation from "layouts/client/billing/components/BillingInformation";
import BalanceAvailable from "./components/BalanceAvailable";
import QrCode from "./components/QrCode";
import { useSoftUIController } from "context";
import Dona from "../Graphics/Dona";
import { Card } from "reactstrap";

function Dashboard2() {

  const [controller, dispatch] = useSoftUIController();

  return (
    <DashboardLayout>
     <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
               <MiniStatisticsCard
                title={{ text: "Received" }}
                count="In work"
                percentage={{ color: "success", text: "+4%" }}
                icon={{ color: "dark", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Sent" }}
                count="In work"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "dark", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "top up's" }}
                count="In work"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "dark", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "withdrawals" }}
                count="In work"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "dark", component: "shopping_cart" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/*<BalanceAvailable />*/}
        <SoftBox mb={3}>
           {controller.user.stripeAccount ? <PaymentMethod /> : <></>}
        </SoftBox>
        
        {/*<SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <BalanceAvailable />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
            </Grid>
          </Grid>
        </SoftBox>*/}
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <SoftBox mb={3}>
                {/*<PaymentMethod />*/}
              </SoftBox>
              <Card>
                <SoftBox>
                  <Dona></Dona>
                </SoftBox>
              </Card>

              <SoftBox mb={2}>
                {controller.user.stripeAccount ? <Transactions /> : <></>}
              </SoftBox>

{/*              <SoftBox mb={3}>
                <BillingInformation />
              </SoftBox>*/}
            </Grid>
            <Grid item xs={12} lg={4}>
              <SoftBox mb={3}>
                <QrCode />
              </SoftBox>
{/*              <SoftBox mb={3}>
                <Invoices />
              </SoftBox>*/}
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      {/*<Footer />*/}
    </DashboardLayout>
  );
}

export default Dashboard2;