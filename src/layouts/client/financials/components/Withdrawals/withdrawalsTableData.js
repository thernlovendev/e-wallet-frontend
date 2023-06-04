/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { Checkbox } from "@mui/material";

const rowData = [
  {
    status: {
      variant: "gradient",
      badgeContent: "IN TRANSIT",
      color: "warning",
      size: "xs",
    },
    amount: "$149.00 USD",
    description: "Withdrawals",
    receptiant: "Debit card ending in 0432",
    id: "243598234",
    date: "15/04/2023",
  },
  {
    status: {
      variant: "gradient",
      badgeContent: "COMPLETED",
      color: "success",
      size: "xs",
    },
    amount: "$149.00 USD",
    description: "Withdrawals",
    receptiant: "Debit card ending in 0432",
    id: "243598234",
    date: "15/04/2023",
  },
  {
    status: {
      variant: "gradient",
      badgeContent: "CANCELLED",
      color: "error",
      size: "xs",
    },
    amount: "$149.00 USD",
    description: "Withdrawals",
    receptiant: "Bank account ending in 0982",
    id: "243598234",
    date: "15/04/2023",
  },
];

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

const withdrawalsTableData = {
  columns: [
    { name: "AMOUNT", align: "left" },
    { name: "DESCRIPTION", align: "left" },
    { name: "RECEPTIANT", align: "left" },
    { name: "ID", align: "left" },
    { name: "DATE", align: "left" },
    { name: "DETAILS", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: rowData.map((item) => ({
    AMOUNT: <AmountField amount={item.amount} />,
    DESCRIPTION: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.description}
      </SoftTypography>
    ),
    RECEPTIANT: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.receptiant}
      </SoftTypography>
    ),
    ID: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.id}
      </SoftTypography>
    ),
    DATE: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.date}
      </SoftTypography>
    ),
    DETAILS: <SoftBadge {...item.status} container />,
  })),
};

export default withdrawalsTableData;
