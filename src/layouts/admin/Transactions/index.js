// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import { Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import transactionsTableData from "./transactionsTableData";
import { Visibility } from "@mui/icons-material";
import SoftButton from "components/SoftButton";
import { useEffect } from "react";
import { getTransactions } from "apis/request";

function AdminTransactions() {
  // const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  const { columns, rows } = transactionsTableData;

  useEffect(() => {
    getTransactions().then(transactions => {
      console.log(transactions)
    }).catch(error => {
      console.log(error)
    })
  })

  function Actions() {
    return (
      <SoftBox display="flex" gap={2}>
        <SoftBox onClick={() => {}}>
          <Visibility />
        </SoftBox>
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <SoftBox mb={3} display="flex" gap={2} justifyContent={"end"}>
        <SoftButton variant="outlined" color="dark">
          Export
        </SoftButton>
        <SoftButton color="dark">Today</SoftButton>
      </SoftBox>
      <SoftBox mb={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">All Transactions</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table
              columns={columns}
              rows={rows.map((item) => ({ ...item, action: <Actions /> }))}
            />
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default AdminTransactions;