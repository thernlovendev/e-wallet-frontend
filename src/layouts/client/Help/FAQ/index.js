// Soft UI Dashboard React examples
import { Visibility } from "@mui/icons-material";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Table from "examples/Tables/Table";
import ticketsTableData from "../MyTickets/ticketsTableData";

function FAQ() {
  const { columns, rows } = ticketsTableData;

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
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">All Ticktes</SoftTypography>
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
      </SoftBox>
    </DashboardLayout>
  );
}

export default FAQ;
