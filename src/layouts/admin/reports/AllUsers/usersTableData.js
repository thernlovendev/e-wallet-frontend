/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { Checkbox } from "@mui/material";

const rowData = [
  {
    name: "Lukas Thern Lovén",
    JOIN_DATE: "22/12/2022",
    LAST_PURCHASE_DATE: "16/04/2023",
    TRANSFERRED: "$12,345.00",
    TRANSACTIONS: "146",
    status: {
      variant: "contained",
      badgeContent: "Active",
      color: "success",
      size: "xs",
    },
  },
  {
    name: "Camila Guemes",
    JOIN_DATE: "12/10/2022",
    LAST_PURCHASE_DATE: "15/04/2023",
    TRANSFERRED: "$22,621.04",
    TRANSACTIONS: "354",
    status: {
      variant: "contained",
      badgeContent: "NOT VERIFIED",
      color: "warning",
      size: "xs",
    },
  },
  {
    name: "Maximiliano Barrientos",
    JOIN_DATE: "22/01/2023",
    LAST_PURCHASE_DATE: "12/04/2023",
    TRANSFERRED: "$5,321.01",
    TRANSACTIONS: "67",
    status: {
      variant: "contained",
      badgeContent: "NOT ACTIVE",
      color: "error",
      size: "xs",
    },
  },
  {
    name: "Lukas Thern Lovén",
    JOIN_DATE: "22/12/2022",
    LAST_PURCHASE_DATE: "16/04/2023",
    TRANSFERRED: "$12,345.00",
    TRANSACTIONS: "146",
    status: {
      variant: "contained",
      badgeContent: "Active",
      color: "success",
      size: "xs",
    },
  },
  {
    name: "Camila Guemes",
    JOIN_DATE: "12/10/2022",
    LAST_PURCHASE_DATE: "15/04/2023",
    TRANSFERRED: "$22,621.04",
    TRANSACTIONS: "354",
    status: {
      variant: "contained",
      badgeContent: "NOT VERIFIED",
      color: "warning",
      size: "xs",
    },
  },
  {
    name: "Maximiliano Barrientos",
    JOIN_DATE: "22/01/2023",
    LAST_PURCHASE_DATE: "12/04/2023",
    TRANSFERRED: "$5,321.01",
    TRANSACTIONS: "67",
    status: {
      variant: "contained",
      badgeContent: "NOT ACTIVE",
      color: "error",
      size: "xs",
    },
  },
];

function NameField({ name }) {
  return (
    <SoftBox px={1}>
      <Checkbox />
      <SoftTypography pl={1} variant="button" fontWeight="medium">
        {name}
      </SoftTypography>
    </SoftBox>
  );
}

const usersTableData = {
  columns: [
    { name: "NAME", align: "left" },
    { name: "JOIN_DATE", align: "left" },
    { name: "LAST_PURCHASE_DATE", align: "left" },
    { name: "TRANSFERRED", align: "left" },
    { name: "TRANSACTIONS", align: "left" },
    { name: "STATUS", align: "left" },
    { name: "action", align: "center" },
  ],

  rows: rowData.map((item) => ({
    NAME: <NameField name={item.name} />,
    JOIN_DATE: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.JOIN_DATE}
      </SoftTypography>
    ),
    LAST_PURCHASE_DATE: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.LAST_PURCHASE_DATE}
      </SoftTypography>
    ),
    TRANSFERRED: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.TRANSFERRED}
      </SoftTypography>
    ),
    TRANSACTIONS: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.TRANSACTIONS}
      </SoftTypography>
    ),
    STATUS: <SoftBadge {...item.status} container />,
  })),
};

export default usersTableData;