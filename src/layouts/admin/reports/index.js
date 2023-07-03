// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
// import typography from "assets/theme/base/typography";

import ReportCard from "./ReportCard";
import AllUsers from "./AllUsers";
import { useEffect, useState } from "react";
import { getUsers } from "apis/request";

function AdminReports() {
  // const { chart, items } = reportsBarChartData;
  const [transfersAmount, setTransfersAmount] = useState(0);
  const [usersActive, setUsersActive] = useState(0);
  const [usersInactive, setUsersInactive] = useState(0);
  const [usersUnverified, setUsersUnverified] = useState(0);
  const [users, setUsers] = useState([{
    
  }]);

  useEffect(() => {
    getUsers().then(async (users) => {
      await setUsersActive(users.usersActive)
      await setUsersInactive(users.usersInactive)
      await setUsersUnverified(users.usersUnverified)
      await setUsers(users.users)
    })
  }, [])

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={6}>
              <ReportCard
                bgColor="dark"
                count={{ text: "%", fontWeight: "bold" }}
                subTitle={{ text: "Transfers Total Amount", fontWeight: "lighter" }}
                title={{ text: transfersAmount, fontWeight: "bold" }}
                icon={{ color: "dark", component: "person" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <ReportCard
                bgColor="dark"
                count={{ text: "%", fontWeight: "bold" }}
                subTitle={{ text: "Users Active", fontWeight: "lighter" }}
                title={{ text: usersActive, fontWeight: "bold" }}
                icon={{ color: "dark", component: "person" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <ReportCard
                bgColor="dark"
                count={{ text: "%", fontWeight: "bold" }}
                subTitle={{ text: "Users Inactive", fontWeight: "lighter" }}
                title={{ text: usersInactive, fontWeight: "bold" }}
                icon={{ color: "dark", component: "person" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <ReportCard
                bgColor="dark"
                count={{ text: "%", fontWeight: "bold" }}
                subTitle={{ text: "Users Not Verified", fontWeight: "lighter" }}
                title={{ text: usersUnverified, fontWeight: "bold" }}
                icon={{ color: "dark", component: "person" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <AllUsers users={users}/>
      {/*  another table */}
    </DashboardLayout>
  );
}

export default AdminReports;