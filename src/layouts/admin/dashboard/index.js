// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
// import typography from "assets/theme/base/typography";

import Transactions from "layouts/client/billing/components/Transactions";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import { Card, Icon } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import gradientLineChartData from "./data/gradientLineChartData";
import typography from "assets/theme/base/typography";
import ByCountry from "./components/ByCountry";
import reportsBarChartData from "./data/reportsBarChartData";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import LineChart from "./components/Grafic/LineChart";
import { useEffect, useState } from "react";
import { getDashData } from "apis/request";
import { getTransactions } from "apis/request";


function AdminDashboard() {

  const [usersPerMonth, setUsersPerMonth] = useState({
    label: "Users X Month",
    data: ["", ""],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  })
  const [transfersPerMonth, setTransfersPerMonth] = useState({
    label: "Transfers X Month",
    data: ["", ""],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  })
  const [users, setUsers] = useState([])
  const [newUsers, setNewUsers] = useState(0)
  const [NofTransactions, setNofTransaction] = useState(0)
  //const [usersXmonth, setUsersPerMonth] = useState([])

  const chart = {
    labels: ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [450, 200, 100, 220, 500, 100, 400, 230, 500] ,
  }

  useEffect(() => {
    async function getDashAdminData () {
      getDashData().then(async (data) => {
        console.log(data)
        await setUsersPerMonth(
          {
            label: "Users X Month",
            data: data.usersXmonth,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        )
        await setUsers(data.users)
        let localDate = new Date();
        let localDay = await localDate.getDate();
        let localMonth = await localDate.getMonth();
        await setNewUsers(data.usersXmonth[localMonth])
      }).catch(error => {
        console.log(error)
      })
      getTransactions().then(async (data) => {
        await setNofTransaction(data.transactions.length)
        await setTransfersPerMonth(
          {
            label: "Transfers X Month",
            data: data.transfersXmonth,
            borderColor: 'rgb(200, 99, 10)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        )
      }).catch(error => {
        console.log(error)
      })
    }
    getDashAdminData();
  }, [])

  

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total transactions" }}
                count={NofTransactions}
                percentage={{ color: "success", text: "%" }}
                icon={{ color: "dark", component: "image" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Users" }}
                count={users.length}
                percentage={{ color: "success", text: "%" }}
                icon={{ color: "dark", component: "person" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "New Users" }}
                count={newUsers}
                percentage={{ color: "success", text: "%" }}
                icon={{ color: "dark", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Sessions" }}
                count="1,414"
                percentage={{ color: "error", text: "%" }}
                icon={{ color: "dark", component: "emoji_events" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                <Card>
                  <SoftBox mb={0}>
                    <LineChart 
                      labels={chart.labels}  
                      datasets={[usersPerMonth, transfersPerMonth]}
                    />
                  </SoftBox>
                </Card>
{/*                <GradientLineChart
                  title="Traffic channels"
                  description={
                    <SoftBox display="flex" alignItems="center">
                      <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                        <Icon className="font-bold">arrow_upward</Icon>
                      </SoftBox>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        4% more
                        <SoftTypography variant="button" color="text" fontWeight="regular">
                          in 2021
                        </SoftTypography>
                      </SoftTypography>
                    </SoftBox>
                  }
                  height="20.25rem"
                  labels={data.labels}
                  datasets={data.datasets}
                />*/}
             
            </Grid>
            <Grid item xs={12} lg={5}>
           {  /* <ByCountry />*/}
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
     {/* <Transactions />*/}
    </DashboardLayout>
  );
}

export default AdminDashboard;