// Soft UI Dashboard React examples
import { Card, Checkbox } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import Table from "examples/Tables/Table";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import topupsTableData from "./topupsTableData";
import { useSoftUIController } from "context";
import { useEffect, useState } from "react";

function TopUps() {
  const [controller, dispatch] = useSoftUIController();
  const [columns2, setColumns2] = useState([
    {name: "AMOUNT", align: "left"},
    {name: "DESCRIPTION", align: "left"},
    { name: "RECEPTIANT", align: "left" },
    { name: "ID", align: "left" },
    { name: "DATE", align: "left" },
    { name: "STATE", align: "center" },
    { name: "action", align: "center" },
  ]);
  const [rows2, setRows2] = useState([]);

  function AmountField({ amount }) {
    return (
      <SoftBox px={1}>
        <Checkbox />
        <SoftTypography pl={1} variant="button" fontWeight="medium">
          {amount}
        </SoftTypography>
      </SoftBox>
    );
  }

  useEffect(() => {
    async function x() {
      const rows = await controller.user.transactions.map((transaction) => {
        if(transaction.action === "charge") {
          return {
            AMOUNT: <AmountField amount={transaction.currency + " " +  transaction.amount} />,
            DESCRIPTION: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                "TopUp"
              </SoftTypography>
            ),
            RECEPTIANT: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {transaction.userInteraction}
              </SoftTypography>
            ),
            ID: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {transaction.id}
              </SoftTypography>
            ),
            DATE: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {transaction.date}
              </SoftTypography>
            ),
            STATE: (
              <SoftTypography variant="caption" color={transaction.status === "success" || transaction.status === "succeeded" ? "success" : "error" } fontWeight="medium">
                {transaction.status}
              </SoftTypography>
            )
          }
        }
      }).filter((item) => item !== undefined)
      await setRows2(rows);
      console.log(rows2)
    }
    x();
  },[controller])

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
      <SoftBox mb={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">All Top Up's</SoftTypography>
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
              columns={columns2}
              rows={rows2.map((item) => ({ ...item, action: <Actions /> }))}
            />
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default TopUps;
