// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Soft UI Dashboard React base styles
import PaymentMethod from "layouts/client/billing/components/PaymentMethod";
import Transactions from "layouts/client/billing/components/Transactions";
import QrCode from "./components/QrCode";
import { useSoftUIController } from "context";
import Dona from "../Graphics/Dona";
import AccountMethod from "../billing/components/AccountMethod";
import PyzenCard from "./components/PyzenCard";
import { useEffect, useState } from "react";

function Dashboard2() {

  const [controller, dispatch] = useSoftUIController();
  const [USDamount, setUSDamount] = useState(0);
  const [EURamount, setEURamount] = useState(0);
  const [GBPamount, setGBPamount] = useState(0);
  const [withdraws, setWithdraws] = useState(controller.user.dashData.withdraws.toFixed(2));
  const [transfers, setTransfers] = useState(controller.user.dashData.transfers.toFixed(2));
  const [topOps, setTopOps] = useState(controller.user.dashData.topOps.toFixed(2));
  const [recived, setRecived] = useState(controller.user.dashData.recived.toFixed(2));
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    controller.user.amount.map(async (amount) => {
      if(amount.currency === "USD"){
        setUSDamount(amount.amount)
        const toSearch = amount.currency + controller.user.currency;
        const index = await controller.currencys.changes.findIndex(element => element.currencys === toSearch);
        if (index !== -1) {
          const amount2 = amount.amount * controller.currencys.changes[index].rate;
          const finalAmount = amount2 + totalAmount
          await setTotalAmount(finalAmount)
        }else{
          await setTotalAmount(totalAmount + amount.amount)
        }
      }
      if(amount.currency === "GBP"){
        setGBPamount(amount.amount)
        const toSearch = amount.currency + controller.user.currency;
        const index = await controller.currencys.changes.findIndex(element => element.currencys === toSearch);
        if (index !== -1) {
          const amount2 = amount.amount * controller.currencys.changes[index].rate;
          const finalAmount = amount2 + totalAmount
          await setTotalAmount(finalAmount)
        }else{
          await setTotalAmount(totalAmount + amount.amount)
        }
      }
      if(amount.currency === "EUR"){
        setEURamount(amount.amount)
        const toSearch = amount.currency + controller.user.currency;
        const index = await controller.currencys.changes.findIndex(element => element.currencys === toSearch);
        if (index !== -1) {
          const amount2 = amount.amount * controller.currencys.changes[index].rate;
          const finalAmount = amount2 + totalAmount
          await setTotalAmount(finalAmount)
        }else{
          await setTotalAmount(totalAmount + amount.amount)
        }
      }
    })
  }, [controller.user])

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* Componentes MiniStatisticsCard */}
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Received" }}
                count={recived}
                percentage={{ color: "success", text: "+4%" }}
                icon={{ color: "dark", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Sent" }}
                count={transfers}
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "dark", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "top up's" }}
                count={topOps}
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "dark", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "withdrawals" }}
                count={withdraws}
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "dark", component: "shopping_cart" }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        {/* Componentes Dona y PyzenCard */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={8}>
            <SoftBox>
              <Grid container spacing={3}>
                {/* Componente Dona */}
                <Grid item xs={12} sm={8} lg={8} md={8}>
                  <Dona amount={[GBPamount, USDamount, EURamount]} totalAmount={totalAmount} />
                </Grid>
              </Grid>
            </SoftBox>
          </Grid>

          {/* Componente QRCode */}
          <Grid item xs={12} sm={12} lg={4}>
            <SoftBox>
              <QrCode />
            </SoftBox>
          </Grid>
        </Grid>

        {/* Componentes PaymentMethod y AccountMethod */}
        <Grid mt={1} container spacing={3}>
          <Grid item xs={12} sm={12} lg={8}>
            <SoftBox>
              {controller.user.stripeAccount ? <PaymentMethod /> : <></>}
            </SoftBox>
            <SoftBox mt={3} mb={3}>
              {controller.user.stripeAccount ? <AccountMethod /> : <></>}
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            <PyzenCard />
          </Grid>
        </Grid>
        <SoftBox mt={3} mb={2}>
          {controller.user.stripeAccount ? <Transactions /> : <></>}
        </SoftBox>

        {/* Resto del contenido */}
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard2;