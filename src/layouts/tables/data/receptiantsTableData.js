/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Checkbox } from "@mui/material";

const receiptdata = [
  {
    image: team2,
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    status: {
      variant: "gradient",
      badgeContent: "Active",
      color: "success",
      size: "xs",
    },
    joinDate: "22/01/2023",
    lastPurchaseDate: "12/04/2023",
    transferred: "$5,321.01",
    transactions: 67,
  },
  {
    image: team3,
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    status: {
      variant: "gradient",
      badgeContent: "Not Verified",
      color: "warning",
      size: "xs",
    },
    joinDate: "22/01/2023",
    lastPurchaseDate: "12/04/2023",
    transferred: "$5,321.01",
    transactions: 67,
  },
  {
    image: team4,
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    status: {
      variant: "gradient",
      badgeContent: "Not Active",
      color: "error",
      size: "xs",
    },
    joinDate: "22/01/2023",
    lastPurchaseDate: "12/04/2023",
    transferred: "$5,321.01",
    transactions: 67,
  },
  {
    image: team2,
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    status: {
      variant: "gradient",
      badgeContent: "Active",
      color: "success",
      size: "xs",
    },
    joinDate: "22/01/2023",
    lastPurchaseDate: "12/04/2023",
    transferred: "$5,321.01",
    transactions: 67,
  },
  {
    image: team3,
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    status: {
      variant: "gradient",
      badgeContent: "Not Verified",
      color: "warning",
      size: "xs",
    },
    joinDate: "22/01/2023",
    lastPurchaseDate: "12/04/2023",
    transferred: "$5,321.01",
    transactions: 67,
  },
  {
    image: team4,
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    status: {
      variant: "gradient",
      badgeContent: "Not Active",
      color: "error",
      size: "xs",
    },
    joinDate: "22/01/2023",
    lastPurchaseDate: "12/04/2023",
    transferred: "$5,321.01",
    transactions: 67,
  },
];

function Receptiants({ image, name, email }) {
  return (
    <SoftBox px={1}>
      <Checkbox />
      <SoftTypography pl={1} variant="button" fontWeight="medium">
        {name}
      </SoftTypography>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

const receptiantsTableData = {
  columns: [
    { name: "NAME", align: "left" },
    { name: "JOIN_DATE", align: "left" },
    { name: "LAST_PURCHASE_DATE", align: "left" },
    { name: "TRANSFERRED", align: "left" },
    { name: "TRANSACTIONS", align: "left" },
    { name: "STATUS", align: "left" },
    { name: "action", align: "center" },
  ],

  rows: receiptdata.map((item) => ({
    NAME: <Receptiants {...item} />,
    function: <Function {...item} />,
    STATUS: <SoftBadge {...item.status} container />,
    JOIN_DATE: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.joinDate}
      </SoftTypography>
    ),
    LAST_PURCHASE_DATE: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.lastPurchaseDate}
      </SoftTypography>
    ),
    TRANSFERRED: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.transferred}
      </SoftTypography>
    ),
    TRANSACTIONS: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.transactions}
      </SoftTypography>
    ),
  })),
};

export default receptiantsTableData;
